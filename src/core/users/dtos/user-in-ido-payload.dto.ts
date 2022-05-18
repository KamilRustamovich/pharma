import { IsEthereumAddress, IsUUID } from 'class-validator'

export class UserInIDOPayloadDTO {
    @IsUUID()
    idoId: string

    @IsEthereumAddress()
    address: string
}
