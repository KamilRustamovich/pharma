import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../../database/entities/user.entity'
import { MailsModule } from '../../shared/modules/mails/mails.module'
import { TokensModule } from '../../shared/modules/tokens/tokens.module'
import { UsersAuthService } from './services/users-auth.service'

@Module({
    imports: [
        MailsModule, 
        TokensModule,
        TypeOrmModule.forFeature([UserEntity]),
    ],
    providers: [
        UsersAuthService,
    ],
    exports: [
        UsersAuthService,
    ],
})
export class UsersModule {}
