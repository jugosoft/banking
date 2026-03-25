import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoreKey } from '../../../store/store.enums';
import { IHomeState } from './home.state';
import { IDepositCard } from 'src/app/common/interfaces';

export const selectHomeFeature = createFeatureSelector<IHomeState>(
    StoreKey.HOME
);

export const selectDeposits = createSelector(
    selectHomeFeature,
    (state): IDepositCard[] | null => state?.deposits ?? null
);

export const selectIsLoading = createSelector(
    selectHomeFeature,
    (state): boolean => state?.isLoading ?? false
);

export const selectIsSubmiting = createSelector(
    selectHomeFeature,
    (state): boolean | null => state?.isSubmiting ?? null
);
