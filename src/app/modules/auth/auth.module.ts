import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { AuthService } from './services/auth.service';
import { BankingUiModule } from '../banking-ui/banking-ui.module';
import { ValidationErrorsComponent } from '../shared/validation-errors/validation-errors.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [RegisterComponent, LoginComponent],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        MaterialModule,
        BankingUiModule,
        ValidationErrorsComponent,
    ],
    providers: [AuthService],
})
export class AuthModule { }
