import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { DepositModule } from '../deposit/deposit.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule, AuthModule, DepositModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
