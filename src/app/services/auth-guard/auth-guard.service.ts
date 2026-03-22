import { inject, Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, take, skip, filter, switchMap } from 'rxjs/operators';
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
            take(1),
            switchMap((currentUser) => {
                if (currentUser) {
                    return of(true);
                }
                // Пользователя нет — диспатчим получение
                this.store.dispatch(getCurrentUser());
                // Ждём загрузки пользователя
                return this.store.select(selectCurrentUser).pipe(
                    skip(1),
                    filter(user => user !== null),
                    take(1),
                    map(() => true),
                    catchError(() => of(this.router.createUrlTree(['/auth'])))
                );
            })
        );
    }

    private getCurrentUrl(): string {
        const defaultView = this.document.defaultView;
        // Проверяем, что мы в браузере
        if (defaultView) {
            // Сохраняем URL, если он не является страницей аутентификации
            const currentUrl = defaultView.location.pathname + defaultView.location.search;
            if (currentUrl && currentUrl !== '/auth') {
                this.localStorageService.set('redirectUrl', currentUrl);
            }
            return currentUrl;
        }
        // На сервере можно вернуть пустую строку или использовать `state.url` из Router
        return '';
    }


}

export const authGuard: CanActivateFn = (route, state) => {
    return inject(AuthGuardService).checkAuthentication();
};