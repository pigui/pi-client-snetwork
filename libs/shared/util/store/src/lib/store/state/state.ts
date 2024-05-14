import { Signal, WritableSignal, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

export class State<T> {
  private readonly payload: WritableSignal<T> = signal(undefined);
  constructor(data: T) {
    this.payload.set(data);
  }

  state$(): Observable<T> {
    return toObservable(this.payload);
  }

  state(): Signal<T> {
    return this.payload.asReadonly();
  }
}
