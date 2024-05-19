import { gql } from 'apollo-angular';
import type { User } from '../../application/entities/user';

export const SIGN_UP = gql<
  {
    user: User;
  },
  {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }
>`
  mutation SignUp($signUpInput: SignUpInput!) {
    signUp(signUpInput: $signUpInput) {
      user {
        id
      }
    }
  }
`;

export const SIGN_IN = gql<
  {
    user: User;
    accessToken: string;
    refreshToken: string;
  },
  {
    email: string;
    password: string;
  }
>`
  mutation SignIn($signInInput: SignInInput!) {
    signIn(signUpInput: $signUpInput) {
      accessToken
      refreshToken
      user {
        id
      }
    }
  }
`;
