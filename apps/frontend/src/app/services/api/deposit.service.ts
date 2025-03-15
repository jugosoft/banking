import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IGetDepositListResponse,
  IGetDepositResponse,
} from '@banking/shared-types';

@Injectable({
  providedIn: 'root'
})
export class DepositService {
  private readonly httpClient = inject(HttpClient);

  public getDepositList$(): Observable<IGetDepositListResponse> {
    return this.httpClient.get<IGetDepositListResponse>(
      '/api/app/getDepositList',
      {}
    );
  }

  public getDeposit$(): Observable<IGetDepositResponse> {
    return this.httpClient.get<IGetDepositResponse>(
      '/api/app/getDepositList',
      {}
    );
  }
}
