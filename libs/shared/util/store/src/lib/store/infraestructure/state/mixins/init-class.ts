export interface Newable<T = any> extends Function {
  new (...args: any[]): T;
}

export function InitClass<TBase extends Newable>(Base: TBase) {
  return class extends Base {};
}
