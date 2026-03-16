import { Body, Controller, Get, Put, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ErrorCode, IResponseErrors, User } from '@banking/shared-types';

@Controller('profile')
export class ProfileController {
    private readonly userRepository: Repository<User>;

    constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
        this.userRepository = dataSource.getRepository(User);
    }

    @Get('me')
    public async getProfile(): Promise<User | IResponseErrors> {
        // В реальности нужно получать ID из токена
        const user = await this.userRepository.findOne({
            where: { id: 12 },
        });

        if (!user) {
            return {
                error: { code: ErrorCode.NO_USER, message: 'User not found' },
            };
        }

        return user;
    }

    @Put('name')
    public async updateName(
        @Body()
        body: {
            firstName: string;
            lastName: string;
            patronymic?: string;
        }
    ): Promise<User | IResponseErrors> {
        // В реальности нужно получать ID из токена
        const user = await this.userRepository.findOne({
            where: { id: 12 },
        });

        if (!user) {
            return {
                error: { code: ErrorCode.NO_USER, message: 'User not found' },
            };
        }

        user.firstName = body.firstName;
        user.lastName = body.lastName;
        user.patronymic = body.patronymic;

        return await this.userRepository.save(user);
    }

    @Put('email')
    public async updateEmail(
        @Body() body: { email: string }
    ): Promise<User | IResponseErrors> {
        // В реальности нужно получать ID из токена
        const user = await this.userRepository.findOne({
            where: { id: 12 },
        });

        if (!user) {
            return {
                error: { code: ErrorCode.NO_USER, message: 'User not found' },
            };
        }

        // Проверка на уникальность email
        const existingUser = await this.userRepository.findOne({
            where: { email: body.email },
        });

        if (existingUser && existingUser.id !== user.id) {
            return {
                error: {
                    code: ErrorCode.EMAIL_EXISTS,
                    message: 'Email already exists',
                },
            };
        }

        user.email = body.email;

        return await this.userRepository.save(user);
    }

    @Put('username')
    public async updateUsername(
        @Body() body: { username: string }
    ): Promise<User | IResponseErrors> {
        // В реальности нужно получать ID из токена
        const user = await this.userRepository.findOne({
            where: { id: 12 },
        });

        if (!user) {
            return {
                error: { code: ErrorCode.NO_USER, message: 'User not found' },
            };
        }

        // Проверка на уникальность username
        const existingUser = await this.userRepository.findOne({
            where: { username: body.username },
        });

        if (existingUser && existingUser.id !== user.id) {
            return {
                error: {
                    code: ErrorCode.USER_EXISTS,
                    message: 'USername already exists',
                },
            };
        }

        user.username = body.username;

        return await this.userRepository.save(user);
    }

    @Put('password')
    public async updatePassword(
        @Body() body: { oldPassword: string; newPassword: string }
    ): Promise<{ success: boolean; error?: string }> {
        // В реальности нужно получать ID из токена
        const user = await this.userRepository.findOne({
            where: { id: 12 },
        });

        if (!user) {
            return { error: 'User not found', success: false };
        }

        // В реальности нужно проверять хеш старого пароля
        // Здесь упрощенная проверка для демонстрации
        if (body.oldPassword !== 'current_password') {
            return { error: 'Invalid current password', success: false };
        }

        // В реальности нужно хешировать новый пароль
        user.password = 'hashed_' + body.newPassword;

        await this.userRepository.save(user);

        return { success: true };
    }
}
