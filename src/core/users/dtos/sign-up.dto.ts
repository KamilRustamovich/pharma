import { IsEmail, Matches } from 'class-validator'
import { PASSWORD_MESSAGE } from '../../../shared/interfaces/password-message.constant'
import { PASSWORD_PATTERN } from '../../../shared/interfaces/password-pattern.constant'

export class SignUpDTO {
    @IsEmail()
    email: string

    @Matches(PASSWORD_PATTERN, {
        message: PASSWORD_MESSAGE,
    })
    password: string
}
