type ErrorData =
  | string
  | ErrorData[]
  | {
      [key: string]: ErrorData;
    };

export default ErrorData;
