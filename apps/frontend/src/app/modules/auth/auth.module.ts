import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { reducer } from './store/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    SharedModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature(AuthEffects),
    ReactiveFormsModule,
    AuthRoutingModule,
    MaterialModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
