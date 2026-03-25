import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { HomeAction } from '../../../store/store.enums';
import { IDeposit, IGetDepositListResponse } from '@api/deposit';

export const getDepositList = createAction(HomeAction.GET_DEPOSIT_LIST);
export const getDepositListSuccess = createAction(
    HomeAction.GET_DEPOSIT_LIST_SUCCESS,
    props<{
        result: IGetDepositListResponse;
    }>()
);
export const getDepositListError = createAction(
    HomeAction.GET_DEPOSIT_LIST_ERROR,
    props<{
        error: HttpErrorResponse;
    }>()
);
