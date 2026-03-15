import { Body, Controller, Post, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from '../app.service';
import {
  IGetCurrentUserResponse,
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
  IResponseErrors,
} from '@banking/shared-types';
import { User } from '@banking/shared-types';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly appService: AppService,
    @Inject('DATA_SOURCE') private dataSource: DataSource
  ) { }

  @Post('register')
  public async register(
    @Body() registerDto: IRegisterRequest
  ): Promise<IRegisterResponse | IResponseErrors> {
    const userRepository = this.dataSource.getRepository(User);

    const user = userRepository.create({
      email: registerDto.email,
      username: registerDto.username,
      password: 'hashed_password' // В реальности нужно хешировать пароль
    });

    const savedUser = await userRepository.save(user);

    return {
      user: {
        id: savedUser.id,
        email: savedUser.email,
        username: savedUser.username,
        createdAt: savedUser.createdAt.toISOString(),
        updatedAt: savedUser.updatedAt.toISOString(),
      },
      token: 'have no fear, the JWT is here',
    };
  }

  @Post('login')
  public async login(
    @Body() loginDto: ILoginRequest
  ): Promise<ILoginResponse | IResponseErrors> {
    const userRepository = this.dataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { email: loginDto.email }
    });

    if (!user) {
      return { error: 'User not found' };
    }

    // В реальности нужно проверять хеш пароля

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
      token: 'have no fear, the JWT is here',
    };
  }

  @Post('getCurrentUser')
  public async getCurrentUser(): Promise<
    IGetCurrentUserResponse | IResponseErrors
  > {
    const userRepository = this.dataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { id: 12 } // В реальности нужно получать ID из токена
    });

    if (!user) {
      return { error: 'User not found' };
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
      token: 'have no fear, the JWT is here',
    };
  }
}
