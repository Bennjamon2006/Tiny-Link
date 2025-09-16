import Event from "shared/domain/Event";
import User from "users/models/User.entity";

export default class UserCreatedEvent extends Event<User> {}
