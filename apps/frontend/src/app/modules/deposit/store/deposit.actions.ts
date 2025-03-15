import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import {
  IGetDepositResponse
} from '@banking/shared-types';
import { DepositAction } from '../../../store/store.enums';

export const getDeposit = createAction(
  DepositAction.GET_DEPOSIT
);
export const getDepositSuccess = createAction(
  DepositAction.GET_DEPOSIT_SUCCESS,
  props<{
    result: IGetDepositResponse;
  }>()
);
export const getDepositError = createAction(
  DepositAction.GET_DEPOSIT_ERROR,
  props<{
    error: HttpErrorResponse;
  }>()
);
