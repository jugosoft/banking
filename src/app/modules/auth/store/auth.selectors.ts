import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoreKey } from '../../../store/store.enums';
import { IAuthState } from './auth.state';
import { IResponseErrors } from '@api/api.interfaces';

export const selectAuthFeature = createFeatureSelector<IAuthState>(
    StoreKey.AUTH
);

export const selectCurrentUser = createSelector(
    selectAuthFeature,
    (state) => state?.currentUser ?? null
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
