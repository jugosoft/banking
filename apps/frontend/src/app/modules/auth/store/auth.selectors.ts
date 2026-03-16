import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IResponseErrors } from '@banking/shared-types';
import { StoreKey } from '../../../store/store.enums';
import { IAuthState } from './auth.state';
import { ICurrentUser } from '../types';

export const selectAuthFeature = createFeatureSelector<IAuthState>(
    StoreKey.AUTH
);

export const selectCurrentUser = createSelector(
    selectAuthFeature,
    (state): ICurrentUser | null => state?.currentUser ?? null
);

export const selectIsSubmiting = createSelector(
    selectAuthFeature,
    (state): boolean | null => state?.isSubmiting ?? null
);

export const selectIsLoggedIn = createSelector(
    selectAuthFeature,
    (state): boolean => !!state?.currentUser
);

export const selectValidationErrors = createSelector(
    selectAuthFeature,
    (state): IResponseErrors | null => state?.validationErrors ?? null
);
