import { IError } from './error.interface';

export interface IResponseErrors {
  [key: string]: IError;
}
