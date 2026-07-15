import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { DepositCardComponent } from '../shared/deposit-card/deposit-card.component';
import { DepositComponent } from './deposit.component';
import { DepositRoutingModule } from './deposit-routing.module';
import { DepositCreateComponent } from './deposit-create/deposit-create.component';
import { DepositListComponent } from './deposit-list/deposit-list.component';

@NgModule({
    declarations: [DepositComponent, DepositCreateComponent, DepositListComponent],
    imports: [
        SharedModule,
        DepositRoutingModule,
        MaterialModule,
        DepositCardComponent,
    ],
})
export class DepositModule { }
