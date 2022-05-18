import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class AdminGuard extends AuthGuard('admin') {
    getRequest(context: ExecutionContext): Request {
        const ctx = GqlExecutionContext.create(context)
        return ctx.getContext().req
    }
}
