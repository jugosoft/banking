import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthAction } from '../../../store/store.enums';
import { IRegisterRequest, IRegisterResponse } from '@banking/shared-types';

export const register = createAction(
  AuthAction.REGISTER,
  props<{ request: IRegisterRequest }>()
);
export const registerSuccess = createAction(
  AuthAction.REGISTER_SUCCESS,
  props<{
    result: IRegisterResponse;
  }>()
);
export const registerError = createAction(
  AuthAction.REGISTER_ERROR,
  props<{
    error: HttpErrorResponse;
  }>()
);
