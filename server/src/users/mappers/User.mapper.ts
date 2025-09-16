import User from "users/models/User.entity";
import {
  PersistenceUser,
  ExposedUser,
  UserToCreate,
} from "users/models/User.dto";

export default class UserMapper {
  public static fromCreate(data: UserToCreate): User {
    return new User(data.username, data.password, data.email);
  }

  public static fromPersistence(data: PersistenceUser): User {
    return new User(
      data.username,
      data.passwordHash,
      data.email,
      data.emailVerified,
      true,
      data._id,
      data.createdAt,
      data.updatedAt,
    );
  }

  public static toPersistence(user: User): PersistenceUser {
    user.presave();

    return {
      username: user.username,
      passwordHash: user.passwordHash,
      email: user.email,
      emailVerified: user.emailVerified,
      _id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  public static toExposed(user: User): ExposedUser {
    return {
      username: user.username,
      email: user.email,
      emailVerified: user.emailVerified,
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
