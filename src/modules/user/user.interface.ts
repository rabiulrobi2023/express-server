export interface IUser {
  id: number;
  name: string;
  age: number;
  email: string;
  password: string;
  is_active?: boolean;
}
