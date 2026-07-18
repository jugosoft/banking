import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent,
        data: { title: 'Регистрация' },
    },
    {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Вход' },
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
