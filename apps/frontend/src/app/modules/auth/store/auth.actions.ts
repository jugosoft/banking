import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import {
  IRegisterRequest,
  ILoginResponse,
  IRegisterResponse,
  ILoginRequest,
  IGetCurrentUserResponse,
} from '@banking/shared-types';
import { AuthAction } from '../../../store/store.enums';

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

export const login = createAction(
  AuthAction.LOGIN,
  props<{ request: ILoginRequest }>()
);
export const loginSuccess = createAction(
  AuthAction.LOGIN_SUCCESS,
  props<{
    result: ILoginResponse;
  }>()
);
export const loginError = createAction(
  AuthAction.LOGIN_ERROR,
  props<{
    error: HttpErrorResponse;
  }>()
);

export const getCurrentUser = createAction(AuthAction.GET_CURRENT_USER);
export const getCurrentUserSuccess = createAction(
  AuthAction.GET_CURRENT_USER_SUCCESS,
  props<{
    result: IGetCurrentUserResponse;
  }>()
);
/* При ошибке перенаправляем на авторизацию */
export const getCurrentUserError = createAction(
  AuthAction.GET_CURRENT_USER_ERROR
);
