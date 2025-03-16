import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../modules/auth/store/auth.selectors';
import { LocalStorageService } from '../services/local-storage-service/local-storage-service';

export const authGuard: CanActivateFn = () => {
    const store = inject(Store);
    const router = inject(Router);
    const localStorageService = inject(LocalStorageService);

    if (!localStorageService.get('jwtToken')) {
        void router.navigate(['/auth']);
    }

    return store.pipe(
        select(selectIsLoggedIn),
        tap((isLoggedIn: boolean) => {
            if (!isLoggedIn) {
                void router.navigate(['/auth']);
            }
        })
    );
};