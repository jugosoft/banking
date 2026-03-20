import { inject, Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, take, map, catchError } from 'rxjs/operators';
import { AuthService } from '../../modules/auth/services/auth.service';
import { LocalStorageService } from '../local-storage-service/local-storage-service';
import { selectIsLoggedIn } from '../../modules/auth/store/auth.selectors';

@Injectable({
    providedIn: 'root',
})
class AuthGuardService {
    private readonly store = inject(Store);
    private readonly router = inject(Router);
    private readonly authService = inject(AuthService);
    private readonly localStorageService = inject(LocalStorageService);
    private readonly document = inject(DOCUMENT);

    public checkAuthentication(): Observable<boolean | UrlTree> {
        const token = this.localStorageService.get('jwtToken');

        if (!token) {
            const currentUrl = this.getCurrentUrl();
            if (currentUrl && currentUrl !== '/auth') {
                this.localStorageService.set('redirectUrl', currentUrl);
            }

            return of(this.router.createUrlTree(['/auth']));
        }

        return this.store.select(selectIsLoggedIn).pipe(
            take(1),
            switchMap((isLoggedIn) => {
                if (isLoggedIn) {
                    return of(true);
                } else {
                    return this.authService.getCurrentUser$().pipe(
                        map((response) => {
                            if (response.data?.token) {
                                this.localStorageService.set('jwtToken', response.data.token);
                            }
                            return true;
                        }),
                        catchError(() => {
                            this.localStorageService.remove('jwtToken');

                            // ✅ Безопасный доступ к URL
                            const currentUrl = this.getCurrentUrl();
                            if (currentUrl && currentUrl !== '/auth') {
                                this.localStorageService.set('redirectUrl', currentUrl);
                            }

                            return of(this.router.createUrlTree(['/auth']));
                        })
                    );
                }
            })
        );
    }

    private getCurrentUrl(): string {
        // Проверяем, что мы в браузере
        if (this.document.defaultView) {
            return this.document.defaultView.location.pathname + this.document.defaultView.location.search;
        }
        // На сервере можно вернуть пустую строку или использовать `state.url` из Router
        return '';
    }
}

export const authGuard: CanActivateFn = (route, state) => {
    return inject(AuthGuardService).checkAuthentication();
};