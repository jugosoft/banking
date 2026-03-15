import {
  IDeposit,
  IGetDepositListResponse,
  IGetDepositResponse,
  IResponseErrors,
} from '@banking/shared-types';

export const mockDepositListResponse = (): IGetDepositListResponse => ({
  deposits: [
    {
      id: 0,
      archived: false,
      period: {
        start: new Date(2024, 11, 20).toISOString(),
        end: new Date(2025, 0, 16).toISOString(),
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
      comment:
        'Здесь комментарий для себя, оставленный при создании карточки',
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
      id: 1,
      archived: false,
      period: {
        start: new Date(2024, 11, 20).toISOString(),
        end: new Date(2025, 11, 20).toISOString(),
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
      id: 2,
      archived: false,
      period: {
        start: new Date(2024, 11, 20).toISOString(),
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
      id: 3,
      archived: false,
      period: {
        start: new Date(2024, 11, 20).toISOString(),
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
  ],
});

export const mockDepositResponse = (id: number): IGetDepositResponse => ({
  deposit: {
    id,
    archived: false,
    period: {
      start: new Date(2024, 11, 20).toISOString(),
      end: new Date(2025, 0, 16).toISOString(),
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
    comment:
      'Здесь комментарий для себя, оставленный при создании карточки',
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
});