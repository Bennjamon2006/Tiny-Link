import { SessionToCreate } from "auth/models/Session.dto";
import Session from "auth/models/Session.entity";
import Command from "shared/domain/Command";

export default class CreateSessionCommand extends Command<
  SessionToCreate,
  Session
> {}
