import { makeEnvironmentProviders } from '@angular/core';
import { RegisterState } from './state/register-state';

export function storeInfraestructure() {
  return makeEnvironmentProviders([
    { provide: RegisterState, useClass: RegisterState },
  ]);
}
