import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { DepositCardComponent } from '../shared/deposit-card/deposit-card.component';
import { CardLayoutComponent } from "../shared/layouts/card-layout/card-layout.component";
import { BankingUiModule } from '../banking-ui/banking-ui.module';
import { DepositBanner } from 'src/app/components/deposit-banner/deposit-banner';
import { InvestBanner } from 'src/app/components/invest-banner/invest-banner';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        SharedModule,
        HomeRoutingModule,
        MaterialModule,
        DepositCardComponent,
        CardLayoutComponent,
        BankingUiModule,
        DepositBanner,
        InvestBanner
    ],
})
export class HomeModule { }
