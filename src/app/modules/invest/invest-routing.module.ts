import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestCreateComponent } from './invest-create/invest-create.component';
import { InvestListComponent } from './invest-list/invest-list.component';

const routes: Routes = [
    {
        path: 'create',
        component: InvestCreateComponent,
        data: { title: 'Создание инвестиции' },
    },
    {
        path: 'edit/:investId',
        component: InvestCreateComponent,
        data: { title: 'Изменение инвестиции' },
    },
    {
        path: '',
        pathMatch: 'full',
        component: InvestListComponent,
        data: { title: 'Инвестиции' },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InvestRoutingModule { }
