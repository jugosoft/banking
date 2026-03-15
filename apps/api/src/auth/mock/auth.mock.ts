import {
  IGetCurrentUserResponse,
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
  IResponseErrors,
} from '@banking/shared-types';

export const mockRegisterResponse = (
  registerDto: IRegisterRequest
): IRegisterResponse => ({
  user: {
    id: 12,
    email: registerDto.email,
    username: registerDto.username,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  token: 'have no fear, the JWT is here',
});

export const mockLoginResponse = (
  loginDto: ILoginRequest
): ILoginResponse => ({
  user: {
    id: 12,
    email: loginDto.email,
    username: 'exampla@mai.ru',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  token: 'have no fear, the JWT is here',
});

export const mockGetCurrentUserResponse = (): IGetCurrentUserResponse => ({
  user: {
    id: 12,
    email: 'exampla@mai.ru',
    username: 'example',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  token: 'have no fear, the JWT is here',
});