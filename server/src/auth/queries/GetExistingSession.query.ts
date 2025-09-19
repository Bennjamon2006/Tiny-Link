import { SessionToCreate } from "auth/models/Session.dto";
import Session from "auth/models/Session.entity";
import Query from "shared/domain/Query";

export default class GetExistingSessionQuery extends Query<
  SessionToCreate,
  Session | null
> {}
