export interface IGetCurrentUserResponse {
  user: {
    id: number;
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    patronymic?: string;
    createdAt: Date;
    updatedAt: Date;
  };
  token: string;
}
