import { Routes } from '@angular/router';

export const depositRoutes: Routes = [
    {
        path: 'create',
        loadComponent: () => import('./deposit-create/deposit-create.component').then(m => m.DepositCreateComponent),
        data: { title: 'Создание вклада' },
    },
    {
        path: 'edit/:depositId',
        loadComponent: () => import('./deposit-create/deposit-create.component').then(m => m.DepositCreateComponent),
        data: { title: 'Изменение вклада' },
    },
    {
        path: '',
        loadComponent: () => import('./deposit-list/deposit-list.component').then(m => m.DepositListComponent),
        data: { title: 'Вклады' },
    },
];
