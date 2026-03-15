import { Body, Controller, Get, Post, Param, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
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
  private readonly depositRepository: Repository<Deposit>;

  constructor(
    private readonly appService: AppService,
    @Inject('DATA_SOURCE') private dataSource: DataSource
  ) {
    this.depositRepository = dataSource.getRepository(Deposit);
  }

  @Get('list')
  public async getDepositList(): Promise<
    IGetDepositListResponse | IResponseErrors
  > {
    const deposits = await this.depositRepository.find({
      where: { archived: false }
    });

    return { deposits };
  }

  @Get(':id')
  public async getDeposit(@Param('id') id: string): Promise<
    IGetDepositResponse | IResponseErrors
  > {
    const deposit = await this.depositRepository.findOne({
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
    if (deposit.id) {
      // Обновление существующего депозита
      await this.depositRepository.update(deposit.id, deposit);
    } else {
      // Создание нового депозита
      const newDeposit = this.depositRepository.create(deposit);
      await this.depositRepository.save(newDeposit);
    }

    return true;
  }
}
