import { MailerService } from '@nestjs-modules/mailer'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Logardian } from 'logardian'
import crypto from 'crypto'
import { getEmailTemplate } from './templates/get-email.template'
import { InjectEntityManager } from '@nestjs/typeorm'
import { EntityManager } from 'typeorm'
import { Cron, CronExpression } from '@nestjs/schedule'
import { MailEntity } from '../../../database/entities/mail.entity'
import { MessageTypeEnum } from '../../interfaces/messsage-type.enum'
import { SendMessagePayload } from '../../interfaces/send-message.interface'

@Injectable()
export class MailsService {
    private _logger = new Logardian()
    private _smtpUser: string
    private _helloEmail: string
    private _mailImageUrl: string

    constructor(
        private readonly _mailerService: MailerService,
        private readonly _configService: ConfigService,
        @InjectEntityManager()
        private readonly _entityManager: EntityManager,
    ) {
        const smtpUser = this._configService.get<string>('SMTP_USER')

        if (!smtpUser) {
            throw new Error(`SMTP_USER is not provided in .env`)
        }

        this._smtpUser = smtpUser

        const helloEmail = this._configService.get<string>('SMTP_HELLO_EMAIL')

        if (!helloEmail) {
            throw new Error(`SMTP_HELLO_EMAIL is not provided in .env`)
        }

        this._helloEmail = helloEmail

        const mailImageUrl = this._configService.get<string>('MAIL_IMAGE_URL')

        if (!mailImageUrl) {
            throw new Error(`MAIL_IMAGE_URL is not provided in .env`)
        }

        this._mailImageUrl = mailImageUrl
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    private async _sendEmails(): Promise<void> {
        const mailsRepository = this._entityManager.getRepository(MailEntity)

        const mails = await mailsRepository.find({
            where: {
                isSent: false,
                isSending: false,
            },
            take: 10,
        })

        if (mails.length === 0) {
            return
        }

        const sendingMails = mails.map((mail) => {
            mail.isSending = true
            return mail
        })

        await mailsRepository.save(sendingMails)

        for (const mail of mails) {
            const { email, type, params } = mail

            switch (type) {
                case MessageTypeEnum.SIGN_UP_CODE:
                    if (!params.verificationCode) {
                        throw new InternalServerErrorException({
                            message: 'MESSAGE_PARAMS_IS_UNDEFINED',
                            description: 'verification code is undefined',
                        })
                    }

                    await this._sendCode(email, params.verificationCode)

                    break
                case MessageTypeEnum.HELLO_MESSAGE:
                    if (!params.messageFromUser) {
                        throw new InternalServerErrorException({
                            message: 'MESSAGE_PARAMS_IS_UNDEFINED',
                            description: 'messageFromUser is undefined',
                        })
                    }

                    await this._sendHelloMessage(params.messageFromUser)

                    break
            }

            mail.isSent = true

            await mailsRepository.save(mail)
        }

        this._logger.log(
            `Send emails to: ${mails.map(({ email }) => email).join(', ')}`,
        )
    }

    async sendMessage(mails: SendMessagePayload[]): Promise<void> {
        const mailsRepository = this._entityManager.getRepository(MailEntity)

        for (const mail of mails) {
            const { email, type, params } = mail

            switch (type) {
                case MessageTypeEnum.SIGN_UP_CODE:
                    if (!params.verificationCode) {
                        throw new InternalServerErrorException({
                            message: 'MESSAGE_PARAMS_IS_UNDEFINED',
                            description: `verification code for email: ${email} is undefined`,
                        })
                    }

                    break
                case MessageTypeEnum.HELLO_MESSAGE:
                    if (!params.messageFromUser) {
                        throw new InternalServerErrorException({
                            message: 'MESSAGE_PARAMS_IS_UNDEFINED',
                            description: 'messageFromUser is undefined',
                        })
                    }

                    break
            }
        }
        const createdMails = mails.map((mail) =>
            mailsRepository.create({
                email: mail.email,
                type: mail.type,
                params: mail.params,
                isSent: false,
            }),
        )

        await mailsRepository.save(createdMails)

        this._logger.log(
            `Saved ${createdMails.length} emails: ${mails
                .map((mail) => mail.email)
                .join(', ')}`,
        )
    }

    generateCode(): string {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        // const n = crypto.randomInt(0, 1000000)
        const n = 12341234
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        return n.toString().padStart(6, '0')
    }

    private async _sendHelloMessage(messageFromUser: string): Promise<void> {
        await this._mailerService.sendMail({
            to: this._helloEmail,
            from: this._smtpUser,
            subject: 'New message from AVATA user',
            text: messageFromUser,
        })

        this._logger.log(`User send contact-us message\n${messageFromUser}`)
    }

    private async _sendCode(
        email: string,
        verificationCode: string,
    ): Promise<void> {
        await this._mailerService.sendMail({
            to: email,
            from: this._smtpUser,
            subject: 'AVATA Network. Confirm email address',
            html: getEmailTemplate(email, verificationCode, this._mailImageUrl),
        })

        this._logger.log(`User send verification code to ${email}`, {
            label: 'auth',
        })
    }
}
