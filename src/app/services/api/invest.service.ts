import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetInvestResponse, IGetInvestListResponse } from '@api/invest';
import { BaseApiService } from './base-api.service';

@Injectable({
    providedIn: 'root',
})
export class InvestService extends BaseApiService {
    constructor() {
        super('/invest');
    }

    public getInvestList$(page: number = 0, size: number = 10): Observable<IGetInvestListResponse> {
        return this.get<IGetInvestListResponse>('/list', { page, size });
    }

    public getInvest$(investId: number): Observable<IGetInvestResponse> {
        return this.get<IGetInvestResponse>(`/${investId}`);
    }

    public saveInvest$(
        invest: { amount: number; startDate: Date; bankId: number; depositTypeId: number; snapshotDate?: Date }
    ): Observable<boolean> {
        return this.post<boolean>('/save', { invest });
    }

    public deleteInvest$(investId: number): Observable<boolean> {
        return this.delete(`/${investId}`);
    }
}
