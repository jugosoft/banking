import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { DepositCardComponent } from '../shared/deposit-card/deposit-card.component';
import { BankingUiModule } from '../banking-ui/banking-ui.module';
import { DepositComponent } from './deposit.component';
import { DepositRoutingModule } from './deposit-routing.module';
import { DepositCreateComponent } from './deposit-create/deposit-create.component';

@NgModule({
  declarations: [DepositComponent, DepositCreateComponent],
  imports: [
    SharedModule,
    DepositRoutingModule,
    MaterialModule,
    DepositCardComponent,
    BankingUiModule,
  ],
})
export class DepositModule { }
