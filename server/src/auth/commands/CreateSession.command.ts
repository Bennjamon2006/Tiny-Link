import { SessionToCreate } from "auth/models/Session.dto";
import Command from "shared/domain/Command";

export default class CreateSessionCommand extends Command<
  SessionToCreate,
  string
> {}
