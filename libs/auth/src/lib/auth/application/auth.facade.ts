import { Injectable, inject } from '@angular/core';
import {
  GetItem,
  Loader,
  RegisterState,
  StoreFacade,
} from '@app/shared/util/store';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { AuthRepository } from './repositories/auth.repository';
import type { User } from './entities/user';
import { SignUp } from './entities/sign-up';
import { SignIn } from './entities/sign-in';

class UserLogger {
  user = new GetItem<User>();
  accessToken = new GetItem<string>();
  refreshToken = new GetItem<string>();
}

class SignInState {
  public readonly email = new BehaviorSubject<string>('');
  public readonly password = new BehaviorSubject<string>('');
}

class SignUpState {
  public readonly firstName = new BehaviorSubject<string>('');
  public readonly lastName = new BehaviorSubject<string>('');
  public readonly email = new BehaviorSubject<string>('');
  public readonly password = new BehaviorSubject<string>('');
}

class State {
  public readonly signIn = new SignInState();
  public readonly signUp = new SignUpState();
  public readonly userLogger = new UserLogger();
  public readonly loader = new Loader();
}

@Injectable()
export class AuthFacade extends StoreFacade<State> {
  protected override registerState: RegisterState<State> =
    inject(RegisterState);

  private readonly authRepository = inject(AuthRepository);

  // Loader
  private get loader(): Loader {
    return this.store.state.loader;
  }

  constructor() {
    super();
    this.registerState.createState(State);
  }

  get signUpState(): SignUpState {
    return this.store.state.signUp;
  }

  get signInState(): SignInState {
    return this.store.state.signIn;
  }

  get userLogger(): UserLogger {
    return this.store.state.userLogger;
  }

  // Getters SignUp
  get signUpEmail$(): Observable<string> {
    return this.signUpState.email.asObservable();
  }

  get signUpPassword$(): Observable<string> {
    return this.signUpState.password.asObservable();
  }

  get signUpFirstName$(): Observable<string> {
    return this.signUpState.firstName.asObservable();
  }

  get signUpLastName$(): Observable<string> {
    return this.signUpState.lastName.asObservable();
  }

  // Getters Sign In
  get signInEmail$(): Observable<string> {
    return this.signInState.email.asObservable();
  }

  get signInPassword$(): Observable<string> {
    return this.signInState.password.asObservable();
  }

  get isLoading$(): Observable<boolean> {
    return this.loader.isLoading$;
  }

  // Setters Sign Up
  setSignUpEmail(email: string): void {
    this.signUpState.email.next(email);
  }

  setSignUpPassword(password: string): void {
    this.signUpState.password.next(password);
  }

  setSignUpFirstName(firstName: string): void {
    this.signUpState.firstName.next(firstName);
  }

  setSignUpLastName(lastName: string): void {
    this.signUpState.lastName.next(lastName);
  }

  // Setters Sign In
  setSignInEmail(email: string): void {
    this.signInState.email.next(email);
  }

  setSignInPassword(password: string): void {
    this.signInState.password.next(password);
  }

  signUp(): void {
    if (this.loader.isLoadingValue) {
      return;
    }
    const sub = this.authRepository
      .signUp({
        firstName: this.signUpState.firstName.value,
        lastName: this.signUpState.lastName.value,
        email: this.signUpState.email.value,
        password: this.signUpState.password.value,
      })
      .pipe(take(1))
      .subscribe({
        next: (response: SignUp) => {
          this.userLogger.user.set(response.user);
        },
        error: (error) => {
          this.userLogger.user.setError(error);
        },
      });
    this.loader.waitFor(sub);
  }

  signIn(): void {
    if (this.loader.isLoadingValue) {
      return;
    }
    const sub = this.authRepository
      .signIn({
        email: this.signInState.email.value,
        password: this.signInState.password.value,
      })
      .pipe(take(1))
      .subscribe({
        next: (response: SignIn) => {
          this.userLogger.user.set(response.user);
          this.userLogger.accessToken.set(response.accessToken);
          this.userLogger.refreshToken.set(response.refreshToken);
        },
        error: (error) => {
          this.userLogger.user.setError(error);
        },
      });
    this.loader.waitFor(sub);
  }
}
