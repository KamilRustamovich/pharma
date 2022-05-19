import { Entity, Column } from 'typeorm'
import { MessageTypeEnum } from '../../shared/interfaces/messsage-type.enum'
import { SendMessageParams } from '../../shared/interfaces//message-params.interface'
import { CommonBaseEntity } from './common-base.entity'

@Entity('mails')
export class MailEntity extends CommonBaseEntity {
    @Column()
    email: string

    @Column({ default: false })
    isSent: boolean

    @Column({ default: false })
    isSending: boolean

    @Column({
        type: 'enum',
        enum: MessageTypeEnum,
    })
    type: MessageTypeEnum

    @Column({ type: 'jsonb', default: [] })
    params: SendMessageParams
}
