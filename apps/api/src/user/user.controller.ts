import { Body, Controller, Post } from '@nestjs/common';

import { AppService } from '../app.service';
import {
  IGetCurrentUserResponse,
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
  IResponseErrors,
} from '@banking/shared-types';

@Controller('user')
export class UserController {
  constructor(private readonly appService: AppService) { }

  @Post('register')
  public async register(
    @Body() registerDto: IRegisterRequest
  ): Promise<IRegisterResponse | IResponseErrors> {
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
    @Body() loginDto: ILoginRequest
  ): Promise<ILoginResponse | IResponseErrors> {
    return new Promise<IRegisterResponse>((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: 12,
            email: loginDto.email,
            username: 'exampla@mai.ru',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          token: 'have no fear, the JWT is here',
        });
      }, 2500);
    });
  }

  @Post('getCurrentUser')
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
}
