import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: '',
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./modules/home/home.module').then((module) => module.HomeModule),
      },
      {
        path: 'deposit',
        loadChildren: () =>
          import('./modules/deposit/deposit.module').then(
            (module) => module.DepositModule
          ),
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
