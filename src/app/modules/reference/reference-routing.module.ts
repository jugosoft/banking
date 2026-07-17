import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferenceComponent } from './reference.component';

const routes: Routes = [
  {
    path: '',
    component: ReferenceComponent,
    data: { title: 'Настройки' }
  },
  {
    path: 'deposit-types',
    loadChildren: () =>
      import('./pages/deposit-types/edit-deposit-types/edit-deposit-types.module').then(
        (module) => module.EditDepositTypesModule
      ),
  },
  {
    path: 'deposit-groups',
    loadChildren: () =>
      import('./pages/deposit-groups/edit-deposit-groups/edit-deposit-groups.module').then(
        (module) => module.EditDepositGroupsModule
      ),
  },
  {
    path: 'banks',
    loadChildren: () =>
      import('./pages/banks/edit-banks/edit-banks.module').then(
        (module) => module.EditBanksModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferenceRoutingModule { }
