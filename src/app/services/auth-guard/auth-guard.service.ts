import { inject, Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, tap, first, filter, timeout } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { getCurrentUser } from '../../modules/auth/store/auth.actions';
import { LocalStorageService } from '../local-storage-service/local-storage-service';
import { selectCurrentUser } from '../../modules/auth/store/auth.selectors';

@Injectable({
    providedIn: 'root',
})
class AuthGuardService {
    private readonly store = inject(Store);
    private readonly router = inject(Router);

    private readonly localStorageService = inject(LocalStorageService);
    private readonly document = inject(DOCUMENT);

    public checkAuthentication(): Observable<boolean | UrlTree> {
        return this.store.select(selectCurrentUser).pipe(
            tap(currentUser => {
                if (!currentUser) {
                    this.store.dispatch(getCurrentUser());
                }
            }),
            // Ждём первого НЕ null значения, но не более 5 сек
            filter(user => user !== null),
            first(),
            timeout(5000),
            map(() => true),
            catchError((error) => {
                console.error('AuthGuard failed:', error);
                this.localStorageService.remove('jwtToken');
                const currentUrl = this.getCurrentUrl();
                if (currentUrl && currentUrl !== '/auth') {
                    this.localStorageService.set('redirectUrl', currentUrl);
                }
                return of(this.router.createUrlTree(['/auth']));
            })
        );
    }

    private getCurrentUrl(): string {
        const defaultView = this.document.defaultView
        // Проверяем, что мы в браузере
        if (defaultView) {
            return defaultView.location.pathname + defaultView.location.search;
        }
        // На сервере можно вернуть пустую строку или использовать `state.url` из Router
        return '';
    }


}

export const authGuard: CanActivateFn = (route, state) => {
    return inject(AuthGuardService).checkAuthentication();
};