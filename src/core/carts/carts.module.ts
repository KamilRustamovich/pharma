import { Module } from '@nestjs/common';
import { CartsService } from './services/carts.service';
import { CartsController } from '../../controllers/carts.controller';

@Module({
  controllers: [CartsController],
  providers: [CartsService]
})
export class CartsModule {}
