import Container from "server/dependency-injection/Container";
import Request from "shared/classes/Request";
import Response from "shared/classes/Response";
import Token from "shared/types/Token";

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

  constructor() {}

  abstract use(req: Request): Response | void | Promise<Response | void>;

  protected get<T>(token: Token<T>): T {
    return Container.instance.get(token);
  }
}
