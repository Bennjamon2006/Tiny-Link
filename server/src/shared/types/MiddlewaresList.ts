import { RequestHandler } from "express";
import Middleware from "shared/classes/Middleware";

type MiddlewaresList = Array<Middleware | RequestHandler>;

export default MiddlewaresList;
