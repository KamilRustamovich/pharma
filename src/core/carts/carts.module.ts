import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from '../../database/entities/cart.entity';
import { MedicineEntity } from '../../database/entities/medicine.entity';
import { CartsService } from './services/carts.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity, MedicineEntity])],
  providers: [CartsService],
  exports: [CartsService]
})
export class CartsModule {}
