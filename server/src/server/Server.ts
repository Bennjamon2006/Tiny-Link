import express, { Request, Response, NextFunction, Router } from "express";
import { Server as HttpServer } from "http";
import domains from "./dependency-injection/domains";
import DomainData from "shared/types/DomainData";
import ControllerData from "shared/types/ControllerData";
import Container from "./dependency-injection/Container";
import resolveToken from "server/utils/resolveToken";
import parseHandler from "server/utils/parseHandler";
import { NotFoundError } from "shared/exceptions/CustomRequestErrors";
import RequestError from "shared/exceptions/RequestError";
import ServerConfigService from "./domain/ServerConfigService";
import Injectable from "shared/decorators/Injectable";
import Inject from "shared/decorators/Inject";
import Logger from "shared/domain/Logger";
import splitMiddlewares from "./utils/splitMiddlewares";
import Handler from "shared/types/Handler";

@Injectable()
export default class Server {
  private readonly app = express();

  private httpServer?: HttpServer;

  constructor(
    private readonly serverConfigService: ServerConfigService,
    @Inject("Server.Logger") private readonly logger: Logger,
  ) {
    this.setupApp();
    this.loadRoutes();
    this.loadErrorHandling();
  }

  private setupApp(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private loadRoutes(): void {
    for (const Domain of domains) {
      const domainData: DomainData = Reflect.getMetadata("domain", Domain);

      if (!domainData) {
        throw new Error(`Domain ${Domain.name} is missing @Domain decorator`);
      }

      if (!domainData.controllers) {
        continue;
      }

      for (const Controller of domainData.controllers) {
        const controllerData: ControllerData = Reflect.getMetadata(
          "controller",
          Controller,
        );

        if (!controllerData) {
          throw new Error(
            `Controller ${Controller} is missing @Controller decorator`,
          );
        }

        const controllerMiddlewares = splitMiddlewares(
          controllerData.middlewares,
          controllerData,
        );

        const router = Router();

        if (controllerMiddlewares.expressMiddlewares.length > 0) {
          router.use(...controllerMiddlewares.expressMiddlewares);
        }

        for (const route of controllerData.routes) {
          const { method, path, key, middlewares } = route;
          const token = resolveToken(Controller);

          const controllerInstance = Container.instance.get(token);

          if (typeof controllerInstance[key] !== "function") {
            throw new Error(
              `Method ${key.toString()} does not exist on controller ${Controller}`,
            );
          }

          const routeMiddlewares = splitMiddlewares(
            middlewares,
            controllerData,
            route,
          );

          const handler: Handler =
            controllerInstance[key].bind(controllerInstance);
          const fullMiddlewares =
            controllerMiddlewares.domainMiddlewares.concat(
              routeMiddlewares.domainMiddlewares,
            );

          router[method](
            path,
            ...routeMiddlewares.expressMiddlewares,
            parseHandler(handler, fullMiddlewares),
          );

          this.logger.info(
            `Registered route [${method.toUpperCase()}] ${controllerData.path}${path}`,
          );
        }

        this.app.use(controllerData.path, router);
      }
    }
  }

  private loadErrorHandling(): void {
    this.app.use((req, res, next) => {
      next(new NotFoundError(`Cannot ${req.method} ${req.originalUrl}`));
    });

    this.app.use(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (err: RequestError, req: Request, res: Response, next: NextFunction) => {
        if (err.statusCode !== 500) {
          res.status(err.statusCode).json({ message: err.message });
        } else {
          console.error(err);

          res.status(500).json({ message: "Internal Server Error" });
        }
      },
    );
  }

  public start(): void {
    if (this.httpServer) {
      throw new Error("Server is already running");
    }

    const port = this.serverConfigService.get("port");
    const host = this.serverConfigService.get("host");

    this.httpServer = this.app.listen(port, host, (err) => {
      if (err) {
        this.logger.error(`Error starting server: ${err.message}`);
        throw err;
      }

      this.logger.info(`Server is running at http://${host}:${port}`);
    });
  }

  public stop(): void {
    if (!this.httpServer) {
      throw new Error("Server is not running");
    }

    this.httpServer.close((err) => {
      this.httpServer = undefined;
      if (err) {
        this.logger.error(`Error stopping server: ${err.message}`);
        throw err;
      }

      this.logger.info("Server has been stopped");
    });
  }
}
