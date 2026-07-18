import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositComponent } from './deposit.component';
import { DepositCreateComponent } from './deposit-create/deposit-create.component';
import { DepositListComponent } from './deposit-list/deposit-list.component';

const routes: Routes = [
    {
        path: 'create',
        component: DepositCreateComponent,
        data: { title: 'Создание вклада' },
    },
    {
        path: 'edit/:depositId',
        component: DepositCreateComponent,
        data: { title: 'Изменение вклада' },
    },
    {
        path: '',
        pathMatch: 'full',
        component: DepositListComponent,
        data: { title: 'Вклады' },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DepositRoutingModule { }
