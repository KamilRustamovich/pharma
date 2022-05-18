import { IsEthereumAddress } from 'class-validator'

export class AddWalletDTO {
    @IsEthereumAddress()
    address: string
}
