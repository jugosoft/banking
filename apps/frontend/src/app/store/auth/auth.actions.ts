import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthAction } from '../store.enums';

export const getEducationalProgramApprovedList = createAction(
  AuthAction.REGISTER
);
export const getEducationalProgramApprovedListSuccess = createAction(
  AuthAction.REGISTER_SUCCESS,
  props<{
    result: boolean;
  }>()
);
export const getEducationalProgramApprovedListError = createAction(
  AuthAction.REGISTER_ERROR,
  props<{
    error: HttpErrorResponse;
  }>()
);
