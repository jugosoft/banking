import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDepositTypeComponent } from './create-deposit-type/create-deposit-type.component';
import { EditDepositTypesComponent } from './edit-deposit-types/edit-deposit-types.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateDepositTypeComponent,
    data: { title: 'Создать тип сбережений' },
  },
  {
    path: 'edit/:depositTypeId',
    component: CreateDepositTypeComponent,
    data: { title: 'Изменить тип сбережений' },
  },
  {
    path: '',
    component: EditDepositTypesComponent,
    data: { title: 'Типы сбережений' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositTypesRoutingModule { }
