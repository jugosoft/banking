import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthAction } from '../../../store/store.enums';

export const register = createAction(AuthAction.REGISTER);
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
