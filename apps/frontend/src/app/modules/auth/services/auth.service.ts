import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IGetCurrentUserResponse,
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
} from '@banking/shared-types';

@Injectable()
export class AuthService {
  private readonly httpClient = inject(HttpClient);

  public register$(request: IRegisterRequest): Observable<IRegisterResponse> {
    return this.httpClient.post<IRegisterResponse>(
      '/api/app/register',
      request
    );
  }

  public login$(request: ILoginRequest): Observable<ILoginResponse> {
    return this.httpClient.post<ILoginResponse>('/api/app/login', request);
  }

  public getCurrentUser$(): Observable<IGetCurrentUserResponse> {
    return this.httpClient.get<IGetCurrentUserResponse>(
      '/api/app/getCurrentUser'
    );
  }
}
