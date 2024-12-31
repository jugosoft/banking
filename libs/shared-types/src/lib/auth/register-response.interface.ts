export interface IRegisterResponse {
  user: {
    id: number;
    email: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
  };
}