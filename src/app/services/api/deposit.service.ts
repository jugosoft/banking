import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISaveDepositProps } from '../../modules/deposit/store/model/save-deposit.interfaces';
import { IGetDepositResponse, IGetDepositListResponse, IDeposit, IGetDepositStatsResponse } from '@api/deposit';
import { BaseApiService } from './base-api.service';

@Injectable({
    providedIn: 'root',
})
export class DepositService extends BaseApiService {
    constructor() {
        super('/deposit');
    }

    public getDepositList$(): Observable<IGetDepositListResponse> {
        return this.get<IGetDepositListResponse>('/list');
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
