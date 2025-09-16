import RequestError from "./RequestError";

export default class InternalServerError extends RequestError {
  constructor(message: string) {
    super(message, 500);
  }
}
