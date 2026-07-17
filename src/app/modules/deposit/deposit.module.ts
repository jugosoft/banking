import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { DepositCardComponent } from '../shared/deposit-card/deposit-card.component';
import { DepositComponent } from './deposit.component';
import { DepositRoutingModule } from './deposit-routing.module';
import { DepositCreateComponent } from './deposit-create/deposit-create.component';
import { DepositListComponent } from './deposit-list/deposit-list.component';
import { BankingUiModule } from '../banking-ui/banking-ui.module';
import { EmptyState } from "../home/empty-state/empty-state";
import { CreateButtonComponent } from "../banking-ui/create-button/create-button.component";

@NgModule({
    declarations: [DepositComponent, DepositCreateComponent, DepositListComponent],
    imports: [
    SharedModule,
    DepositRoutingModule,
    MaterialModule,
    DepositCardComponent,
    BankingUiModule,
    EmptyState,
    CreateButtonComponent
],
})
export class DepositModule { }
