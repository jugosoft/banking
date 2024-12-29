import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoreKey } from '../store.enums';
import { IAuthState } from './auth.state';

export const selectEduProgFeature = createFeatureSelector<IAuthState>(
  StoreKey.AUTH
);

export const selectAuthToken = createSelector(
  selectEduProgFeature,
  (state) => state.token
);

