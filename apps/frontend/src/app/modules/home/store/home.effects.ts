import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getDepositList, getDepositListError } from './home.actions';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  // private readonly register$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(getDepositList),
  //     switchMap(({ request }) => {
  //       return this.authService.register$(request).pipe(
  //         map((result) => registerSuccess({ result })),
  //         tap(({ result }) => {
  //           this.localStorageService.save('jwtToken', result.token);
  //         }),
  //         catchError((error: HttpErrorResponse) => {
  //           this.toastService.error(error.message);
  //           return of(registerError({ error }));
  //         })
  //       );
  //     })
  //   );
  // });

  // private readonly login$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(getDepositListError),
  //     switchMap(({ request }) => {
  //       return this.authService.login$(request).pipe(
  //         map((result) => loginSuccess({ result })),
  //         tap(({ result }) => {
  //           this.localStorageService.save('jwtToken', result.token);
  //         }),
  //         catchError((error: HttpErrorResponse) => {
  //           this.toastService.error(error.message);
  //           return of(loginError({ error }));
  //         })
  //       );
  //     })
  //   );
  // });
}
