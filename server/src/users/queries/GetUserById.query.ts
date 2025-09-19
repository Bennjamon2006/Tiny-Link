import Query from "shared/domain/Query";
import { ExposedUser } from "users/models/User.dto";

export default class GetUserByIdQuery extends Query<string, ExposedUser> {}
