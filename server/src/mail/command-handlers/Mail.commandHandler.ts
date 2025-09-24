import SendMailCommand from "mail/commands/SendMail.command";
import MailService from "mail/services/Mail.service";
import CommandHandler from "shared/decorators/CommandHandler";
import OnCommand from "shared/decorators/OnCommand";

@CommandHandler()
export default class MailCommandHandler {
  constructor(private readonly mailService: MailService) {}

  @OnCommand()
  public async handleSendMail(command: SendMailCommand) {
    await this.mailService.sendMail(command.params);
  }
}
