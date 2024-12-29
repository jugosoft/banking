import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EFFECTS, REDUCERS } from './store/store.const';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideRouter(appRoutes),
    importProvidersFrom(RouterModule.forRoot(appRoutes)),
    importProvidersFrom(StoreModule.forRoot(REDUCERS)),
    importProvidersFrom(EffectsModule.forRoot(EFFECTS)),
    importProvidersFrom(
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: !isDevMode(),
      })
    ),
  ],
};
