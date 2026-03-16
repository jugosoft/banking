import { Body, Controller, Get, Post, Put, Delete, Param, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DepositType, IDepositType } from '@banking/shared-types';
import { Bank } from '@banking/shared-types';

@Controller('reference')
export class ReferenceController {
  private readonly depositTypeRepository: Repository<DepositType>;
  private readonly bankRepository: Repository<Bank>;

  constructor(
    @Inject('DATA_SOURCE') private dataSource: DataSource
  ) {
    this.depositTypeRepository = dataSource.getRepository(DepositType);
    this.bankRepository = dataSource.getRepository(Bank);
  }

  // CRUD для deposit_type
  @Get('deposit-type')
  public async getDepositTypes(): Promise<IDepositType[]> {
    return await this.depositTypeRepository.find();
  }

  @Get('deposit-type/:id')
  public async getDepositType(@Param('id') id: string): Promise<IDepositType | null> {
    return await this.depositTypeRepository.findOne({
      where: { id: parseInt(id) }
    });
  }

  @Post('deposit-type')
  public async createDepositType(
    @Body() body: { type: string; name: string }
  ): Promise<IDepositType> {
    const depositType = this.depositTypeRepository.create(body);
    return await this.depositTypeRepository.save(depositType);
  }

  @Put('deposit-type/:id')
  public async updateDepositType(
    @Param('id') id: string,
    @Body() body: { type?: string; name?: string }
  ): Promise<IDepositType | null> {
    const depositType = await this.depositTypeRepository.findOne({
      where: { id: parseInt(id) }
    });

    if (!depositType) {
      return null;
    }

    Object.assign(depositType, body);
    return await this.depositTypeRepository.save(depositType);
  }

  @Delete('deposit-type/:id')
  public async deleteDepositType(@Param('id') id: string): Promise<boolean> {
    const result = await this.depositTypeRepository.delete(parseInt(id));
    return result.affected > 0;
  }

  // CRUD для bank
  @Get('bank')
  public async getBanks(): Promise<Bank[]> {
    return await this.bankRepository.find();
  }

  @Get('bank/:id')
  public async getBank(@Param('id') id: string): Promise<Bank | null> {
    return await this.bankRepository.findOne({
      where: { id: parseInt(id) }
    });
  }

  @Post('bank')
  public async createBank(
    @Body() body: { name: string; shortName: string }
  ): Promise<Bank> {
    const bank = this.bankRepository.create(body);
    return await this.bankRepository.save(bank);
  }

  @Put('bank/:id')
  public async updateBank(
    @Param('id') id: string,
    @Body() body: { name?: string; shortName?: string }
  ): Promise<Bank | null> {
    const bank = await this.bankRepository.findOne({
      where: { id: parseInt(id) }
    });

    if (!bank) {
      return null;
    }

    Object.assign(bank, body);
    return await this.bankRepository.save(bank);
  }

  @Delete('bank/:id')
  public async deleteBank(@Param('id') id: string): Promise<boolean> {
    const result = await this.bankRepository.delete(parseInt(id));
    return result.affected > 0;
  }
}