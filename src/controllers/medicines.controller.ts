import { Body, Controller, Delete, Get, Param, Patch, Post, Render } from "@nestjs/common";
import { CreateMedicineDto } from "../core/medicines/dtos/create-medicine.dto";
import { UpdateMedicineDto } from "../core/medicines/dtos/update-medicine.dto";
import { MedicinesService } from "../core/medicines/services/medicines.service"

@Controller('medicines')
export class MedicinesController {
	constructor(private readonly medService: MedicinesService) { }

	@Post()
	create(@Body() createMedicineDto: CreateMedicineDto) {
		return this.medService.create(createMedicineDto);
	}

	@Get()
	@Render('index')
	findAll() {
		return this.medService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.medService.findOneById(id);
	}

	// @Patch(':id')
	// update(@Param('id') id: string, @Body() updateCartDto: UpdateMedicineDto) {
	// 	return this.medService.update(+id, updateCartDto);
	// }

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.medService.remove(id);
	}
}