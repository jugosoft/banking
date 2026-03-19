import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, take, map, catchError } from 'rxjs/operators';
import { AuthService } from '../../modules/auth/services/auth.service';
import { LocalStorageService } from '../local-storage-service/local-storage-service';
import { IAuthState } from '../../modules/auth/store/auth.state';
import { getCurrentUser } from '../../modules/auth/store/auth.actions';
import { selectIsLoggedIn } from '../../modules/auth/store/auth.selectors';

@Injectable({
    providedIn: 'root',
})
class AuthGuardService {
    private readonly store = inject(Store);
    private readonly router = inject(Router);
    private readonly authService = inject(AuthService);
    private readonly localStorageService = inject(LocalStorageService);

    public checkAuthentication(): Observable<boolean | UrlTree> {
        const token = this.localStorageService.get('jwtToken');

        if (!token) {
            // Сохраняем URL для редиректа после входа
            const currentUrl =
                window.location.pathname + window.location.search;
            if (currentUrl && currentUrl !== '/auth') {
                this.localStorageService.save('redirectUrl', currentUrl);
            }

            return of(this.router.createUrlTree(['/auth']));
        }

        // Проверяем, авторизован ли пользователь
        return this.store.select(selectIsLoggedIn).pipe(
            take(1),
            switchMap((isLoggedIn) => {
                if (isLoggedIn) {
                    return of(true);
                } else {
                    // Получаем текущего пользователя
                    return this.authService.getCurrentUser$().pipe(
                        map((response) => {
                            // Сохраняем токен и данные пользователя
                            this.localStorageService.save(
                                'jwtToken',
                                response.token
                            );
                            // Диспатчим успешное получение пользователя
                            // (редьюсер должен обновить состояние)
                            return true;
                        }),
                        catchError(() => {
                            // Ошибка при получении пользователя - очищаем токен
                            this.localStorageService.remove('jwtToken');

                            // Сохраняем URL для редиректа после входа
                            const currentUrl =
                                window.location.pathname +
                                window.location.search;
                            if (currentUrl && currentUrl !== '/auth') {
                                this.localStorageService.save(
                                    'redirectUrl',
                                    currentUrl
                                );
                            }

                            return of(this.router.createUrlTree(['/auth']));
                        })
                    );
                }
            })
        );
    }
}

export const authGuard: CanActivateFn = (route, state) => {
    return inject(AuthGuardService).checkAuthentication();
};
