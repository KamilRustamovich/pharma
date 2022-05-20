import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from '../../../database/entities/cart.entity';
import { MedicineEntity } from '../../../database/entities/medicine.entity';
import { CreateCartDto } from '../dtos/create-cart.dto';
import { UpdateCartDto } from '../dtos/update-cart.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(CartEntity) private readonly cartRepo: Repository<CartEntity>,
    @InjectRepository(MedicineEntity) private readonly medRepo: Repository<MedicineEntity>
  ) {}

  create(createCartDto: CreateCartDto) {
    return 'This action adds a new cart';
  }

  findAll() {
    return `This action returns all carts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
