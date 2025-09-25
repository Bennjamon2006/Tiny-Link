import Domain from "shared/decorators/Domain";
import MailService from "./services/Mail.service";
import MailCommandHandler from "./command-handlers/Mail.commandHandler";
import EmailJSConfigService from "./infrastructure/EmailJSConfigService";
import EmailJSMailPort from "./infrastructure/EmailJSMailPort";

@Domain({
  name: "Mail",
  dependencies: [
    {
      token: EmailJSConfigService,
      factory() {
        return EmailJSConfigService.initialize();
      },
    },
    EmailJSMailPort,
    MailService,
  ],
  commandHandlers: [MailCommandHandler],
})
export default class MailDomain {}
