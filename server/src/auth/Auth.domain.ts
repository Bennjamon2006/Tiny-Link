import Domain from "shared/decorators/Domain";
import AuthController from "./controllers/Auth.controller";
import AuthService from "./services/Auth.service";
import MongoSessionsDataSource from "./infrastructure/MongoSessionsDataSource";
import AuthCommandHandler from "./command-handlers/Auth.commandHandler";

@Domain({
  name: "Auth",
  dependencies: [MongoSessionsDataSource, AuthService],
  controllers: [AuthController],
  commandHandlers: [AuthCommandHandler],
})
export default class AuthDomain {}
