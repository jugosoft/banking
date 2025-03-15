import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoreKey } from '../../../store/store.enums';
import { IDepositCard } from '../../../common/interfaces';
import { IDepositState } from './deposit.state';
import { IDeposit } from '@banking/shared-types';

export const selectDepositFeature = createFeatureSelector<IDepositState>(
  StoreKey.HOME
);

export const deposit = createSelector(
  selectDepositFeature,
  (state): IDeposit | null => state?.deposit ?? null
);

export const isSubmiting = createSelector(
  selectDepositFeature,
  (state): boolean | null => state?.isSubmiting ?? null
);
