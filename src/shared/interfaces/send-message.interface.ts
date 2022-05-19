import { MessageTypeEnum } from './messsage-type.enum'
import { SendMessageParams } from './message-params.interface'

export interface SendMessagePayload {
    email: string
    type: MessageTypeEnum
    params: SendMessageParams
}
