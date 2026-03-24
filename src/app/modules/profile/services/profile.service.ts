import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserInfo } from '@api/user/user.interface';

/**
 * Сервис для работы с профилем пользователя
 */
@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    private readonly httpClient = inject(HttpClient);

    /**
     * Получение данных текущего пользователя
     * @returns Observable<IUserInfo> - данные пользователя
     */
    public getCurrentUser$(): Observable<IUserInfo> {
        return this.httpClient.get<IUserInfo>('/api/users/me');
    }

    /**
     * Обновление имени пользователя
     * @param request - данные для обновления имени
     * @returns Observable<IUserInfo> - обновлённые данные пользователя
     */
    public updateName$(request: {
        firstName: string;
        lastName: string;
        patronymic?: string;
    }): Observable<IUserInfo> {
        return this.httpClient.put<IUserInfo>('/api/profile/name', request);
    }

    /**
     * Обновление email
     * @param request - новый email
     * @returns Observable<IUserInfo> - обновлённые данные пользователя
     */
    public updateEmail$(request: { email: string }): Observable<IUserInfo> {
        return this.httpClient.put<IUserInfo>('/api/profile/email', request);
    }

    /**
     * Обновление логина
     * @param request - новый логин
     * @returns Observable<IUserInfo> - обновлённые данные пользователя
     */
    public updateUsername$(request: {
        username: string;
    }): Observable<IUserInfo> {
        return this.httpClient.put<IUserInfo>(
            '/api/profile/username',
            request
        );
    }

    /**
     * Смена пароля
     * @param request - текущий и новый пароль
     * @returns Observable<{ success: boolean }> - результат операции
     */
    public updatePassword$(request: {
        oldPassword: string;
        newPassword: string;
    }): Observable<{ success: boolean }> {
        return this.httpClient.put<{ success: boolean }>(
            '/api/profile/password',
            request
        );
    }
}
