import { Routes } from '@angular/router';
import { authGuard } from './services/auth-guard/auth-guard.service';

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
            {
                path: 'home',
                loadChildren: () =>
                    import('./modules/home/home.module').then(
                        (module) => module.HomeModule
                    ),
            },
            {
                path: 'deposit',
                loadChildren: () =>
                    import('./modules/deposit/deposit.module').then(
                        (module) => module.DepositModule
                    ),
            },
            {
                path: 'profile',
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
