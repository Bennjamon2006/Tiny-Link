import { RequestHandler } from "express";
import Middleware from "shared/classes/Middleware";
import SetupError from "shared/exceptions/SetupError";
import ControllerData from "shared/types/ControllerData";
import MiddlewaresList from "shared/types/MiddlewaresList";
import Route from "shared/types/Route";

interface MiddlewaresSplitted {
  expressMiddlewares: RequestHandler[];
  domainMiddlewares: Middleware[];
}

export default function splitMiddlewares(
  middlewares: MiddlewaresList,
  controller: ControllerData,
  route?: Route,
): MiddlewaresSplitted {
  const expressMiddlewares: RequestHandler[] = [];
  const domainMiddlewares: Middleware[] = [];

  for (const middleware of middlewares) {
    if (Middleware.isMiddleware(middleware)) {
      domainMiddlewares.push(middleware);
    } else if (domainMiddlewares.length !== 0) {
      if (route) {
        throw new SetupError(
          `Middlewares of ${route.method} ${controller.path}${route.path} has a invalid order`,
        );
      } else {
        throw new SetupError(
          `Middlewares of ${controller.path} has a invalid order`,
        );
      }
    } else {
      expressMiddlewares.push(middleware);
    }
  }

  return {
    expressMiddlewares,
    domainMiddlewares,
  };
}
