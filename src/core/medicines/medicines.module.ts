import { Module } from '@nestjs/common';
import { MedicinesService } from './services/medicines.service';

@Module({
  providers: [MedicinesService]
})
export class MedicinesModule {}
