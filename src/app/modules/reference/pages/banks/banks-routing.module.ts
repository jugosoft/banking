import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBankComponent } from './create-bank/create-bank.component';
import { EditBanksComponent } from './edit-banks/edit-banks.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateBankComponent,
    data: { title: 'Создание банка' },
  },
  {
    path: 'edit/:bankId',
    component: CreateBankComponent,
    data: { title: 'Имзенение банка' },
  },
  {
    path: '',
    component: EditBanksComponent,
    data: { title: 'Банки' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BanksRoutingModule { }
