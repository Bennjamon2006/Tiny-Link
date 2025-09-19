import CommandHandler from "shared/decorators/CommandHandler";
import OnCommand from "shared/decorators/OnCommand";
import CreateUserCommand from "users/commands/CreateUser.command";
import UsersService from "users/services/Users.service";

@CommandHandler()
export default class UsersCommandHandler {
  constructor(private readonly usersService: UsersService) {}

  @OnCommand()
  public async handleCreateUser(command: CreateUserCommand): Promise<string> {
    const user = await this.usersService.create(command.params);

    return user.id;
  }
}
