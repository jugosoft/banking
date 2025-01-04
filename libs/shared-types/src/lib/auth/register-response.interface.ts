export interface IRegisterResponse {
  user: {
    id: number;
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
}
