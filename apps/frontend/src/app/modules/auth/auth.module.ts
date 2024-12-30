import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MaterialModule,
  ],
})
export class AuthModule {}
