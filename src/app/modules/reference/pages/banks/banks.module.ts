import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EditBanksComponent } from './edit-banks/edit-banks.component';
import { CreateBankComponent } from './create-bank/create-bank.component';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { BanksRoutingModule } from './banks-routing.module';

@NgModule({
    declarations: [
        EditBanksComponent,
        CreateBankComponent,
    ],
    imports: [
        MaterialModule,
        BanksRoutingModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    exports: [
        EditBanksComponent,
        CreateBankComponent
    ],
    providers: [],
})
export class BanksModule { }
