import Domain from "shared/decorators/Domain";
import UsersService from "./services/Users.service";
import UsersController from "./controllers/Users.controller";
import MongoUserDataSource from "./infrastructure/MongoUsersDataSource";
import UsersRepository from "./repositories/Users.repository";

@Domain({
  name: "Users",
  dependencies: [MongoUserDataSource, UsersRepository, UsersService],
  controllers: [UsersController],
})
export default class UsersDomain {}
