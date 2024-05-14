import { Injectable } from '@angular/core';
import { InitClass, Newable } from './mixins/init-class';
import { State } from './state';

@Injectable()
export class RegisterState {
  createState<T extends Newable>(entityClass: T): State<T> {
    return new State(InitClass(entityClass));
  }
}
