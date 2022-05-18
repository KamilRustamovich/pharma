import { Module } from '@nestjs/common'
import { MailsModule } from '../../shared/modules/mails/mails.module'
import { TokensModule } from '../../shared/modules/tokens/tokens.module'
import { UsersAuthService } from './services/users-auth.service'

@Module({
    imports: [MailsModule, TokensModule],
    providers: [
        UsersAuthService,
    ],
    exports: [
        UsersAuthService,
    ],
})
export class UsersModule {}
