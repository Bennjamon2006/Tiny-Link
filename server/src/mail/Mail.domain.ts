import Domain from "shared/decorators/Domain";
import FakeMailPort from "./infrastructure/FakeMailPort";
import MailService from "./services/Mail.service";
import MailCommandHandler from "./command-handlers/Mail.commandHandler";

@Domain({
  name: "Mail",
  dependencies: [FakeMailPort, MailService],
  commandHandlers: [MailCommandHandler],
})
export default class MailDomain {}
