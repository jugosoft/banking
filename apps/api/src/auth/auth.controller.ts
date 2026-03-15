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
import { mockRegisterResponse, mockLoginResponse, mockGetCurrentUserResponse } from './mock/auth.mock';

@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AppService) { }

  @Post('register')
  public async register(
    @Body() registerDto: IRegisterRequest
  ): Promise<IRegisterResponse | IResponseErrors> {
    return new Promise<IRegisterResponse>((resolve) => {
      setTimeout(() => {
        resolve(mockRegisterResponse(registerDto));
      }, 2500);
    });
  }

  @Post('login')
  public async login(
    @Body() loginDto: ILoginRequest
  ): Promise<ILoginResponse | IResponseErrors> {
    return new Promise<IRegisterResponse>((resolve) => {
      setTimeout(() => {
        resolve(mockLoginResponse(loginDto));
      }, 2500);
    });
  }

  @Post('getCurrentUser')
  public async getCurrentUser(): Promise<
    IGetCurrentUserResponse | IResponseErrors
  > {
    return new Promise<IGetCurrentUserResponse>((resolve) => {
      setTimeout(() => {
        resolve(mockGetCurrentUserResponse());
      }, 2500);
    });
  }
}
