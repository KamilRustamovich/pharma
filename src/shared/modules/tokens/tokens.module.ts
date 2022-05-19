import { Module } from '@nestjs/common'
import { TokensService } from './tokens.service'
import { JwtModule } from '@nestjs/jwt'
import { jwtConfig } from '../../../config/jwt.config'
import { UserStrategy } from './stategies/user.strategy'
import { AdminStrategy } from './stategies/admin.strategy'
import { AdminRestGuard } from './guards/admin-rest.guard'

@Module({
    imports: [JwtModule.registerAsync(jwtConfig)],
    providers: [
        TokensService,
        UserStrategy,
        AdminStrategy,
        AdminRestGuard,
    ],
    exports: [TokensService],
})
export class TokensModule {}
