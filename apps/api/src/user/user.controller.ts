import { Body, Controller, Post } from '@nestjs/common';

import {
  IGetCurrentUserResponse,
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
  IResponseErrors,
  ErrorCode
} from '@banking/shared-types';

@Controller('user')
export class UserController {
  constructor() { }

  @Post('register')
  public async register(
    @Body() registerDto: IRegisterRequest
  ): Promise<IRegisterResponse | IResponseErrors> {
    // Здесь будет обращение к реальной базе данных для регистрации пользователя
    // Заглушка для сохранения пользователя в БД
    const user = null; // Предположим, что регистрация не удалась

    if (!user) {
      return { error: { code: ErrorCode.REGISTRATION_FAILED, message: 'User registration failed' } };
    }

    return {
      user,
      token: 'have no fear, the JWT is here'
    };
  }

  @Post('login')
  public async login(
    @Body() loginDto: ILoginRequest
  ): Promise<ILoginResponse | IResponseErrors> {
    // Здесь будет обращение к реальной базе данных для аутентификации пользователя
    // Заглушка для поиска пользователя в БД
    const user = null; // Предположим, что пользователь не найден

    if (!user) {
      return { error: { code: ErrorCode.AUTHENTICATION_FAILED, message: 'User not found' } };
    }

    return {
      user,
      token: 'have no fear, the JWT is here'
    };
  }

  @Post('getCurrentUser')
  public async getCurrentUser(): Promise<
    IGetCurrentUserResponse | IResponseErrors
  > {
    // Здесь будет обращение к реальной базе данных для получения текущего пользователя
    // Заглушка для получения пользователя из БД
    const user = null; // Предположим, что пользователь не найден

    if (!user) {
      return { error: { code: ErrorCode.NO_USER, message: 'User not found' } };
    }

    return {
      user,
      token: 'have no fear, the JWT is here'
    };
  }
}
