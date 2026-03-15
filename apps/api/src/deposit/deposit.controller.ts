import { Body, Controller, Get, Post, Param, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from '../app.service';
import {
  IDeposit,
  IGetDepositListResponse,
  IGetDepositResponse,
  IResponseErrors,
} from '@banking/shared-types';
import { Deposit } from '@banking/shared-types';

@Controller('deposit')
export class DepositController {
  constructor(
    private readonly appService: AppService,
    @Inject('DATA_SOURCE') private dataSource: DataSource
  ) { }

  @Get('list')
  public async getDepositList(): Promise<
    IGetDepositListResponse | IResponseErrors
  > {
    const depositRepository = this.dataSource.getRepository(Deposit);

    const deposits = await depositRepository.find({
      where: { archived: false }
    });

    return { deposits };
  }

  @Get(':id')
  public async getDeposit(@Param('id') id: string): Promise<
    IGetDepositResponse | IResponseErrors
  > {
    const depositRepository = this.dataSource.getRepository(Deposit);

    const deposit = await depositRepository.findOne({
      where: { id: parseInt(id) }
    });

    if (!deposit) {
      return { error: 'Deposit not found' };
    }

    return { deposit };
  }

  @Post('save')
  public async saveDeposit(@Body() deposit: IDeposit): Promise<
    boolean | IResponseErrors
  > {
    const depositRepository = this.dataSource.getRepository(Deposit);

    if (deposit.id) {
      // Обновление существующего депозита
      await depositRepository.update(deposit.id, deposit);
    } else {
      // Создание нового депозита
      const newDeposit = depositRepository.create(deposit);
      await depositRepository.save(newDeposit);
    }

    return true;
  }
}
