import Request from "shared/classes/Request";
import Response from "shared/classes/Response";

export default abstract class Middleware {
  public static use<T extends Middleware, A extends any[]>(
    this: new (...args: A) => T,
    ...args: A
  ) {
    return new this(...args);
  }

  public static isMiddleware(arg: any): arg is Middleware {
    return (
      arg instanceof Middleware ||
      arg.constructor.prototype instanceof Middleware
    );
  }

  protected constructor() {}

  abstract use(req: Request): Response | void | Promise<Response | void>;
}
