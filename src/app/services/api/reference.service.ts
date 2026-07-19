import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { IGetDepositGroupsResponse } from '@api/reference/get-deposit-groups.response';
import { IDepositGroup } from '@api/deposit-group';
import { IBank, IGetBanksResponse } from '@api/bank';
import { IDepositType } from '@api/deposit-type';
import { IGetDepositTypesResponse } from '@api/reference/get-deposit-types.response';

@Injectable({
    providedIn: 'root',
})
export class ReferenceService extends BaseApiService {
    public readonly depositGroups$: Observable<IDepositGroup[]>;
    public readonly banks$: Observable<IBank[]>;
    public readonly depositTypes$: Observable<IDepositType[]>;

    constructor() {
        super('/reference');
        this.banks$ = this.loadBanks();
        this.depositTypes$ = this.loadDepositTypes();
        this.depositGroups$ = this.loadDepositGroups();
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


    private loadDepositGroups(): Observable<IDepositGroup[]> {
        return this.get<IGetDepositGroupsResponse>('/deposit-groups').pipe(
            map(response => response.data?.items ?? [])
        );
    }

    public saveDepositGroup$(depositGroup: Partial<IDepositGroup>): Observable<boolean> {
        return this.post<boolean>('/deposit-groups/save', { depositGroup });
    }

    public deleteDepositGroup$(depositGroupId: number): Observable<boolean> {
        return this.delete(`/deposit-groups/${depositGroupId}`);
    }
}
