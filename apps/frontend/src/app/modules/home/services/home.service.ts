import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IGetDepositListResponse,
} from '@banking/shared-types';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private readonly httpClient = inject(HttpClient);

  public getDepositList$(): Observable<IGetDepositListResponse> {
    return this.httpClient.get<IGetDepositListResponse>(
      '/api/app/getDepositList',
      {}
    );
  }
}
