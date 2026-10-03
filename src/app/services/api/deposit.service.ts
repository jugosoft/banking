import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetDepositResponse, IGetDepositListResponse, IGetDepositStatsResponse } from '@api/deposit';
import { BaseApiService } from './base-api.service';
import { ISaveDepositProps } from 'src/app/modules/deposit/store/model/save-deposit.interfaces';
import { IDepositListFilter } from 'src/app/modules/deposit/store/model/deposit-list-filter.interfaces';

@Injectable({
    providedIn: 'root',
})
export class DepositService extends BaseApiService {
    constructor() {
        super('/deposit');
    }

    public getDepositList$(page: number = 0, size: number = 10, filter?: IDepositListFilter): Observable<IGetDepositListResponse> {
        const params: Record<string, unknown> = { page, size };

        if (filter?.bankId?.length) {
            params['bankId'] = filter.bankId.join(',');
        }

        if (filter?.actual !== undefined) {
            params['actual'] = filter.actual;
        }

        return this.get<IGetDepositListResponse>('/list', params);
    }

    public getDeposit$(depositId: number): Observable<IGetDepositResponse> {
        return this.get<IGetDepositResponse>(`/${depositId}`);
    }

    public getDepositStats$(): Observable<IGetDepositStatsResponse> {
        return this.get<IGetDepositStatsResponse>('/stats');
    }

    public saveDeposit$(
        deposit: ISaveDepositProps['deposit']
    ): Observable<boolean> {
        return this.post<boolean>('/save', { deposit });
    }

    public deleteDeposit$(depositId: number): Observable<boolean> {
        return this.delete(`/${depositId}`);
    }
}
