import { createReducer, on } from '@ngrx/store';
import { ProfileState } from './profile.state';
import * as ProfileActions from './profile.actions';

export const initialState: ProfileState = {
  isSubmitting: false,
  validationErrors: null
};

const profileReducer = createReducer(
  initialState,

  on(ProfileActions.updateName, ProfileActions.updateEmail, ProfileActions.updateUsername, ProfileActions.updatePassword, (state) => ({
    ...state,
    isSubmitting: true,
    validationErrors: null
  })),

  on(ProfileActions.updateNameSuccess, ProfileActions.updateEmailSuccess, ProfileActions.updateUsernameSuccess, ProfileActions.updatePasswordSuccess, (state) => ({
    ...state,
    isSubmitting: false
  })),

  on(ProfileActions.updateNameFailure, ProfileActions.updateEmailFailure, ProfileActions.updateUsernameFailure, ProfileActions.updatePasswordFailure, (state, { error }) => ({
    ...state,
    isSubmitting: false,
    validationErrors: error.message
  }))
);

export function reducer(state: ProfileState | undefined, action: any) {
  return profileReducer(state, action);
}