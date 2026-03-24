import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast/toast.service';
import * as ProfileActions from './profile.actions';
import { loadCurrentUserSuccess, loadCurrentUserFailure } from './profile.actions';
import { ProfileService } from '../services/profile.service';

@Injectable()
export class ProfileEffects {
    private readonly actions$ = inject(Actions);
    private readonly store = inject(Store);
    private readonly router = inject(Router);
    private readonly toastService = inject(ToastService);
    private readonly profileService = inject(ProfileService);

    private readonly updateName$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProfileActions.updateName),
            switchMap((action) =>
                this.profileService.updateName$(action).pipe(
                    map(() => ProfileActions.updateNameSuccess()),
                    catchError((error) =>
                        of(ProfileActions.updateNameFailure({ error }))
                    )
                )
            )
        )
    );

    private readonly updateNameSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ProfileActions.updateNameSuccess),
                tap(() => {
                    this.toastService.success('Имя усяпяпешно обновлено');
                })
            ),
        { dispatch: false }
    );

    private readonly updateNameFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ProfileActions.updateNameFailure),
                tap(({ error }) => {
                    this.toastService.error(
                        error.message || 'Ошибка при обновлении имени'
                    );
                })
            ),
        { dispatch: false }
    );

    private readonly updateEmail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProfileActions.updateEmail),
            switchMap((action) =>
                this.profileService.updateEmail$(action).pipe(
                    map(() => ProfileActions.updateEmailSuccess()),
                    catchError((error) =>
                        of(ProfileActions.updateEmailFailure({ error }))
                    )
                )
            )
        )
    );

    private readonly updateEmailSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ProfileActions.updateEmailSuccess),
                tap(() => {
                    this.toastService.success('Email успешно обновлен');
                })
            ),
        { dispatch: false }
    );

    private readonly updateEmailFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ProfileActions.updateEmailFailure),
                tap(({ error }) => {
                    this.toastService.error(
                        error.message || 'Ошибка при обновлении email'
                    );
                })
            ),
        { dispatch: false }
    );

    private readonly updateUsername$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProfileActions.updateUsername),
            switchMap((action) =>
                this.profileService.updateUsername$(action).pipe(
                    map(() => ProfileActions.updateUsernameSuccess()),
                    catchError((error) =>
                        of(ProfileActions.updateUsernameFailure({ error }))
                    )
                )
            )
        )
    );

    private readonly updateUsernameSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ProfileActions.updateUsernameSuccess),
                tap(() => {
                    this.toastService.success('Логин успешно обновлен');
                })
            ),
        { dispatch: false }
    );

    private readonly updateUsernameFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ProfileActions.updateUsernameFailure),
                tap(({ error }) => {
                    this.toastService.error(
                        error.message || 'Ошибка при обновлении логина'
                    );
                })
            ),
        { dispatch: false }
    );

    private readonly updatePassword$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProfileActions.updatePassword),
            switchMap((action) =>
                this.profileService.updatePassword$(action).pipe(
                    map(() => ProfileActions.updatePasswordSuccess()),
                    catchError((error) =>
                        of(ProfileActions.updatePasswordFailure({ error }))
                    )
                )
            )
        )
    );

    private readonly updatePasswordSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ProfileActions.updatePasswordSuccess),
                tap(() => {
                    this.toastService.success('Пароль успешно изменен');
                })
            ),
        { dispatch: false }
    );

    private readonly loadCurrentUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProfileActions.loadCurrentUser),
            switchMap(() =>
                this.profileService.getCurrentUser$().pipe(
                    map(user => loadCurrentUserSuccess({ user })),
                    catchError(error => of(loadCurrentUserFailure({ error })))
                )
            )
        )
    );
}
