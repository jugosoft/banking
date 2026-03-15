import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BankingUiModule } from '../banking-ui/banking-ui.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './store/profile.reducer';
import { ProfileEffects } from './store/profile.effects';
import { NotSpecifiedPipe } from '../../../pipes/not-specified.pipe';

@NgModule({
  declarations: [
    ProfileComponent,
    NotSpecifiedPipe
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    BankingUiModule,
    StoreModule.forFeature('profile', reducer),
    EffectsModule.forFeature([ProfileEffects])
  ],
  providers: []
})
export class ProfileModule { }
