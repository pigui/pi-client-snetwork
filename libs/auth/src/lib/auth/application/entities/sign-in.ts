import { User } from './user';

export class SignIn {
  constructor(
    public readonly accessToken: string,
    public readonly refreshToken: string,
    public readonly user: User
  ) {}
}
