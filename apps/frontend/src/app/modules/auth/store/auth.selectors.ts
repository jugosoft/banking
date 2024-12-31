import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoreKey } from '../../../store/store.enums';
import { IAuthState } from './auth.state';

export const selectAuthFeature = createFeatureSelector<IAuthState>(
  StoreKey.AUTH
);

export const selectIsSubmiting = createSelector(
  selectAuthFeature,
  (state): boolean | null => state.isSubmiting
);
