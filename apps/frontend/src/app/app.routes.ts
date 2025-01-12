import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((module) => module.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'deposit',
    loadChildren: () =>
      import('./modules/deposit/deposit.module').then(
        (module) => module.DepositModule
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
