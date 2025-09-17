import Domain from "shared/decorators/Domain";
import AuthController from "./controllers/Auth.controller";
import AuthService from "./services/Auth.service";
import MongoSessionsDataSource from "./infrastructure/MongoSessionsDataSource";

@Domain({
  name: "Auth",
  dependencies: [MongoSessionsDataSource, AuthService],
  controllers: [AuthController],
})
export default class AuthDomain {}
