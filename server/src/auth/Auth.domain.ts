import Domain from "shared/decorators/Domain";
import AuthController from "./controllers/Auth.controller";
import AuthService from "./services/Auth.service";
import MongoSessionsDataSource from "./infrastructure/MongoSessionsDataSource";
import AuthCommandHandler from "./command-handlers/Auth.commandHandler";
import SessionsRepository from "./repositories/Sessions.repository";
import AuthQueryHandler from "./query-handlers/Auth.queryHandler";

@Domain({
  name: "Auth",
  dependencies: [MongoSessionsDataSource, SessionsRepository, AuthService],
  controllers: [AuthController],
  commandHandlers: [AuthCommandHandler],
  queryHandlers: [AuthQueryHandler],
})
export default class AuthDomain {}
