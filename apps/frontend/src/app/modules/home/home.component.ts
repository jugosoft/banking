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
      daysBeforeClose: 15,
      displayPercent: 240,
      percentPeriods: [
        {
          duration: 365,
          percent: 24,
        },
      ],
      replenishable: false,
      withdrawal: false,
      startAmount: 250_000,
    },
    {
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
      daysBeforeClose: 4,
      displayPercent: 240,
      percentPeriods: [
        {
          duration: 365,
          percent: 24,
        },
      ],
      replenishable: false,
      withdrawal: false,
      startAmount: 500_000,
    },
    {
      type: {
        type: 'savings_account',
        name: 'Накопит. счёт',
      },
      bank: {
        id: 0,
        name: 'Т-Банк',
        shortName: 'Тинькофф',
      },
      capitalization: true,
      comment:
        'Здесь комментарий про Сбер или банк, в общем, длинный коммент на две строки',
      daysBeforeClose: 40,
      displayPercent: 240,
      percentPeriods: [
        {
          duration: 365,
          percent: 24,
        },
      ],
      replenishable: false,
      withdrawal: false,
      startAmount: 500_000,
    },
    {
      type: {
        type: 'savings_account',
        name: 'Накопит. счёт',
      },
      bank: {
        id: 0,
        name: 'Сбер',
        shortName: 'Сбербанк',
      },
      capitalization: true,
      comment: 'Здесь комментарий про ...',
      daysBeforeClose: 40,
      displayPercent: 24,
      percentPeriods: [
        {
          duration: 365,
          percent: 24,
        },
      ],
      replenishable: false,
      withdrawal: false,
      startAmount: 500_000,
    },
  ];
}
