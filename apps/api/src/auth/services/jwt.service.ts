import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { User } from '@banking/shared-types';
import { UserRole } from '@banking/shared-types';

@Injectable()
export class JwtService {
    constructor(private readonly nestJwtService: NestJwtService) {}

    public generateToken(user: User): string {
        const payload = {
            sub: user.id,
            role: UserRole.USER,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 3600, // токен действителен 1 час
        };
        return this.nestJwtService.sign(payload);
    }

    public verifyToken(token: string): any {
        try {
            return this.nestJwtService.verify(token);
        } catch (error) {
            return null;
        }
    }
}
