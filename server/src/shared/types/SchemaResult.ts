import ErrorData from "./ErrorData";

type SchemaResult<T> =
  | {
      ok: true;
      value: T;
    }
  | {
      ok: false;
      value: T;
      error: ErrorData;
    };

export default SchemaResult;
