import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { AppService } from './app.service';
import {
  IRegisterRequest,
  IRegisterResponse,
  IResponseErrors,
} from '@banking/shared-types';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('fetchText')
  // public async getData(): Promise<IGetDataResponse> {
  //   return new Promise<IGetDataResponse>((resolve) => {
  //     setTimeout(() => {
  //       const bank = this.appService.getData();
  //       resolve(this.appService.buildGetDataResponse(bank));
  //     }, 2500);
  //   });
  // }

  @Post('register')
  public async register(
    @Body() registerDto: IRegisterRequest
  ): Promise<IRegisterResponse | IResponseErrors> {
    const errors: IResponseErrors = {
      strength: {
        code: 'password_strength',
        message: 'Пароль слишком слабый',
      },
      emailObtained: {
        code: 'email_obtained',
        message: 'Данное мыло уже занято',
      },
      nameIsFunny: {
        code: 'name_is_funny',
        message: 'Слишком смешное имя',
      },
    };
    throw new HttpException(errors, HttpStatus.INTERNAL_SERVER_ERROR);

    return new Promise<IRegisterResponse>((resolve, reject) => {
      setTimeout(() => {
        // resolve({
        //   user: {
        //     id: 12,
        //     email: registerDto.email,
        //     username: registerDto.username,
        //     createdAt: new Date().toISOString(),
        //     updatedAt: new Date().toISOString(),
        //   },
        // });
      }, 2500);
    });
  }
}
