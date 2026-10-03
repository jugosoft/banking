import { Routes } from '@angular/router';

export const investRoutes: Routes = [
    {
        path: 'create',
        loadComponent: () => import('./invest-create/invest-create.component').then(m => m.InvestCreateComponent),
        data: { title: 'Создание инвестиции' },
    },
    {
        path: 'edit/:investId',
        loadComponent: () => import('./invest-create/invest-create.component').then(m => m.InvestCreateComponent),
        data: { title: 'Изменение инвестиции' },
    },
    {
        path: '',
        loadComponent: () => import('./invest-list/invest-list.component').then(m => m.InvestListComponent),
        data: { title: 'Инвестиции' },
    },
];
