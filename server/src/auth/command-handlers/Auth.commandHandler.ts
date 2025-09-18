import LoginCommand from "auth/commands/Login.command";
import CommandHandler from "shared/decorators/CommandHandler";
import OnCommand from "shared/decorators/OnCommand";

@CommandHandler()
export default class AuthCommandHandler {
  constructor() {}

  @OnCommand()
  public async handleLogin(command: LoginCommand) {
    console.log({ command });
  }
}
