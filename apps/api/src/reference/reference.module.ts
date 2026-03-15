import { Module } from '@nestjs/common';
import { ReferenceController } from './reference.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ReferenceController],
})
export class ReferenceModule {}