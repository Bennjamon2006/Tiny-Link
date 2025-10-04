import PartialSchema from "./PartialSchema";

type ObjectSchemaPattern<T extends {}> = {
  [K in keyof T]: PartialSchema<T[K]>;
};

export default ObjectSchemaPattern;
