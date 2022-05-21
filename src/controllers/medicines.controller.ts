import { Body, Controller, Delete, Get, Param, Patch, Post, Render, UseGuards } from "@nestjs/common";
import { CreateMedicineDto } from "../core/medicines/dtos/create-medicine.dto";
import { UpdateMedicineDto } from "../core/medicines/dtos/update-medicine.dto";
import { MedicinesService } from "../core/medicines/services/medicines.service"
import { AdminRestGuard } from "../shared/modules/tokens/guards/admin-rest.guard";

@Controller('medicines')
export class MedicinesController {
	constructor(private readonly medService: MedicinesService) { }

	@UseGuards(AdminRestGuard)
	@Post('create')
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