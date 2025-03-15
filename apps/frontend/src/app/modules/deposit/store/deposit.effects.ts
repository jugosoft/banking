import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastService } from '../../../services/toast/toast.service';
import { getDeposit, getDepositError, getDepositSuccess } from './deposit.actions';
import { DepositService } from '../../../services/api/deposit.service';

@Injectable()
export class DepositEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);
  private readonly homeService = inject(DepositService);

  private readonly getDepositList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getDeposit),
      switchMap(() => {
        return this.homeService.getDeposit$().pipe(
          map((result) => getDepositSuccess({ result })),
          catchError((error: HttpErrorResponse) => {
            this.toastService.error(error.message);
            return of(getDepositError({ error }));
          }))
      }))
  })
}
