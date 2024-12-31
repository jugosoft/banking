import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { register, registerSuccess, registerError } from './auth.actions';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../../../services/toast/toast.service';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);

  private readonly register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(register),
      switchMap(({ request }) => {
        return this.authService.register(request).pipe(
          map((result) => registerSuccess({ result })),
          tap(() =>
            this.toastService.error(
              'Успешная регистрация. Счастилвого пользвоания!'
            )
          ),
          catchError((error: HttpErrorResponse) => {
            this.toastService.error(error.message);
            return of(registerError({ error }));
          })
        );
      })
    );
  });
}
