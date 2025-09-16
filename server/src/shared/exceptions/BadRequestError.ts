import RequestError from "./RequestError";

export default class BadRequestError extends RequestError {
  constructor(message: string) {
    super(message, 400);
  }
}
