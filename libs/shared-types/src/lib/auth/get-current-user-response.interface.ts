export interface IGetCurrentUserResponse {
  user: {
    id: number;
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
}
