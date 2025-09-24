import SendMailCommand from "mail/commands/SendMail.command";
import WelcomeUserMail from "mail/mails/WelcomeUser.mail";
import EventWatcher from "shared/decorators/EventWatcher";
import Inject from "shared/decorators/Inject";
import OnEvent from "shared/decorators/OnEvent";
import CommandBus from "shared/domain/CommandBus";
import UserCreatedEvent from "users/events/UserCreatedEvent";

@EventWatcher()
export default class UsersEventWatcher {
  constructor(
    @Inject("Shared.CommandBus") private readonly commandBus: CommandBus,
  ) {}

  @OnEvent()
  public async onUserCreated(event: UserCreatedEvent) {
    const mail = new WelcomeUserMail({
      to: event.payload.email,
      data: {
        username: event.payload.username,
      },
    });

    await this.commandBus.execute(new SendMailCommand(mail));
  }
}
