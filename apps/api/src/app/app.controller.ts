import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { IGetDataResponse } from './types/get-data-response.interface';
import { IRegisterRequest, IRegisterResponse } from '@banking/shared-types';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('fetchText')
  public async getData(): Promise<IGetDataResponse> {
    return new Promise<IGetDataResponse>((resolve) => {
      setTimeout(() => {
        const bank = this.appService.getData();
        resolve(this.appService.buildGetDataResponse(bank));
      }, 2500);
    });
  }

  @Post('register')
  public async register(
    @Body() registerDto: IRegisterRequest
  ): Promise<IRegisterResponse> {
    return new Promise<IRegisterResponse>((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: 12,
            email: registerDto.email,
            username: registerDto.username,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        });
      }, 2500);
    });
  }
}
