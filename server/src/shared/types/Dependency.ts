import Constructor from "./Constructor";
import Token from "./Token";

type ClassDependency<T> =
  | Constructor<T>
  | {
      token?: Token<T>;
      class: Constructor<T>;
      args?: any[];
    };

type ValueDependendency<T> = {
  token: Token<T>;
  value: T;
};

type FactoryDependency<T> = {
  token: Token<T>;
  factory: (...args: any[]) => T;
  args?: any[];
};

type Dependency<T> =
  | ClassDependency<T>
  | ValueDependendency<T>
  | FactoryDependency<T>;

export default Dependency;
