import { Entity, Column, OneToMany } from 'typeorm'
import { CommonBaseEntity } from './common-base.entity'
import { MedicineEntity } from './medicine.entity';

@Entity('cart')
export class CartEntity extends CommonBaseEntity {
    @Column()
    title: string

    @Column()
    totalPrice: string

    @OneToMany(
		() => MedicineEntity, 
		medicine => medicine.cart,
		{ eager: true }
	)
	products: MedicineEntity[];
}

