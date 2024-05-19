import { makeEnvironmentProviders } from '@angular/core';
import { storeInfraestructure } from './lib/store/infraestructure/store-infraetructure';

export * from './lib/store/infraestructure/facades/store.facade';
export * from './lib/store/infraestructure/models/get-list';
export * from './lib/store/infraestructure/models/get-item';
export * from './lib/store/infraestructure/models/loader';
export * from './lib/store/infraestructure/state/register-state';

export function provideStore() {
  return makeEnvironmentProviders([storeInfraestructure()]);
}
