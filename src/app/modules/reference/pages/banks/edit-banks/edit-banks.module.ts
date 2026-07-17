import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { EditBanksComponent } from './edit-banks.component';
import { EditBanksRoutingModule } from './edit-banks-routing.module';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { NotSpecifiedPipe } from 'src/app/pipes/not-specified.pipe';

@NgModule({
    declarations: [
        EditBanksComponent,
    ],
    imports: [
        CommonModule,
        EditBanksRoutingModule,
        NotSpecifiedPipe,
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
        EditBanksComponent
    ],
    providers: [],
})
export class EditBanksModule { }
