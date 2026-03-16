import { Action, createReducer, on } from '@ngrx/store';
import { IAuthState } from './auth.state';
import {
    getCurrentUser,
    getCurrentUserError,
    getCurrentUserSuccess,
    login,
    loginError,
    loginSuccess,
    register,
    registerError,
    registerSuccess,
} from './auth.actions';

export const initialState: IAuthState = {
    isSubmiting: null,
    currentUser: null,
    token: null,
    validationErrors: null,
};

const authReducer = createReducer(
    initialState,

    on(
        register,
        (state): IAuthState => ({
            ...state,
            token: null,
            currentUser: null,
            validationErrors: null,
            isSubmiting: true,
        })
    ),

    on(
        registerSuccess,
        (state, { result }): IAuthState => ({
            ...state,
            isSubmiting: false,
            token: result.token,
            currentUser: {
                ...result.user,
                createdAt: new Date(result.user.createdAt),
                updatedAt: new Date(result.user.updatedAt),
                patronymic: '',
                lastName: '',
                firstName: '',
            },
        })
    ),

    on(
        registerError,
        (state, { error }): IAuthState => ({
            ...state,
            currentUser: null,
            token: null,
            isSubmiting: false,
            validationErrors: error.error,
        })
    ),

    on(
        login,
        (state): IAuthState => ({
            ...state,
            currentUser: null,
            token: null,
            isSubmiting: true,
            validationErrors: null,
        })
    ),

    on(
        loginSuccess,
        (state, { result }): IAuthState => ({
            ...state,
            isSubmiting: false,
            token: result.token,
            currentUser: {
                ...result.user,
                createdAt: new Date(result.user.createdAt),
                updatedAt: new Date(result.user.updatedAt),
                patronymic: result.user?.patronymic,
                lastName: result.user.lastName,
                firstName: result.user.firstName,
            },
        })
    ),

    on(
        loginError,
        (state, { error }): IAuthState => ({
            ...state,
            token: null,
            currentUser: null,
            isSubmiting: false,
            validationErrors: error.error,
        })
    ),

    on(
        getCurrentUser,
        (state): IAuthState => ({
            ...state,
            currentUser: null,
            token: null,
            isSubmiting: true,
            validationErrors: null,
        })
    ),

    on(
        getCurrentUserSuccess,
        (state, { result }): IAuthState => ({
            ...state,
            isSubmiting: false,
            token: result.token,
            currentUser: {
                ...result.user,
                createdAt: new Date(result.user.createdAt),
                updatedAt: new Date(result.user.updatedAt),
                patronymic: '',
                lastName: '',
                firstName: '',
            },
        })
    ),

    on(
        getCurrentUserError,
        (state): IAuthState => ({
            ...state,
            token: null,
            currentUser: null,
            isSubmiting: false,
        })
    )
);

export function reducer(state: IAuthState, action: Action) {
    return authReducer(state, action);
}
