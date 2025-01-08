import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UntilDestroy } from '@ngneat/until-destroy';
import { IDeposit } from '@banking/shared-types';

/**
 * Компонент домашней страницы
 */
@UntilDestroy()
@Component({
  selector: 'banking-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly store = inject(Store);
  public deposits: IDeposit[] = [
    {
      period: {
        start: new Date(2024, 11, 20),
        end: new Date(2025, 0, 16),
      },
      type: {
        type: 'deposit',
        name: 'Вклад',
      },
      bank: {
        id: 0,
        name: 'Альфа-банк',
        shortName: 'Альфа',
      },
      capitalization: false,
      comment: 'Здесь комментарий для себя, оставленный при создании карточки',
      displayPercent: 0.24,
      percentPeriods: [
        {
          duration: 365,
          percent: 0.24,
        },
      ],
      replenishable: false,
      withdrawal: false,
      startAmount: 250_000,
      currentAmount: 280_000,
    },
    {
      period: {
        start: new Date(2024, 11, 20),
        end: new Date(2025, 11, 20),
      },
      type: {
        type: 'deposit',
        name: 'Вклад',
      },
      bank: {
        id: 0,
        name: 'Т-Банк',
        shortName: 'Тинькофф',
      },
      capitalization: false,
      comment: 'Здесь смешной комментарий про переименование',
      displayPercent: 0.2,
      percentPeriods: [
        {
          duration: 365,
          percent: 0.24,
        },
      ],
      replenishable: false,
      withdrawal: false,
      startAmount: 500_000,
      currentAmount: 530_000,
    },
    {
      period: {
        start: new Date(2024, 11, 20),
        end: null,
      },
      type: {
        type: 'savings_account',
        name: 'Нак. счёт',
      },
      bank: {
        id: 0,
        name: 'Т-Банк',
        shortName: 'Тинькофф',
      },
      capitalization: true,
      comment:
        'Здесь комментарий про Сбер или банк, в общем, длинный коммент на две строки',
      displayPercent: 0.24,
      percentPeriods: [
        {
          duration: 365,
          percent: 0.24,
        },
      ],
      replenishable: false,
      withdrawal: false,
      startAmount: 500_000,
      currentAmount: 530_000,
    },
    {
      period: {
        start: new Date(2024, 11, 20),
        end: null,
      },
      type: {
        type: 'savings_account',
        name: 'Нак. счёт',
      },
      bank: {
        id: 0,
        name: 'Сбер',
        shortName: 'Сбербанк',
      },
      capitalization: true,
      comment: 'Здесь комментарий про ...',
      displayPercent: 0.24,
      percentPeriods: [
        {
          duration: 365,
          percent: 0.24,
        },
      ],
      replenishable: false,
      withdrawal: false,
      startAmount: 500_000,
      currentAmount: 530_000,
    },
  ];
}
