import { makeEnvironmentProviders } from '@angular/core';
import { provideAuthInfraestructure } from './infraestructure/auth-infraestructure';
import { AuthFacade } from './application/auth.facade';

export function provideAuth() {
  return makeEnvironmentProviders([provideAuthInfraestructure(), AuthFacade]);
}
