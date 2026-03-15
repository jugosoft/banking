import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICurrentUser } from '../../auth/types';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly httpClient = inject(HttpClient);

  public updateName(request: { firstName: string; lastName: string; patronymic?: string }): Observable<ICurrentUser> {
    return this.httpClient.put<ICurrentUser>('/api/profile/name', request);
  }

  public updateEmail(request: { email: string }): Observable<ICurrentUser> {
    return this.httpClient.put<ICurrentUser>('/api/profile/email', request);
  }

  public updateUsername(request: { username: string }): Observable<ICurrentUser> {
    return this.httpClient.put<ICurrentUser>('/api/profile/username', request);
  }

  public updatePassword(request: { oldPassword: string; newPassword: string }): Observable<{ success: boolean }> {
    return this.httpClient.put<{ success: boolean }>('/api/profile/password', request);
  }
}