import { IsNotEmpty } from 'class-validator'

export class AddTransactionDTO {
    @IsNotEmpty()
    transactionHash: string

    @IsNotEmpty()
    date: number
}
