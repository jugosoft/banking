import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { IGetDataResponse } from "./types/get-data-response.interface";

@Controller('app')
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Get('fetchText')
  public async getData(): Promise<IGetDataResponse> {
    return new Promise<IGetDataResponse>(resolve => {
      setTimeout(() => {
        const bank = this.appService.getData();
        resolve(this.appService.buildGetDataResponse(bank));
      }, 2500);
    });
  }
}
