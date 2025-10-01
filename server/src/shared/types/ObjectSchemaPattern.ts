import Schema from "./Schema";

type ObjectSchemaPattern<T extends {}> = {
  [K in keyof T]: Partial<Schema<T[K], {}>>;
};

export default ObjectSchemaPattern;
