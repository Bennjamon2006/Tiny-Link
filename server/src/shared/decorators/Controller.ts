import ControllerData from "shared/types/ControllerData";
import MiddlewaresList from "shared/types/MiddlewaresList";

export default function Controller(
  path: string,
  ...middlewares: MiddlewaresList
): ClassDecorator {
  return (target) => {
    const controllerData: ControllerData = Reflect.getMetadata(
      "controller",
      target,
    ) || {
      path: "",
      middlewares: [],
      routes: [],
    };

    controllerData.path = path;
    controllerData.middlewares = middlewares;

    Reflect.defineMetadata("controller", controllerData, target);
  };
}
