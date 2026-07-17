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

    public getInvestList$(): Observable<IGetInvestListResponse> {
        return this.get<IGetInvestListResponse>('/list');
    }

    public getInvest$(investId: number): Observable<IGetInvestResponse> {
        return this.get<IGetInvestResponse>(`/${investId}`);
    }

    public saveInvest$(
        invest: { amount: number; startDate: Date; endDate: Date }
    ): Observable<boolean> {
        return this.post<boolean>('/save', { invest });
    }

    public deleteInvest$(investId: number): Observable<boolean> {
        return this.delete(`/${investId}`);
    }
}
