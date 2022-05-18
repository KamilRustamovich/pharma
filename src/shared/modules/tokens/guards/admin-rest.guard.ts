import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class AdminRestGuard extends AuthGuard('admin') {
    getRequest(context: ExecutionContext): Request {
        console.log('hi there')
        return context.switchToHttp().getRequest()
    }
}
