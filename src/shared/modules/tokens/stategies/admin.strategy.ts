import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { RoleEnum } from '../enums/role.enum'

export interface AccessTokenPayload {
    role: RoleEnum
    sub: string
}

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {
    private _adminAddress: string

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

    async validate(payload: AccessTokenPayload): Promise<boolean> {
        const { sub: id, role } = payload

        if (role !== RoleEnum.ADMIN) {
            throw new ForbiddenException({
                message: `FORBIDDEN`,
                description: `Not a admin role`,
            })
        }

        if (id !== this._adminAddress) {
            throw new ForbiddenException({
                message: 'FORBIDDEN',
                description: `Not an admin address: ${id}`,
            })
        }

        return true
    }
}
