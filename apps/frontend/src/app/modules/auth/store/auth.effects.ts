import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {catchError, map, repeat, switchMap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

@Injectable()
export class AuthEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly store: Store
    ) {
    }

    // private readonly register$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(register),
    //         switchMap(() => {
    //             return http;
    //         }),
    //         map((result) => registerSuccess({result})),
    //         catchError((error: HttpErrorResponse) => of(registerError({error}))),
    //     );
    // });
}
