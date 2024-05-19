import { BehaviorSubject, Observable, Subscription } from 'rxjs';

export class Loader {
  private readonly loader = new BehaviorSubject<boolean>(false);

  get isLoading$(): Observable<boolean> {
    return this.loader.asObservable();
  }

  get isLoadingValue(): boolean {
    return this.loader.value;
  }

  waitFor(sub: Subscription) {
    this.loader.next(true);
    sub.add(() => {
      this.loader.next(false);
    });
  }
}
