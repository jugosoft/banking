import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestCreateComponent } from './invest-create/invest-create.component';
import { InvestListComponent } from './invest-list/invest-list.component';

const routes: Routes = [
    {
        path: 'create',
        component: InvestCreateComponent,
    },
    {
        path: 'edit/:investId',
        component: InvestCreateComponent,
    },
    {
        path: '',
        pathMatch: 'full',
        component: InvestListComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InvestRoutingModule { }
