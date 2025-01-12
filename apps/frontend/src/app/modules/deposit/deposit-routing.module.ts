import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositComponent } from './deposit.component';
import { DepositCreateComponent } from './deposit-create/deposit-create.component';

const routes: Routes = [
  {
    path: 'create',
    component: DepositCreateComponent,
  },
  {
    path: ':id',
    component: DepositComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositRoutingModule {}
