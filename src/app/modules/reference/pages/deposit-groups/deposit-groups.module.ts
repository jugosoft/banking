import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { EditDepositGroupsComponent } from './edit-deposit-groups/edit-deposit-groups.component';
import { DepositGroupsRoutingModule } from './deposit-groups-routing.module';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { CreateDepositGroupComponent } from './create-deposit-group/create-deposit-group.component';

@NgModule({
    declarations: [
        EditDepositGroupsComponent,
        CreateDepositGroupComponent
    ],
    imports: [
        CommonModule,
        DepositGroupsRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    providers: [],
})
export class EditDepositGroupsModule { }
