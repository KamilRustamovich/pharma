import { IsEthereumAddress, IsNotEmpty } from 'class-validator'

export class VerifyWalletDTO {
    @IsNotEmpty()
    signature: string

    @IsEthereumAddress()
    address: string
}
