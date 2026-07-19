import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditDepositGroupsComponent } from './edit-deposit-groups/edit-deposit-groups.component';
import { CreateDepositGroupComponent } from './create-deposit-group/create-deposit-group.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateDepositGroupComponent,
    data: { title: 'Группы сбережений' },
  },
  {
    path: 'edit/:depositGroupId',
    component: CreateDepositGroupComponent,
    data: { title: 'Группы сбережений' },
  },
  {
    path: '',
    component: EditDepositGroupsComponent,
    data: { title: 'Группы сбережений' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositGroupsRoutingModule { }
