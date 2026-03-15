import { Module } from '@nestjs/common';
import { AppService } from '../app.service';
import { DepositController } from './deposit.controller';

@Module({
  controllers: [DepositController],
  providers: [AppService],
})
export class DepositModule {}