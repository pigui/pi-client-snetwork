import { Observable } from 'rxjs';
import { SignIn } from '../entities/sign-in';
import { SignUp } from '../entities/sign-up';

export abstract class AuthRepository {
  abstract signIn(payload: {
    email: string;
    password: string;
  }): Observable<SignIn>;
  abstract signUp(payload: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Observable<SignUp>;
}
