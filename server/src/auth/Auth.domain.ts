import Domain from "shared/decorators/Domain";
import AuthController from "./controllers/Auth.controller";
import AuthService from "./services/Auth.service";
import MongoSessionsDataSource from "./infrastructure/MongoSessionsDataSource";
import AuthCommandHandler from "./command-handlers/Auth.commandHandler";
import SessionsRepository from "./repositories/Sessions.repository";

@Domain({
  name: "Auth",
  dependencies: [MongoSessionsDataSource, SessionsRepository, AuthService],
  controllers: [AuthController],
  commandHandlers: [AuthCommandHandler],
})
export default class AuthDomain {}
