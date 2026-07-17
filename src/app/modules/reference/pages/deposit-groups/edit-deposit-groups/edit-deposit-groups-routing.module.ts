import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditDepositGroupsComponent } from './edit-deposit-groups.component';

const routes: Routes = [
  {
    path: '',
    component: EditDepositGroupsComponent,
    data: { title: 'Группы сбережений' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDepositGroupsRoutingModule { }
