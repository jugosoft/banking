import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { register, registerSuccess, registerError } from './auth.actions';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../../../services/toast/toast.service';
import { LocalStorageService } from '../../../services/local-storage-service/local-storage-service';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);
  private readonly localStorageService = inject(LocalStorageService);

  private readonly register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(register),
      switchMap(({ request }) => {
        return this.authService.register(request).pipe(
          map((result) => registerSuccess({ result })),
          tap(({ result }) => {
            this.toastService.error(
              'Успешная регистрация. Счастилвого пользвоания!'
            );
            this.localStorageService.save('jwtToken', result.token);
          }),
          catchError((error: HttpErrorResponse) => {
            this.toastService.error(error.message);
            return of(registerError({ error }));
          })
        );
      })
    );
  });

  private readonly registerSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(registerSuccess),
        tap(() => void this.router.navigate(['/home']))
      );
    },
    {
      dispatch: false,
    }
  );
}
