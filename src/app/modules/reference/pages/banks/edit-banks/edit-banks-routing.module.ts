import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditBanksComponent } from './edit-banks.component';

const routes: Routes = [
  {
    path: '',
    component: EditBanksComponent,
    data: { title: 'Банки' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditBanksRoutingModule { }
