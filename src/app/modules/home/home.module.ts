import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { DepositCardComponent } from '../shared/deposit-card/deposit-card.component';
import { DepositBanner } from 'src/app/deposit-banner/deposit-banner';
import { CardLayoutComponent } from "../shared/layouts/card-layout/card-layout.component";
import { BankingUiModule } from '../banking-ui/banking-ui.module';

@NgModule({
    declarations: [HomeComponent, DepositBanner],
    imports: [
        SharedModule,
        HomeRoutingModule,
        MaterialModule,
        DepositCardComponent,
        CardLayoutComponent,
        BankingUiModule,
    ],
    exports: [DepositBanner],
})
export class HomeModule { }
