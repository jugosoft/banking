import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../modules/auth/store/auth.selectors';

export const authGuard: CanActivateFn = () => {
    const store = inject(Store);
    const router = inject(Router);

    return store.pipe(
        select(selectIsLoggedIn),
        tap((isLoggedIn: boolean) => {
            if (!isLoggedIn) {
                void router.navigate(['/auth']);
            }
        })
    );
};
