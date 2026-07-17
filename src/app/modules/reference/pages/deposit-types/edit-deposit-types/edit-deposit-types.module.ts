import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { EditDepositTypesComponent } from './edit-deposit-types.component';
import { EditDepositTypesRoutingModule } from './edit-deposit-types-routing.module';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
    declarations: [
        EditDepositTypesComponent
    ],
    imports: [
        CommonModule,
        EditDepositTypesRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        SharedModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
    ],
    exports: [
        EditDepositTypesComponent
    ],
    providers: [],
})
export class EditDepositTypesModule { }
