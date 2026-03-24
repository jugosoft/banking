import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { IUserInfo } from '@api/user/user.interface';

export const updateName = createAction(
    '[Profile] Update Name',
    props<{ firstName: string; lastName: string; patronymic?: string }>()
);

export const updateNameSuccess = createAction('[Profile] Update Name Success');

export const loadCurrentUser = createAction('[Profile] Load Current User');
export const loadCurrentUserSuccess = createAction('[Profile] Load Current User Success', props<{ user: IUserInfo }>());
export const loadCurrentUserFailure = createAction('[Profile] Load Current User Failure', props<{ error: HttpErrorResponse }>());

export const updateNameFailure = createAction(
    '[Profile] Update Name Failure',
    props<{ error: HttpErrorResponse }>()
);

export const updateEmail = createAction(
    '[Profile] Update Email',
    props<{ email: string }>()
);

export const updateEmailSuccess = createAction(
    '[Profile] Update Email Success'
);

export const updateEmailFailure = createAction(
    '[Profile] Update Email Failure',
    props<{ error: HttpErrorResponse }>()
);

export const updateUsername = createAction(
    '[Profile] Update Username',
    props<{ username: string }>()
);

export const updateUsernameSuccess = createAction(
    '[Profile] Update Username Success'
);

export const updateUsernameFailure = createAction(
    '[Profile] Update Username Failure',
    props<{ error: HttpErrorResponse }>()
);

export const updatePassword = createAction(
    '[Profile] Update Password',
    props<{ oldPassword: string; newPassword: string }>()
);

export const updatePasswordSuccess = createAction(
    '[Profile] Update Password Success'
);

export const updatePasswordFailure = createAction(
    '[Profile] Update Password Failure',
    props<{ error: HttpErrorResponse }>()
);
