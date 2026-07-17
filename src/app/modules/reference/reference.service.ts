import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IBank, IGetBanksResponse } from '@api/bank';
import { BaseApiService } from '../../services/api/base-api.service';
import { IGetDepositTypesResponse } from '@api/reference/get-deposit-types.response';
import { IDepositType } from '@api/deposit-type';

@Injectable({
  providedIn: 'root',
})
export class ReferenceService extends BaseApiService {
    public readonly banks$: Observable<IBank[]>;
    public readonly depositTypes$: Observable<IDepositType[]>;

    constructor() {
        super('/reference');
        this.banks$ = this.loadBanks();
        this.depositTypes$ = this.loadDepositTypes();
    }

    private loadBanks(): Observable<IBank[]> {
        return this.get<IGetBanksResponse>('/banks').pipe(
            map(response => response.data?.items ?? [])
        );
    }

    private loadDepositTypes(): Observable<IDepositType[]> {
        return this.get<IGetDepositTypesResponse>('/deposit-types').pipe(
            map(response => response.data?.items ?? [])
        );
    }
}
