import { Routes } from '@angular/router';

export const appRoutes: Routes = [{
    path: 'auth', 
    loadChildren: () => import('./modules/auth/auth-routing.module').then(module => module.AuthRoutingModule)
}];
