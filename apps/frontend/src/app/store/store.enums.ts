export enum StoreKey {
  AUTH = 'auth',
}

export enum AuthAction {
  REGISTER = '[Auth] Register',
  REGISTER_SUCCESS = '[Auth] Register Success',
  REGISTER_ERROR = '[Auth] Register Error',

  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_ERROR = '[Auth] Login Error',

  GET_CURRENT_USER = '[Auth] Get Current User',
  GET_CURRENT_USER_SUCCESS = '[Auth] Get Current User Success',
  GET_CURRENT_USER_ERROR = '[Auth] Get Current User Error',
}

export enum HomeAction {
  GET_DEPOSIT_LIST = '[Auth] Get Deposit List',
  GET_DEPOSIT_LIST_SUCCESS = '[Auth] Get Deposit List Success',
  GET_DEPOSIT_LIST_ERROR = '[Auth] Get Deposit List Error',
}
