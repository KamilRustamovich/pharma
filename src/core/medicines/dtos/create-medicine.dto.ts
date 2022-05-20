import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMedicineDto {
    @IsNotEmpty()
    @IsString()
    productName: string

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsNotEmpty()
    @IsString()
	mediaURL: string;

    @IsNotEmpty()
    @IsString()
	mediaName: string;
}
