export interface ILoginResponse {
  user: {
    id: number;
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
}
