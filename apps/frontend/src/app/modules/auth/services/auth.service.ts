import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegisterRequest, IRegisterResponse } from '@banking/shared-types';

@Injectable()
export class AuthService {
  private readonly httpClient = inject(HttpClient);

  public register(request: IRegisterRequest): Observable<IRegisterResponse> {
    return this.httpClient.post<IRegisterResponse>(
      '/api/app/register',
      request
    );
  }
}
