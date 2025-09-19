import { ExposedSession } from "auth/models/Session.dto";
import Query from "shared/domain/Query";

export default class GetSessionByIdQuery extends Query<
  string,
  ExposedSession
> {}
