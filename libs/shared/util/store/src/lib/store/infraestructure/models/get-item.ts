import { BehaviorSubject, Observable } from 'rxjs';

export class GetItem<T = unknown, E extends Error | unknown = unknown> {
  private readonly payload = new BehaviorSubject<T | undefined>(undefined);
  private readonly error = new BehaviorSubject<E | undefined>(undefined);
  constructor(payload?: T) {
    this.payload.next(payload);
  }

  get item$(): Observable<T | undefined> {
    return this.payload.asObservable();
  }

  get error$(): Observable<E | undefined> {
    return this.error.asObservable();
  }

  set(payload: T): void {
    this.payload.next(payload);
  }

  setError(err: E): void {
    this.error.next(err);
  }

  clear(): void {
    this.payload.next(undefined);
  }
}
