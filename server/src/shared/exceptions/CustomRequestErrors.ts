import RequestError from "./RequestError";

export class InternalServerError extends RequestError {
  constructor(message: string) {
    super(message, 500);
  }
}

export class BadRequestError extends RequestError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class ConflictError extends RequestError {
  constructor(message: string) {
    super(message, 409);
  }
}

export class NotFoundError extends RequestError {
  constructor(message: string) {
    super(message, 404);
  }
}

export default class UnauthorizedError extends RequestError {
  constructor(message: string) {
    super(message, 401);
  }
}
