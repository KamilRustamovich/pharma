import {
    createParamDecorator,
    InternalServerErrorException,
} from '@nestjs/common'
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host'
import { GqlExecutionContext } from '@nestjs/graphql'
import { UserEntity } from '../../../../database/entities/user.entity'

export const CurrentUser = createParamDecorator(
    (data, context: ExecutionContextHost): UserEntity => {
        const ctx = GqlExecutionContext.create(context)

        /* eslint-disable-next-line */
        const req: Request | any = ctx.getContext().req

        if (!req.user) {
            throw new InternalServerErrorException(
                `Can not get extract user from request`,
            )
        }

        return req.user as UserEntity
    },
)
