import { Injectable, inject } from '@angular/core';
import { RegisterState } from '../state/register-state';
import { State } from '../state/state';

@Injectable()
export abstract class StoreFacade<T> {
  protected readonly registerState = inject(RegisterState);
  protected abstract readonly state: State<T>;
}
