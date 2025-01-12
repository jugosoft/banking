import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import {
  IGetDepositListResponse,
  IRegisterRequest,
} from '@banking/shared-types';
import { AuthAction, HomeAction } from '../../../store/store.enums';

export const getDepositList = createAction(
  AuthAction.REGISTER,
  props<{ request: IRegisterRequest }>()
);
export const getDepositListSuccess = createAction(
  HomeAction.GET_DEPOSIT_LIST,
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
