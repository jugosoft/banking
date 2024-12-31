import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, repeat, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { register, registerSuccess, registerError } from './auth.actions';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly authService = inject(AuthService);

  private readonly register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(register),
      switchMap(({ request }) => {
        return this.authService.register(request);
      }),
      map((result) => registerSuccess({ result })),
      catchError((error: HttpErrorResponse) => of(registerError({ error })))
    );
  });
}
