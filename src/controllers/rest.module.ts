import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { CartsModule } from '../core/carts/carts.module';
import { MedicinesModule } from '../core/medicines/medicines.module';
import { UsersModule } from '../core/users/users.module';
import { CartsController } from './carts.controller';
import { MedicinesController } from './medicines.controller';
import { UsersController } from './users.controller';

@Module({
    imports: [
        MedicinesModule,
        UsersModule,
        CartsModule,
        MulterModule.register({
            dest: `${__dirname}/../public`,
        }),
    ],
    controllers: [CartsController, MedicinesController, UsersController]
})
export class RestModule {}
