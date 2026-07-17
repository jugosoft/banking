import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NotSpecifiedPipe } from '../../pipes/not-specified.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ReferenceRoutingModule } from './reference-routing.module';
import { ReferenceComponent } from './reference.component';

@NgModule({
    declarations: [
        ReferenceComponent,
    ],
    imports: [
        CommonModule,
        ReferenceRoutingModule,
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
        ReferenceComponent
    ],
    providers: [],
})
export class ReferenceModule { }
