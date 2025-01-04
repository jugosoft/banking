import { Action, createReducer, on } from '@ngrx/store';
import { IAuthState } from './auth.state';
import { register, registerError, registerSuccess } from './auth.actions';

export const initialState: IAuthState = {
  isSubmiting: null,
  currentUser: null,
  token: null,
  validationErrors: null,
};

const authReducer = createReducer(
  initialState,

  on(
    register,
    (state): IAuthState => ({
      ...state,
      isSubmiting: true,
      validationErrors: null,
    })
  ),

  on(
    registerSuccess,
    (state, { result }): IAuthState => ({
      ...state,
      isSubmiting: false,
      currentUser: {
        ...result.user,
        createdAt: new Date(result.user.createdAt),
        updatedAt: new Date(result.user.updatedAt),
      },
    })
  ),

  on(
    registerError,
    (state, { error }): IAuthState => ({
      ...state,
      isSubmiting: false,
      currentUser: null,
      validationErrors: error.error,
    })
  )
);

export function reducer(state: IAuthState, action: Action) {
  return authReducer(state, action);
}
