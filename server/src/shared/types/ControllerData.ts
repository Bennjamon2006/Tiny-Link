import MiddlewaresList from "./MiddlewaresList";
import Route from "./Route";

type ControllerData = {
  path: string;
  routes: Route[];
  middlewares: MiddlewaresList;
};

export default ControllerData;
