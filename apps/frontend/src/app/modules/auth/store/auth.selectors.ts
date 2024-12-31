import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoreKey } from '../../../store/store.enums';
import { IAuthState } from './auth.state';

export const selectEduProgFeature = createFeatureSelector<IAuthState>(
  StoreKey.AUTH
);

export const selectIsSubmiting = createSelector(
  selectEduProgFeature,
  (state) => state.isSubmiting
);
