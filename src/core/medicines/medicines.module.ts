import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicineEntity } from '../../database/entities/medicine.entity';
import { MedicinesService } from './services/medicines.service';

@Module({
  imports: [TypeOrmModule.forFeature([MedicineEntity])],
  providers: [MedicinesService],
  exports: [MedicinesService]
})
export class MedicinesModule {}
