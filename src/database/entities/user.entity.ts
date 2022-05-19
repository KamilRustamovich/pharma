import { Entity, Column, Unique } from 'typeorm'
import { UserStatusEnum } from '../../shared/interfaces/user-status.enum'
import { CommonBaseEntity } from './common-base.entity'

@Entity('users')
@Unique(`index_email`, ['email'])
export class UserEntity extends CommonBaseEntity {
    @Column()
    email: string

    @Column({ name: 'verification_code' })
    verificationCode: string

    @Column({ type: 'timestamp with time zone', name: 'send_code_at' })
    sendCodeAt: Date

    @Column()
    password: string

    @Column({
        type: 'enum',
        enum: UserStatusEnum,
        default: UserStatusEnum.EMAIL_VERIFICATION_PENDING,
    })
    status: UserStatusEnum
}
