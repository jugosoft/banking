import { ApplicationConfig, importProvidersFrom, isDevMode, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appRoutes } from './app.routes copy';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { reducer } from './modules/auth/store/auth.reducer';
import { AuthService } from './modules/auth/services/auth.service';
import { AuthEffects } from './modules/auth/store/auth.effects';
import { HomeEffects } from './modules/home/store/home.effects';
import { homeReducer } from './modules/home/store/home.reducer';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(appRoutes),
        provideZonelessChangeDetection(),
        provideClientHydration(withEventReplay()),
        provideStore(),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        AuthService,
        importProvidersFrom(StoreModule.forFeature('auth', reducer)),
        importProvidersFrom(EffectsModule.forFeature(AuthEffects)),
        importProvidersFrom(StoreModule.forFeature('home', homeReducer)),
        importProvidersFrom(EffectsModule.forFeature(HomeEffects)),
        provideHttpClient(withInterceptorsFromDi()),
        { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
        provideNativeDateAdapter(),
        importProvidersFrom(RouterModule.forRoot(appRoutes)),
        importProvidersFrom(StoreModule.forRoot([])),
        importProvidersFrom(EffectsModule.forRoot([])),
        // importProvidersFrom(
        //     StoreDevtoolsModule.instrument({
        //         maxAge: 25,
        //         logOnly: !isDevMode(),
        //     })
        // ),
    ]
};

