import { inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, filter, first, timeout } from 'rxjs/operators';
import { IUserInfo } from '@api/user';
import { selectCurrentUser } from 'src/app/modules/auth/store/auth.selectors';
import { getCurrentUser } from 'src/app/modules/auth/store/auth.actions';

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<boolean> => {
    const router = inject(Router);
    const store = inject(Store);
    const platformId = inject(PLATFORM_ID);

    // Не запускаем guard на сервере (SSR)
    if (!isPlatformBrowser(platformId)) {
        return of(true);
    }

    const redirectUrl = state.url;

    return store.select(selectCurrentUser).pipe(
        first(),
        switchMap(user => {
            if (user !== null) {
                return of(true);
            }


            store.dispatch(getCurrentUser());
            return store.select(selectCurrentUser).pipe(
                filter((currentUser): currentUser is IUserInfo => currentUser !== null),
                first(),
                timeout(5000),
                map(currentUser => {
                    if (currentUser) {
                        return true;
                    }

                    // currentUser === null - не авторизован
                    router.navigate(['/auth'], { queryParams: { returnUrl: redirectUrl } });
                    return false;
                }),
                catchError(() => {
                    router.navigate(['/auth'], { queryParams: { returnUrl: redirectUrl } });
                    return of(false);
                })
            );
        })
    );
};