import OnQuery from "shared/decorators/OnQuery";
import QueryHandler from "shared/decorators/QueryHandler";
import { ExposedUser } from "users/models/User.dto";
import User from "users/models/User.entity";
import GetUserByCredentialsQuery from "users/queries/GetUserByCredentials.query";
import GetUserByIdQuery from "users/queries/GetUserById.query";
import UsersService from "users/services/Users.service";

@QueryHandler()
export default class UsersQueryHandler {
  constructor(public readonly usersService: UsersService) {}

  @OnQuery()
  public async handleGetUserByCredentials(
    query: GetUserByCredentialsQuery,
  ): Promise<User> {
    return this.usersService.getUserByCredentails(
      query.params.username,
      query.params.password,
    );
  }

  @OnQuery()
  public async getUserById(query: GetUserByIdQuery): Promise<ExposedUser> {
    return this.usersService.getById(query.params);
  }
}
