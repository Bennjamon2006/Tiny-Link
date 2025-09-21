import CachedValue from "shared/types/CachedValue";

export default function Cache(
  expirationTime: number = 60 * 60 * 1000,
): MethodDecorator {
  return (target, key, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    const cache = new Map<string, CachedValue>();

    descriptor.value = function (...args: any[]) {
      const cacheKey = JSON.stringify(args);
      const cached = cache.get(cacheKey);

      if (cached && Date.now() - cached.timestamp < expirationTime) {
        return cached.value;
      }

      const result = originalMethod.apply(this, args);

      if (result instanceof Promise) {
        return result.then((value) => {
          cache.set(cacheKey, { value, timestamp: Date.now() });
          return value;
        });
      }

      cache.set(cacheKey, { value: result, timestamp: Date.now() });
      return result;
    };

    return descriptor;
  };
}
