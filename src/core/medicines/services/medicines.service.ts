import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicineEntity } from '../../../database/entities/medicine.entity';
import { CreateMedicineDto } from '../dtos/create-medicine.dto';
import { UpdateMedicineDto } from '../dtos/update-medicine.dto';

@Injectable()
export class MedicinesService {
	constructor(
		@InjectRepository(MedicineEntity) private readonly medRepo: Repository<MedicineEntity>
	) {}

	async create(createMedicineDto: CreateMedicineDto) {
		const newMedicine = await this.medRepo.create(createMedicineDto);
		return await this.medRepo.save(newMedicine)
	}

	async findAll() {
		return await this.medRepo.find();
	}

	async findOneById(id: string) {
		return await this.medRepo.findOne({
			where: {
				id
			}
		});
	}

	async update(id: string, updateMedicineDto: UpdateMedicineDto) {
		return await this.medRepo.update({ id }, updateMedicineDto);
	}

	async remove(id: string) {
		return await this.medRepo.softDelete(id);
	}
}
