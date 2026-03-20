import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BankingUiModule } from '../banking-ui/banking-ui.module';
import { NotSpecifiedPipe } from '../../pipes/not-specified.pipe';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [ProfileComponent, NotSpecifiedPipe],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        SharedModule,
        BankingUiModule,
        MatFormField,
        MatFormFieldModule,
        MatProgressSpinner,
    ],
    providers: [],
})
export class ProfileModule { }
