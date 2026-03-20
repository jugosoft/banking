import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '@api/user/user.interface';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    private readonly httpClient = inject(HttpClient);

    public updateName(request: {
        firstName: string;
        lastName: string;
        patronymic?: string;
    }): Observable<IUser> {
        return this.httpClient.put<IUser>('/api/profile/name', request);
    }

    public updateEmail(request: { email: string }): Observable<IUser> {
        return this.httpClient.put<IUser>('/api/profile/email', request);
    }

    public updateUsername(request: {
        username: string;
    }): Observable<IUser> {
        return this.httpClient.put<IUser>(
            '/api/profile/username',
            request
        );
    }

    public updatePassword(request: {
        oldPassword: string;
        newPassword: string;
    }): Observable<{ success: boolean }> {
        return this.httpClient.put<{ success: boolean }>(
            '/api/profile/password',
            request
        );
    }
}
