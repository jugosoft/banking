import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISaveDepositProps } from '../../modules/deposit/store/model/save-deposit.interfaces';
import { IGetDepositResponse, IGetDepositListResponse, IDeposit } from '@api/deposit';
import { environment } from '../../config/api.config';

@Injectable({
    providedIn: 'root',
})
export class DepositService {
    private readonly httpClient = inject(HttpClient);
    private readonly apiUrl = environment.apiUrl

    public getDepositList$(): Observable<IGetDepositListResponse> {
        return this.httpClient.get<IGetDepositListResponse>(
            `${this.apiUrl}/deposit/list`,
            {}
        );
    }

    public getDeposit$(depositId: number): Observable<IGetDepositResponse> {
        return this.httpClient.get<IGetDepositResponse>(
            `${this.apiUrl}/deposit/${depositId}`,
            {}
        );
    }

    public saveDeposit$(
        deposit: ISaveDepositProps['deposit']
    ): Observable<boolean> {
        return this.httpClient.post<boolean>(`${this.apiUrl}/app/saveDeposit`, {
            deposit,
        });
    }
}
