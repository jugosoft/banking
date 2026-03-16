import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState } from './profile.state';

export const selectProfileState =
    createFeatureSelector<ProfileState>('profile');

export const selectIsSubmitting = createSelector(
    selectProfileState,
    (state: ProfileState) => state.isSubmitting
);

export const selectValidationErrors = createSelector(
    selectProfileState,
    (state: ProfileState) => state.validationErrors
);
