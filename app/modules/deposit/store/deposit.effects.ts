import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastService } from '../../../services/toast/toast.service';
import {
    getDeposit,
    getDepositError,
    getDepositSuccess,
    saveDeposit,
    saveDepositError,
    saveDepositSuccess,
} from './deposit.actions';
import { DepositService } from '../../../services/api/deposit.service';
import {
    getDepositListError,
    getDepositListSuccess,
} from '../../home/store/home.actions';

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
                return this.homeService.getDepositList$().pipe(
                    map((result) => getDepositListSuccess({ result })),
                    catchError((error: HttpErrorResponse) => {
                        this.toastService.error(error.message);
                        return of(getDepositListError({ error }));
                    })
                );
            })
        );
    });

    private readonly saveDeposit$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(saveDeposit),
            switchMap(({ deposit }) => {
                return this.homeService.saveDeposit$(deposit).pipe(
                    map((result) => saveDepositSuccess({ result })),
                    tap(() => this.router.navigate(['/home'])),
                    catchError((error: HttpErrorResponse) => {
                        this.toastService.error(error.message);
                        return of(saveDepositError({ error }));
                    })
                );
            })
        );
    });
}
