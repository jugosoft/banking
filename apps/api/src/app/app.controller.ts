import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import {
  IDeposit,
  IGetCurrentUserResponse,
  IGetDepositListResponse,
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
  IResponseErrors,
} from '@banking/shared-types';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('register')
  public async register(
    @Body() registerDto: IRegisterRequest
  ): Promise<IRegisterResponse | IResponseErrors> {
    // const errors: IResponseErrors = {
    //   strength: {
    //     code: 'password_strength',
    //     message: 'Пароль слишком слабый',
    //   },
    //   emailObtained: {
    //     code: 'email_obtained',
    //     message: 'Данное мыло уже занято',
    //   },
    //   nameIsFunny: {
    //     code: 'name_is_funny',
    //     message: 'Слишком смешное имя',
    //   },
    // };
    // throw new HttpException(errors, HttpStatus.INTERNAL_SERVER_ERROR);

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
          token: 'have no fear, the JWT is here',
        });
      }, 2500);
    });
  }

  @Post('login')
  public async login(
    @Body() registerDto: ILoginRequest
  ): Promise<ILoginResponse | IResponseErrors> {
    return new Promise<IRegisterResponse>((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: 12,
            email: registerDto.email,
            username: 'exampla@mai.ru',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          token: 'have no fear, the JWT is here',
        });
      }, 2500);
    });
  }

  @Get('getCurrentUser')
  public async getCurrentUser(): Promise<
    IGetCurrentUserResponse | IResponseErrors
  > {
    return new Promise<IGetCurrentUserResponse>((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: 12,
            email: 'exampla@mai.ru',
            username: 'example',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          token: 'have no fear, the JWT is here',
        });
      }, 2500);
    });
  }

  @Get('getDepositList')
  public async getDepositList(): Promise<
    IGetDepositListResponse | IResponseErrors
  > {
    return new Promise<IGetDepositListResponse>((resolve) => {
      setTimeout(() => {
        resolve({
          deposits: [
            {
              id: 0,
              archived: false,
              period: {
                start: new Date(2024, 11, 20).toISOString(),
                end: new Date(2025, 0, 16).toISOString(),
              },
              type: {
                type: 'deposit',
                name: 'Вклад',
              },
              bank: {
                id: 0,
                name: 'Альфа-банк',
                shortName: 'Альфа',
              },
              capitalization: false,
              comment:
                'Здесь комментарий для себя, оставленный при создании карточки',
              displayPercent: 0.24,
              percentPeriods: [
                {
                  duration: 365,
                  percent: 0.24,
                },
              ],
              replenishable: false,
              withdrawal: false,
              startAmount: 250_000,
              currentAmount: 280_000,
            },
            {
              id: 1,
              archived: false,
              period: {
                start: new Date(2024, 11, 20).toISOString(),
                end: new Date(2025, 11, 20).toISOString(),
              },
              type: {
                type: 'deposit',
                name: 'Вклад',
              },
              bank: {
                id: 0,
                name: 'Т-Банк',
                shortName: 'Тинькофф',
              },
              capitalization: false,
              comment: 'Здесь смешной комментарий про переименование',
              displayPercent: 0.2,
              percentPeriods: [
                {
                  duration: 365,
                  percent: 0.24,
                },
              ],
              replenishable: false,
              withdrawal: false,
              startAmount: 500_000,
              currentAmount: 530_000,
            },
            {
              id: 2,
              archived: false,
              period: {
                start: new Date(2024, 11, 20).toISOString(),
                end: null,
              },
              type: {
                type: 'savings_account',
                name: 'Нак. счёт',
              },
              bank: {
                id: 0,
                name: 'Т-Банк',
                shortName: 'Тинькофф',
              },
              capitalization: true,
              comment:
                'Здесь комментарий про Сбер или банк, в общем, длинный коммент на две строки',
              displayPercent: 0.24,
              percentPeriods: [
                {
                  duration: 365,
                  percent: 0.24,
                },
              ],
              replenishable: false,
              withdrawal: false,
              startAmount: 500_000,
              currentAmount: 530_000,
            },
            {
              id: 3,
              archived: false,
              period: {
                start: new Date(2024, 11, 20).toISOString(),
                end: null,
              },
              type: {
                type: 'savings_account',
                name: 'Нак. счёт',
              },
              bank: {
                id: 0,
                name: 'Сбер',
                shortName: 'Сбербанк',
              },
              capitalization: true,
              comment: 'Здесь комментарий про ...',
              displayPercent: 0.24,
              percentPeriods: [
                {
                  duration: 365,
                  percent: 0.24,
                },
              ],
              replenishable: false,
              withdrawal: false,
              startAmount: 500_000,
              currentAmount: 530_000,
            },
          ],
        });
      }, 2500);
    });
  }
}
