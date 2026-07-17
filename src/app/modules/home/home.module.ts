import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { DepositCardComponent } from '../shared/deposit-card/deposit-card.component';
import { DepositBanner } from 'src/app/deposit-banner/deposit-banner';
import { EmptyState } from './empty-state/empty-state';
import { CardLayoutComponent } from "../shared/layouts/card-layout/card-layout.component";

@NgModule({
    declarations: [HomeComponent, DepositBanner, EmptyState],
    imports: [
        SharedModule,
        HomeRoutingModule,
        MaterialModule,
        DepositCardComponent,
        CardLayoutComponent
    ],
    exports: [DepositBanner],
})
export class HomeModule { }
