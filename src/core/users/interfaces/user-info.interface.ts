import { UserKYCStatusEnum } from '../../../shared/interfaces'
import { UserWallet } from './user-wallet.inteface'

export class UserInfoResponse {
    id: string
    email: string
    wallets: UserWallet[]
    kycStatus: UserKYCStatusEnum
}
