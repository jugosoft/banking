import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IGetCurrentUserResponse, ILoginRequest, IRegisterRequest, ILoginResponse, IRegisterResponse } from '@api/auth';
import { Observable } from 'rxjs';
import { environment } from 'src/app/config/api.config';

@Injectable()
export class AuthService {
    private readonly httpClient = inject(HttpClient);
    private readonly apiUrl = environment.apiUrl

    public register$(request: IRegisterRequest): Observable<IRegisterResponse> {
        return this.httpClient.post<IRegisterResponse>(
            `${this.apiUrl}/auth/local/register`,
            request
        );
    }

    public login$(request: ILoginRequest): Observable<ILoginResponse> {
        return this.httpClient.post<ILoginResponse>(`${this.apiUrl}/auth/local/login`, request);
    }

    public getCurrentUser$(): Observable<IGetCurrentUserResponse> {
        return this.httpClient.get<IGetCurrentUserResponse>(
            `${this.apiUrl}/auth/currentUser`
        );
    }
}
