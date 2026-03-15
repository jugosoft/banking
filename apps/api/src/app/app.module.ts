import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { DepositModule } from '../deposit/deposit.module';
import { DatabaseModule } from '../database/database.module';
import { ProfileModule } from '../profile/profile.module';
import { ReferenceModule } from '../reference/reference.module';

@Module({
  imports: [DatabaseModule, AuthModule, DepositModule, ProfileModule, ReferenceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
