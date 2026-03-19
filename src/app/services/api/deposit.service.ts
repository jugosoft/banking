import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISaveDepositProps } from '../../modules/deposit/store/model/save-deposit.interfaces';
import { IGetDepositResponse, IGetDepositListResponse, IDeposit } from '@api/deposit';

@Injectable({
    providedIn: 'root',
})
export class DepositService {
    private readonly httpClient = inject(HttpClient);

    public getDepositList$(): Observable<IGetDepositListResponse> {
        return this.httpClient.get<IGetDepositListResponse>(
            '/api/app/getDepositList',
            {}
        );
    }

    public getDeposit$(depositId: number): Observable<IGetDepositResponse> {
        return this.httpClient.get<IGetDepositResponse>(
            '/api/app/getDeposit',
            {}
        );
    }

    public saveDeposit$(
        deposit: ISaveDepositProps['deposit']
    ): Observable<boolean> {
        return this.httpClient.post<boolean>('/api/app/saveDeposit', {
            deposit,
        });
    }
}
