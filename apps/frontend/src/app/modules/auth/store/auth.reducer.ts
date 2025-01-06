import { Action, createReducer, on } from '@ngrx/store';
import { IAuthState } from './auth.state';
import {
  login,
  loginError,
  loginSuccess,
  register,
  registerError,
  registerSuccess,
} from './auth.actions';

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
      token: null,
      currentUser: null,
      validationErrors: null,
      isSubmiting: true,
    })
  ),

  on(
    registerSuccess,
    (state, { result }): IAuthState => ({
      ...state,
      isSubmiting: false,
      token: result.token,
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
      currentUser: null,
      token: null,
      isSubmiting: false,
      validationErrors: error.error,
    })
  ),

  on(
    login,
    (state): IAuthState => ({
      ...state,
      currentUser: null,
      token: null,
      isSubmiting: true,
      validationErrors: null,
    })
  ),

  on(
    loginSuccess,
    (state, { result }): IAuthState => ({
      ...state,
      isSubmiting: false,
      token: result.token,
      currentUser: {
        ...result.user,
        createdAt: new Date(result.user.createdAt),
        updatedAt: new Date(result.user.updatedAt),
      },
    })
  ),

  on(
    loginError,
    (state, { error }): IAuthState => ({
      ...state,
      token: null,
      currentUser: null,
      isSubmiting: false,
      validationErrors: error.error,
    })
  )
);

export function reducer(state: IAuthState, action: Action) {
  return authReducer(state, action);
}
