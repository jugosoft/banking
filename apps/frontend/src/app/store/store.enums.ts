export enum StoreKey {
  AUTH = 'auth',
  HOME = 'home',
  DEPOSIT = 'deposit',
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
  GET_DEPOSIT_LIST = '[Home] Get Deposit List',
  GET_DEPOSIT_LIST_SUCCESS = '[Home] Get Deposit List Success',
  GET_DEPOSIT_LIST_ERROR = '[Home] Get Deposit List Error',
}

export enum DepositAction {
  GET_DEPOSIT = '[Deposit] Get Deposit',
  GET_DEPOSIT_SUCCESS = '[Deposit] Get Deposit Success',
  GET_DEPOSIT_ERROR = '[Deposit] Get Deposit Error',
}

