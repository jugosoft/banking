import { Body, Controller, Get, Post, Param, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import {
  IDeposit,
  Deposit,
  IGetDepositListResponse,
  IGetDepositResponse,
  IResponseErrors,
  ErrorCode
} from '@banking/shared-types';

@Controller('deposit')
export class DepositController {
  private readonly depositRepository: Repository<Deposit>;

  constructor(
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
      return { error: { code: 'NO_DEPOSIT', message: 'Deposit not found' } };
    }

    return { deposit };
  }

  @Post('save')
  public async saveDeposit(@Body() deposit: IDeposit): Promise<
    boolean | IResponseErrors
  > {
    try {
      if (deposit.id) {
        // Обновление существующего депозита
        await this.depositRepository.update(deposit.id, deposit);
      } else {
        // Создание нового депозита
        const newDeposit = this.depositRepository.create(deposit);
        await this.depositRepository.save(newDeposit);
      }
      return true;
    } catch (error) {
      return { error: { code: ErrorCode.DEPOSIT_SAVE_ERROR, message: 'Failed to save deposit' } };
    }
  }
}
