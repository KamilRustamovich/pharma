import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCartDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsNumber()
    totalPrice: number
}
