import Credentials from "auth/models/Credentials";
import Query from "shared/domain/Query";
import User from "users/models/User.entity";

export default class GetUserByCredentialsQuery extends Query<
  Credentials,
  User
> {}
