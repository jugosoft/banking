import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthAction } from '../../../store/store.enums';
import { IRegisterRequest } from '../types/register-request.interface';

export const register = createAction(
  AuthAction.REGISTER,
  props<IRegisterRequest>()
);
export const registerSuccess = createAction(
  AuthAction.REGISTER_SUCCESS,
  props<{
    result: boolean;
  }>()
);
export const registerError = createAction(
  AuthAction.REGISTER_ERROR,
  props<{
    error: HttpErrorResponse;
  }>()
);
