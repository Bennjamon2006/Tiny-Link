import HttpMethods from "../constants/HttpMethods";
import MiddlewaresList from "./MiddlewaresList";

type Route = {
  path: string;
  key: string | symbol;
  method: HttpMethods;
  middlewares: MiddlewaresList;
};

export default Route;
