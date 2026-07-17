import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { IGetStatisticsResponse } from '@api/statistics';
import { IGetInvestStatisticsResponse } from '@api/statistics/get-invest-statistics.response';

@Injectable({
    providedIn: 'root',
})
export class StatisticsService extends BaseApiService {
    constructor() {
        super('/statistics');
    }

    public getDepositsStatistics$(): Observable<IGetStatisticsResponse> {
        return this.get<IGetStatisticsResponse>('/deposits');
    }


    public getInvestStatistics$(): Observable<IGetInvestStatisticsResponse> {
        return this.get<IGetStatisticsResponse>('/invests');
    }
}
