import Command from "shared/domain/Command";
import { UserToCreate } from "users/models/User.dto";

export default class CreateUserCommand extends Command<UserToCreate, string> {}
