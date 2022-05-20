import { Entity, Column, ManyToOne } from 'typeorm'
import { CartEntity } from './cart.entity'
import { CommonBaseEntity } from './common-base.entity'

@Entity('medicine')
export class MedicineEntity extends CommonBaseEntity {
    @Column()
    title: string

    @Column()
    price: number

    @Column()
    image: boolean

    @Column()
	slug: string;

    @Column({ default: ''})
	mediaURL: string;

    @Column({ default: ''})
	mediaName: string;

    @ManyToOne(
		() => CartEntity, 
		cart => cart.products,
	)
	cart: CartEntity;
}

