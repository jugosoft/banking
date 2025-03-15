import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getDepositList, getDepositListError, getDepositListSuccess } from './home.actions';
import { HomeService } from '../services/home.service';
import { ToastService } from '../../../services/toast/toast.service';

@Injectable()
export class HomeEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);
  private readonly homeService = inject(HomeService);

  private readonly getDepositList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getDepositList),
      switchMap(() => {
        return this.homeService.getDepositList$().pipe(
          map((result) => getDepositListSuccess({ result })),
          catchError((error: HttpErrorResponse) => {
            this.toastService.error(error.message);
            return of(getDepositListError({ error }));
          }))
      }))
  })
}
