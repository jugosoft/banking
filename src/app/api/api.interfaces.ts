// Базовый ответ от бэкенда
export interface IApiResponse<T = null> {
    readonly success: boolean;
    readonly data?: T;
    readonly errors?: IResponseErrors;
}

export interface IError {
    readonly code: string;
    readonly message: string;
}

export interface IResponseErrors {
    readonly [key: string]: IError[];
}

// Универсальный тип для списков
export interface IPaginatedResponse<T> {
    readonly items: T[];
    readonly total: number;
    readonly page: number;
    readonly size: number;
    readonly haseMore: boolean;
}