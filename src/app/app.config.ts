import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store'; // ✅ из '@ngrx/store'
import { provideEffects } from '@ngrx/effects';
import { appRoutes } from './app.routes copy';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { authReducer } from './modules/auth/store/auth.reducer';
import { AuthService } from './modules/auth/services/auth.service';
import { AuthEffects } from './modules/auth/store/auth.effects';
import { HomeEffects } from './modules/home/store/home.effects';
import { homeReducer } from './modules/home/store/home.reducer';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { profileReducer } from './modules/profile/store/profile.reducer';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(appRoutes),
        provideZonelessChangeDetection(),
        provideClientHydration(withEventReplay()),

        provideStore({
            auth: authReducer,
            home: homeReducer,
            profile: profileReducer,
        }),

        provideEffects(AuthEffects, HomeEffects),

        provideHttpClient(withInterceptorsFromDi()),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },

        AuthService,

        { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
        provideNativeDateAdapter(),
    ]
};