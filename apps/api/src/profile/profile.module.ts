import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [ProfileController],
})
export class ProfileModule {}
