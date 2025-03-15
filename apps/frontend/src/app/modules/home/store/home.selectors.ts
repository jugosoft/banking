import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoreKey } from '../../../store/store.enums';
import { IHomeState } from './home.state';
import { IDepositCard } from '../../../common/interfaces';

export const selectAuthFeature = createFeatureSelector<IHomeState>(
  StoreKey.HOME
);

export const deposits = createSelector(
  selectAuthFeature,
  (state): IDepositCard[] | null => state?.deposits ?? null
);

export const isSubmiting = createSelector(
  selectAuthFeature,
  (state): boolean | null => state?.isSubmiting ?? null
);
