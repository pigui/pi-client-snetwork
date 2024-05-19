import { Injectable } from '@angular/core';
import { InitClass, Newable } from './mixins/init-class';
import { BaseState } from './state';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class RegisterState<T, N extends Newable = any> {
  private stateClass: BehaviorSubject<BaseState<T>>;
  createState(entityClass: N): void {
    const InitEntityClass = InitClass<N>(entityClass);
    const state = new BaseState<T>(new InitEntityClass());
    this.stateClass = new BehaviorSubject(state);
  }

  get state$(): Observable<BaseState<T>> {
    return this.stateClass.asObservable();
  }

  get state(): BaseState<T> {
    return this.stateClass.value;
  }
}
