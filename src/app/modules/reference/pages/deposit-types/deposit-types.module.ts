import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { EditDepositTypesComponent } from './edit-deposit-types/edit-deposit-types.component';
import { CreateDepositTypeComponent } from './create-deposit-type/create-deposit-type.component';
import { DepositTypesRoutingModule } from './deposit-types-routing.module';

@NgModule({
  declarations: [
    EditDepositTypesComponent,
    CreateDepositTypeComponent
  ],
  imports: [
    MaterialModule,
    DepositTypesRoutingModule,
    SharedModule,
  ],
  providers: [],
})
export class DepositTypesModule { }
