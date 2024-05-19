import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../application/repositories/auth.repository';
import { Apollo } from 'apollo-angular';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { SignIn } from '../../application/entities/sign-in';
import { SignUp } from '../../application/entities/sign-up';
import { SIGN_IN, SIGN_UP } from '../graphql/graphql';

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
  private readonly apollo = inject(Apollo);
  signIn(payload: { email: string; password: string }): Observable<SignIn> {
    return this.apollo.mutate({ variables: payload, mutation: SIGN_IN }).pipe(
      switchMap((result) => {
        if (!result || !result.data) {
          return throwError(() => new Error());
        }
        return of(
          new SignIn(
            result.data.accessToken,
            result.data.refreshToken,
            result.data.user
          )
        );
      })
    );
  }
  signUp(payload: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Observable<SignUp> {
    return this.apollo.mutate({ variables: payload, mutation: SIGN_UP }).pipe(
      switchMap((result) => {
        if (!result || !result.data) {
          return throwError(() => new Error());
        }
        return of(new SignUp(result.data.user));
      })
    );
  }
}
