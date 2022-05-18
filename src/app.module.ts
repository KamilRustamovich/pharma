import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { config } from './config/config'
import { typeOrmConfig } from './config/typeorm.config'
import { EncryptionModule } from './shared/modules/encryption/encryption.module'
import { ScheduleModule } from '@nestjs/schedule'
import { UsersModule } from './core/users/users.module'
import { MedicinesModule } from './core/medicines/medicines.module'

@Module({
    imports: [
        ConfigModule.forRoot(config),
        TypeOrmModule.forRootAsync(typeOrmConfig),
        ScheduleModule.forRoot(),
        UsersModule,
        EncryptionModule,
        MedicinesModule
    ],
})
export class AppModule {}
