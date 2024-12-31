import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/auth.reducer';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    SharedModule,
    StoreModule.forFeature('auth', reducer),
    ReactiveFormsModule,
    AuthRoutingModule,
    MaterialModule,
  ],
})
export class AuthModule {}
