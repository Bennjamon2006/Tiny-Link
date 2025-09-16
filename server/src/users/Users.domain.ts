import Domain from "shared/decorators/Domain";
import UsersService from "./services/Users.service";
import UsersController from "./controllers/Users.controller";
import MongoUserDataSource from "./infrastructure/MongoUsersDataSource";
import UsersRepository from "./repositories/Users.repository";
import UsersEventWatcher from "./event-watchers/Users.eventWatcher";

@Domain({
  name: "Users",
  dependencies: [MongoUserDataSource, UsersRepository, UsersService],
  controllers: [UsersController],
  eventWatchers: [UsersEventWatcher],
})
export default class UsersDomain {}
