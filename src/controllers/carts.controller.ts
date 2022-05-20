import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateCartDto } from '../core/carts/dtos/create-cart.dto';
import { UpdateCartDto } from '../core/carts/dtos/update-cart.dto';
import { CartsService } from '../core/carts/services/carts.service';

@Controller('carts')
export class CartsController {
	constructor(private readonly cartsService: CartsService) {}

	@Post()
	create(@Body() createCartDto: CreateCartDto) {
		return this.cartsService.create(createCartDto);
	}

	@Get()
	findAll() {
		return this.cartsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.cartsService.findOne(+id);
	}

	// @Patch(':id')
	// update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
	// 	return this.cartsService.update(+id, updateCartDto);
	// }

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.cartsService.remove(+id);
	}
}
