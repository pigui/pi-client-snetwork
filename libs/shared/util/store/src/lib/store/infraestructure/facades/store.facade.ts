import { RegisterState } from '../state/register-state';
import { BaseState } from '../state/state';
import { Observable } from 'rxjs';

export abstract class StoreFacade<T> {
  protected abstract readonly registerState: RegisterState<T>;

  get store$(): Observable<BaseState<T>> {
    return this.registerState.state$;
  }

  get store(): BaseState<T> {
    return this.registerState.state;
  }
}
