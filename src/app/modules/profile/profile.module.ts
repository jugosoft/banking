import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { SecurityComponent } from './components/security/security.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NotSpecifiedPipe } from '../../pipes/not-specified.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CardLayoutComponent } from "src/app/modules/shared/card-layout/card-layout.component";

@NgModule({
    declarations: [
        ProfileComponent,
        PersonalInfoComponent,
        ContactInfoComponent,
        SecurityComponent,
        NotSpecifiedPipe
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        SharedModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        CardLayoutComponent
    ],
    exports: [
        ProfileComponent
    ],
    providers: [],
})
export class ProfileModule { }
