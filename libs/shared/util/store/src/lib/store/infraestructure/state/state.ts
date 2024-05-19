type Key<T> = keyof T;

export class BaseState<T> {
  constructor(private payload: T) {}

  get state(): T {
    return this.payload;
  }

  setState(key: Key<T>, value: T[Key<T>]): void {
    this.payload = { ...this.payload, [key]: value };
  }
}
