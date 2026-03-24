import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, take, switchMap, map, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { getCurrentUser } from '../../modules/auth/store/auth.actions';
import { selectCurrentUser } from '../../modules/auth/store/auth.selectors';

@Injectable({ providedIn: 'root' })
class AuthGuardService {
    private readonly store = inject(Store);
    private readonly router = inject(Router);

    public checkAuthentication(): Observable<boolean | UrlTree> {
        // Проверяем, что мы в браузере (не SSR)
        if (typeof window === 'undefined') {
            return of(true); // На сервере разрешаем доступ, рендерим как есть
        }

        // Получаем текущего пользователя из стора
        return this.store.select(selectCurrentUser).pipe(
            take(1), // Берём только первое значение
            switchMap((user) => {
                if (user) {
                    // Пользователь уже авторизован — разрешаем доступ
                    return [true];
                }

                // Пользователь не авторизован — запрашиваем данные
                this.store.dispatch(getCurrentUser());

                // Подписываемся на обновление пользователя
                return this.store.select(selectCurrentUser).pipe(
                    filter((u): u is NonNullable<typeof u> => u !== null), // Ждём, пока user станет не null
                    take(1), // Берём только первое подходящее значение
                    map((updatedUser) => {
                        if (updatedUser) {
                            // Успешная авторизация — разрешаем доступ
                            return true;
                        } else {
                            // Авторизация не удалась — на /auth
                            return this.router.createUrlTree(['/auth']);
                        }
                    }),
                    catchError(() => {
                        // Ошибка при запросе (например, 401) — на /auth
                        return [this.router.createUrlTree(['/auth'])];
                    })
                );
            })
        );
    }
}

export const authGuard: CanActivateFn = (route, state) => {
    return inject(AuthGuardService).checkAuthentication();
};