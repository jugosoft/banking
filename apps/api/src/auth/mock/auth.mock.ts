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
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    token: 'have no fear, the JWT is here',
});

export const mockLoginResponse = (loginDto: ILoginRequest): ILoginResponse => ({
    user: {
        id: 12,
        email: loginDto.email,
        username: 'exampla@mai.ru',
        firstName: 'John',
        lastName: 'Doe',
        patronymic: 'examplovich',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    token: 'have no fear, the JWT is here',
});

export const mockGetCurrentUserResponse = (): IGetCurrentUserResponse => ({
    user: {
        id: 12,
        email: 'exampla@mai.ru',
        username: 'example',
        firstName: 'John',
        lastName: 'Doe',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    token: 'have no fear, the JWT is here',
});
