import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferenceComponent } from './reference.component';

const routes: Routes = [
  {
    path: '',
    component: ReferenceComponent,
    data: { title: 'Настройки' },
  },
  {
    path: 'deposit-types',
    loadChildren: () =>
      import('./pages/deposit-types/deposit-types.module').then(
        (module) => module.DepositTypesModule
      ),
  },
  {
    path: 'deposit-groups',
    loadChildren: () =>
      import('./pages/deposit-groups/deposit-groups.module').then(
        (module) => module.EditDepositGroupsModule
      ),
  },
  {
    path: 'banks',
    loadChildren: () =>
      import('./pages/banks/banks.module').then(
        (module) => module.BanksModule
      ),
  },
  {
    path: 'deposit-history',
    loadComponent: () =>
      import('../deposit/deposit-history/deposit-history.component').then(
        (m) => m.DepositHistoryComponent
      ),
    data: { title: 'История вкладов' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferenceRoutingModule { }
