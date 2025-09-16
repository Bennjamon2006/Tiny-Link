export default class RequestError extends Error {
  public static isRequestError(error: unknown): error is RequestError {
    return (
      error instanceof RequestError || error.constructor instanceof RequestError
    );
  }

  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "RequestError";
    this.statusCode = statusCode;
  }
}
