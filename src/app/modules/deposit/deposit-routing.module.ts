import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositComponent } from './deposit.component';
import { DepositCreateComponent } from './deposit-create/deposit-create.component';
import { DepositListComponent } from './deposit-list/deposit-list.component';

const routes: Routes = [
    {
        path: 'list',
        component: DepositListComponent,
    },
    {
        path: 'create',
        component: DepositCreateComponent,
    },
    {
        path: 'edit/:depositId',
        component: DepositCreateComponent,
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DepositRoutingModule { }
