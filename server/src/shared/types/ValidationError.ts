type ValidationError =
  | string
  | ValidationError[]
  | {
      [key: string]: ValidationError;
    };

export default ValidationError;
