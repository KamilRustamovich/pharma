import { Body, Controller, Post } from "@nestjs/common";
import { CreateMedicineDto } from "./dtos/create-medicine.dto";
import { MedicinesService } from "./services/medicines.service";

@Controller('medicines')
export class MedicinesController {
    constructor(private readonly medService: MedicinesService) {}

    @Post('create')
    async createMedicine(
        @Body() createMedicineDto: CreateMedicineDto
    ): Promise<> {

    }
}