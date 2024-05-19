import { BehaviorSubject, Observable, map } from 'rxjs';

export class GetList<T, E extends Error | unknown> {
  private readonly payloadList = new BehaviorSubject<Map<string, T>>(new Map());
  private readonly errorList = new BehaviorSubject<E | undefined>(undefined);
  constructor(payload: Array<T> = [], private getKey: (item: T) => string) {
    this.payloadList.next(this.parseDate(payload));
  }

  get list$(): Observable<Array<T>> {
    return this.payloadList
      .asObservable()
      .pipe(map((payload) => Array.from(payload.values())));
  }

  get listValues(): Array<T> {
    return Array.from(this.payloadList.value.values());
  }

  get error$(): Observable<E | undefined> {
    return this.errorList.asObservable();
  }

  delete(key: string): void {
    this.payloadList.value.delete(key);
  }

  clear(): void {
    this.payloadList.value.clear();
  }

  setAll(payload: Array<T>): void {
    this.payloadList.value.clear();
    this.payloadList.next(this.parseDate(payload));
  }

  set(payload: T): void {
    this.payloadList.value.set(this.getKey(payload), payload);
  }

  setError(err: E): void {
    this.errorList.next(err);
  }

  private parseDate(payload: Array<T>): Map<string, T> {
    return new Map<string, T>(
      payload.map((item) => {
        return [this.getKey(item), item];
      })
    );
  }
}
