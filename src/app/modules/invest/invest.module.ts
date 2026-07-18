import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { InvestRoutingModule } from './invest-routing.module';
import { BankingUiModule } from '../banking-ui/banking-ui.module';
import { CreateButtonComponent } from "../banking-ui/create-button/create-button.component";
import { InvestCardComponent } from '../shared/invest-card/invest-card.component';
import { InvestListComponent } from './invest-list/invest-list.component';
import { InvestCreateComponent } from './invest-create/invest-create.component';
import { EmptyState } from "../home/empty-state/empty-state";

@NgModule({
    declarations: [InvestCreateComponent, InvestListComponent],
    imports: [
        SharedModule,
        InvestRoutingModule,
        MaterialModule,
        InvestCardComponent,
        BankingUiModule,
        CreateButtonComponent,
        EmptyState
    ],
})
export class InvestModule { }
