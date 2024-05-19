import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideGraphql } from '@app/shared/util/graphql';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@app/shared/util/store';
import { provideAuth } from '@app/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideRouter(appRoutes),
    provideAnimations(),
    provideGraphql(),
    provideStore(),
    provideAuth(),
    provideAnimations(),
    importProvidersFrom([FormsModule, ReactiveFormsModule]),
  ],
};
