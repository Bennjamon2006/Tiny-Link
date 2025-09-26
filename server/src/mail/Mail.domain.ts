import Domain from "shared/decorators/Domain";
import MailService from "./services/Mail.service";
import MailCommandHandler from "./command-handlers/Mail.commandHandler";
import EmailJSConfigService from "./infrastructure/EmailJSConfigService";
import EmailJSMailPort from "./infrastructure/EmailJSMailPort";
import InMemoryMailQueue from "./infrastructure/InMemoryMailQueue";
import WinstonLogger from "shared/infrastructure/Logger/WinstonLogger";

@Domain({
  name: "Mail",
  dependencies: [
    {
      token: "Logger",
      class: WinstonLogger,
      args: ["Mail"],
    },
    {
      token: EmailJSConfigService,
      factory() {
        return EmailJSConfigService.initialize();
      },
    },
    EmailJSMailPort,
    InMemoryMailQueue,
    MailService,
  ],
  commandHandlers: [MailCommandHandler],
})
export default class MailDomain {}
