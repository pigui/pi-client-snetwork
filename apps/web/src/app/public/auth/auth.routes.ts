import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'prefix',
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./sign-in/sign-in.view').then((c) => c.SignInView),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./sign-up/sign-up.view').then((c) => c.SignUpView),
  },
];
