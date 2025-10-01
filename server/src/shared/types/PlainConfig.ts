type PlainConfig<T> = T extends object
  ? {
      [K in keyof T]: PlainConfig<T[K]>;
    }
  : T extends []
    ? []
    : T extends [infer V, ...infer Rest]
      ? [PlainConfig<V>, ...PlainConfig<Rest>]
      : T | string;

export default PlainConfig;
