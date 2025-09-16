import ControllerData from "shared/types/ControllerData";
import HttpMethods from "../constants/HttpMethods";
import Route from "../types/Route";
import MiddlewaresList from "shared/types/MiddlewaresList";

type RouteDecorator = (
  path: string,
  ...middlewares: MiddlewaresList
) => MethodDecorator;

const createRouteDecorator = (method: HttpMethods): RouteDecorator => {
  return (path, ...middlewares) => {
    return (target, propertyKey, descriptor) => {
      const route: Route = {
        method,
        path,
        key: propertyKey,
        middlewares,
      };

      const controllerData: ControllerData = Reflect.getMetadata(
        "controller",
        target.constructor,
      ) || {
        path: "",
        middlewares: [],
        routes: [],
      };

      controllerData.routes.push(route);

      Reflect.defineMetadata("controller", controllerData, target.constructor);

      return descriptor;
    };
  };
};

export const Get = createRouteDecorator(HttpMethods.GET);
export const Post = createRouteDecorator(HttpMethods.POST);
export const Put = createRouteDecorator(HttpMethods.PUT);
export const Delete = createRouteDecorator(HttpMethods.DELETE);
export const Patch = createRouteDecorator(HttpMethods.PATCH);
export const Options = createRouteDecorator(HttpMethods.OPTIONS);
export const Head = createRouteDecorator(HttpMethods.HEAD);
export const All = createRouteDecorator(HttpMethods.ALL);
