import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditDepositTypesComponent } from './edit-deposit-types.component';

const routes: Routes = [
  {
    path: '',
    component: EditDepositTypesComponent,
    data: { title: 'Типы сбережений' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDepositTypesRoutingModule { }
