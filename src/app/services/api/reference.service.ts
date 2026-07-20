import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { IGetDepositGroupsResponse } from '@api/reference/get-deposit-groups.response';
import { IDepositGroup } from '@api/deposit-group';
import { IBank, IGetBanksResponse } from '@api/bank';
import { IDepositType } from '@api/deposit-type';
import { IGetDepositTypesResponse } from '@api/reference/get-deposit-types.response';
import { IApiResponse } from '@api/api.interfaces';

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
    return this.get<IGetBanksResponse>('/bank/list').pipe(
      map(response => response.data?.items ?? [])
    );
  }

  private loadDepositTypes(): Observable<IDepositType[]> {
    return this.get<IGetDepositTypesResponse>('/deposit-type/list').pipe(
      map(response => response.data?.items ?? [])
    );
  }

  private loadDepositGroups(): Observable<IDepositGroup[]> {
    return this.get<IGetDepositGroupsResponse>('/deposit-group/list').pipe(
      map(response => response.data?.items ?? [])
    );
  }

  public getDepositGroup$(depositGroupId: number): Observable<IApiResponse<IDepositGroup>> {
    return this.get<IApiResponse<IDepositGroup>>(`/deposit-group/${depositGroupId}`);
  }

  public saveDepositGroup$(depositGroup: Partial<IDepositGroup>): Observable<boolean> {
    return this.post<boolean>('/deposit-group', { depositGroup });
  }

  public deleteDepositGroup$(depositGroupId: number): Observable<boolean> {
    return this.delete(`/deposit-group/${depositGroupId}`);
  }

  public getBank$(bankId: number): Observable<IApiResponse<IBank>> {
    return this.get<IApiResponse<IBank>>(`/bank/${bankId}`);
  }

  public saveBank$(bank: Partial<IBank>): Observable<boolean> {
    return this.post<boolean>('/bank', { ...bank });
  }

  public deleteBank$(bankId: number): Observable<boolean> {
    return this.delete(`/bank/${bankId}`);
  }

  public getDepositType$(depositTypeId: number): Observable<IApiResponse<IDepositType>> {
    return this.get<IApiResponse<IDepositType>>(`/deposit-type/${depositTypeId}`);
  }

  public saveDepositType$(depositType: Partial<IDepositType>): Observable<boolean> {
    return this.post<boolean>('/deposit-type', {
      id: depositType.id,
      depositGroupId: depositType.depositGroup?.id,
      name: depositType.name
    });
  }

  public deleteDepositType$(depositTypeId: number): Observable<boolean> {
    return this.delete(`/deposit-type/${depositTypeId}`);
  }
}
