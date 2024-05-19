import { makeEnvironmentProviders } from '@angular/core';
import { AuthRepository } from '../application/repositories/auth.repository';
import { AuthRepositoryImpl } from './repositories/auth.repository';

export function provideAuthInfraestructure() {
  return makeEnvironmentProviders([
    {
      provide: AuthRepository,
      useClass: AuthRepositoryImpl,
    },
  ]);
}
