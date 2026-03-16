import { Body, Controller, Post, Inject, Res } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Response } from 'express';
import { JwtService } from './services/jwt.service';
import {
    ErrorCode,
    IGetCurrentUserResponse,
    ILoginRequest,
    ILoginResponse,
    IRegisterRequest,
    IRegisterResponse,
    IResponseErrors,
    User,
    UserRole,
} from '@banking/shared-types';

@Controller('auth')
export class AuthController {
    private readonly userRepository: Repository<User>;

    public constructor(
        @Inject('DATA_SOURCE') private dataSource: DataSource,
        private readonly jwtService: JwtService
    ) {
        this.userRepository = dataSource.getRepository(User);
    }

    @Post('register')
    public async register(
        @Body() registerDto: IRegisterRequest,
        @Res({ passthrough: true }) response: Response
    ): Promise<IRegisterResponse | IResponseErrors> {
        const user = this.userRepository.create({
            email: registerDto.email,
            username: registerDto.username,
            password: 'hashed_password', // В реальности нужно хешировать пароль
        });

        const savedUser = await this.userRepository.save(user);
        const token = this.jwtService.generateToken(savedUser);

        response.cookie('token', token, { httpOnly: true, secure: true });

        return {
            user: {
                id: savedUser.id,
                email: savedUser.email,
                username: savedUser.username,
                createdAt: savedUser.createdAt,
                updatedAt: savedUser.updatedAt,
            },
            token,
        };
    }

    @Post('login')
    public async login(
        @Body() loginDto: ILoginRequest,
        @Res({ passthrough: true }) response: Response
    ): Promise<ILoginResponse | IResponseErrors> {
        const user = await this.userRepository.findOne({
            where: { email: loginDto.email },
        });

        if (!user) {
            return {
                error: { code: ErrorCode.NO_USER, message: 'User not found' },
            };
        }

        // В реальности нужно проверять хеш пароля
        const token = this.jwtService.generateToken(user);
        response.cookie('token', token, { httpOnly: true, secure: true });

        return {
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                patronymic: user.patronymic,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
            token,
        };
    }

    @Post('getCurrentUser')
    public async getCurrentUser(
        @Body('token') token: string
    ): Promise<IGetCurrentUserResponse | IResponseErrors> {
        const payload = this.jwtService.verifyToken(token);
        if (!payload) {
            return {
                error: {
                    code: ErrorCode.NO_USER,
                    message: 'Invalid or expired token',
                },
            };
        }

        const user = await this.userRepository.findOne({
            where: { id: payload.sub },
        });

        if (!user) {
            return {
                error: { code: ErrorCode.NO_USER, message: 'User not found' },
            };
        }

        return {
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                patronymic: user.patronymic,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
            token,
        };
    }
}
