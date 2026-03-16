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
            beginDate: new Date(2024, 11, 20),
            endDate: new Date(2025, 0, 16),
            type: {
                id: 0,
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
            percent: 0.24,
            replenishable: false,
            withdrawal: false,
            startAmount: 250000,
            createdAt: undefined,
            updatedAt: undefined,
        },
        {
            id: 1,
            archived: false,
            beginDate: new Date(2024, 11, 20),
            endDate: new Date(2025, 11, 20),

            type: {
                id: 1,
                type: 'deposit',
                name: 'Вклад',
            },
            bank: {
                id: 1,
                name: 'Т-Банк',
                shortName: 'Тинькофф',
            },
            capitalization: false,
            comment: 'Здесь смешной комментарий про переименование',
            percent: 0.24,
            replenishable: false,
            withdrawal: false,
            startAmount: 500000,
            createdAt: undefined,
            updatedAt: undefined,
        },
        {
            id: 2,
            archived: false,
            beginDate: new Date(2024, 11, 20),
            endDate: null,

            type: {
                id: 2,
                type: 'savings_account',
                name: 'Нак. счёт',
            },
            bank: {
                id: 2,
                name: 'Т-Банк',
                shortName: 'Тинькофф',
            },
            capitalization: true,
            comment:
                'Здесь комментарий про Сбер или банк, в общем, длинный коммент на две строки',
            percent: 0.24,
            replenishable: false,
            withdrawal: false,
            startAmount: 500000,
            createdAt: undefined,
            updatedAt: undefined,
        },
        {
            id: 3,
            archived: false,
            beginDate: new Date(2024, 11, 20),
            endDate: null,
            type: {
                id: 3,
                type: 'savings_account',
                name: 'Нак. счёт',
            },
            bank: {
                id: 3,
                name: 'Сбер',
                shortName: 'Сбербанк',
            },
            capitalization: true,
            comment: 'Здесь комментарий про ...',
            percent: 0.24,
            replenishable: false,
            withdrawal: false,
            startAmount: 500000,
            createdAt: undefined,
            updatedAt: undefined,
        },
    ],
});

export const mockDepositResponse = (id: number): IGetDepositResponse => ({
    deposit: {
        id,
        archived: false,
        beginDate: new Date(2024, 11, 20),
        endDate: new Date(2025, 0, 16),
        type: {
            id: 0,
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
        percent: 0.24,
        replenishable: false,
        withdrawal: false,
        startAmount: 250000,
        createdAt: undefined,
        updatedAt: undefined,
    },
});
