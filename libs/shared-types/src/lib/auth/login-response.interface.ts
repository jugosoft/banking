export interface ILoginResponse {
  user: {
    id: number;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    patronymic?: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
}
