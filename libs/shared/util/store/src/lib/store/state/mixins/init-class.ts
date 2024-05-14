export type Newable<T = any> = {
  new (...args: any[]): T;
};

export function InitClass<TBase extends Newable>(Base: TBase) {
  return class extends Base {};
}
