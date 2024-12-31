import { Action, createReducer, on } from '@ngrx/store';
import { IAuthState } from './auth.state';
import { register } from './auth.actions';

export const initialState: IAuthState = {
  isSubmiting: null,
};

const authReducer = createReducer(
  initialState,

  on(
    register,
    (state): IAuthState => ({
      ...state,
      isSubmiting: true,
    })
  )
);

export function reducer(state: IAuthState, action: Action) {
  return authReducer(state, action);
}
