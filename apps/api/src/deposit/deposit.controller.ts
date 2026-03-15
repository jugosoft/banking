import { Body, Controller, Get, Post, Param } from '@nestjs/common';

import { AppService } from '../app.service';
import {
  IDeposit,
  IGetDepositListResponse,
  IGetDepositResponse,
  IResponseErrors,
} from '@banking/shared-types';
import { mockDepositListResponse, mockDepositResponse } from './mock/deposit.mock';

@Controller('deposit')
export class DepositController {
  constructor(private readonly appService: AppService) { }

  @Get('list')
  public async getDepositList(): Promise<
    IGetDepositListResponse | IResponseErrors
  > {
    return new Promise<IGetDepositListResponse>((resolve) => {
      setTimeout(() => {
        resolve(mockDepositListResponse());
      }, 2500);
    });
  }

  @Get(':id')
  public async getDeposit(@Param('id') id: string): Promise<
    IGetDepositResponse | IResponseErrors
  > {
    return new Promise<IGetDepositResponse>((resolve) => {
      setTimeout(() => {
        resolve(mockDepositResponse(parseInt(id)));
      }, 2500);
    });
  }

  @Post('save')
  public async saveDeposit(@Body() deposit: IDeposit): Promise<
    boolean | IResponseErrors
  > {
    return true;
  }
}
