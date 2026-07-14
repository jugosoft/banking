import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const appRoutes: Routes = [
    {
        path: 'auth',
        loadChildren: () =>
            import('./modules/auth/auth.module').then(
                (module) => module.AuthModule
            ),
    },
    {
        path: '',
        canActivate: [authGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'home' },
            {
                path: 'home',
                data: { title: 'Вклады' },
                loadChildren: () =>
                    import('./modules/home/home.module').then(
                        (module) => module.HomeModule
                    ),
            },
            {
                path: 'deposit',
                data: { title: 'Вклады' },
                loadChildren: () =>
                    import('./modules/deposit/deposit.module').then(
                        (module) => module.DepositModule
                    ),
            },
            {
                path: 'profile',
                data: { title: 'Профиль' },
                loadChildren: () =>
                    import('./modules/profile/profile.module').then(
                        (module) => module.ProfileModule
                    ),
            },
        ],
    },
    {
        path: '**',
        redirectTo: 'auth',
    },
];
