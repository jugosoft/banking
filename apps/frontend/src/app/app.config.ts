import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { reducer } from './modules/auth/store/auth.reducer';
import { AuthEffects } from './modules/auth/store/auth.effects';
import { AuthService } from './modules/auth/services/auth.service';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideRouter(appRoutes),
    provideAnimations(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthService,
    importProvidersFrom(StoreModule.forFeature('auth', reducer)),
    importProvidersFrom(EffectsModule.forFeature(AuthEffects)),
    importProvidersFrom(HttpClientModule),
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    provideNativeDateAdapter(),
    importProvidersFrom(RouterModule.forRoot(appRoutes)),
    importProvidersFrom(StoreModule.forRoot([])),
    importProvidersFrom(EffectsModule.forRoot([])),
    importProvidersFrom(
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: !isDevMode(),
      })
    ),
  ],
};
