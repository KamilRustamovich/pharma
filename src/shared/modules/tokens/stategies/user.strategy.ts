import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { getManager } from 'typeorm'
import { UserEntity } from '../../../../database/entities/user.entity'
import { UserStatusEnum } from '../../../interfaces/enums/user-status.enum'
import { RoleEnum } from '../enums/role.enum'

export interface AccessTokenPayload {
    role: RoleEnum
    sub: string
}

@Injectable()
export class UserStrategy extends PassportStrategy(Strategy, 'user') {
    constructor(private readonly _configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: _configService.get('JWT_SECRET'),
            signOptions: {
                expiresIn: _configService.get('JWT_EXPIRES_IN') || '10m',
                algorithm: _configService.get('JWT_ALGORITHM'),
            },
        })
    }

    async validate(payload: AccessTokenPayload): Promise<UserEntity> {
        const { sub: id, role } = payload

        if (role !== RoleEnum.USER) {
            throw new ForbiddenException({
                message: `FORBIDDEN`,
                description: `Not a user role`,
            })
        }

        const user = await getManager().getRepository(UserEntity).findOne({
            where: {
                id,
            },
        })

        if (!user) {
            throw new ForbiddenException({
                message: `FORBIDDEN`,
                description: `User not found in JWT stategy. ID: ${id}`,
            })
        }

        if (user.status !== UserStatusEnum.ACTIVE) {
            throw new ForbiddenException({
                message: `USER_STATUS_FORBIDDEN`,
                description: `User has status: ${user.status}`,
            })
        }

        return user
    }
}
