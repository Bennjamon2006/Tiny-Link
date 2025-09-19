import Inject from "shared/decorators/Inject";
import Injectable from "shared/decorators/Injectable";
import UsersDataSource from "users/data-sources/Users.dataSource";
import UserMapper from "users/mappers/User.mapper";
import { PersistenceUser } from "users/models/User.dto";
import User from "users/models/User.entity";

@Injectable()
export default class UsersRepository {
  constructor(
    @Inject("Users.DataSource")
    private readonly usersDataSource: UsersDataSource,
  ) {}

  public async getById(id: string): Promise<User | null> {
    const persistenceUser: PersistenceUser =
      await this.usersDataSource.getById(id);

    if (persistenceUser === null) {
      return null;
    }

    return UserMapper.fromPersistence(persistenceUser);
  }

  public async create(user: User): Promise<User> {
    const persistenceUser: PersistenceUser = UserMapper.toPersistence(user);

    const created: PersistenceUser =
      await this.usersDataSource.create(persistenceUser);

    return UserMapper.fromPersistence(created);
  }

  public async existsWithUsername(username: string): Promise<boolean> {
    const user: PersistenceUser =
      await this.usersDataSource.getByUsername(username);

    return user !== null;
  }

  public async existsWithEmail(email: string): Promise<boolean> {
    const user: PersistenceUser = await this.usersDataSource.getByEmail(email);

    return user !== null;
  }

  public async getByUsernameOrEmail(
    usernameOrEmail: string,
  ): Promise<User | null> {
    let user = await this.usersDataSource.getByUsername(usernameOrEmail);

    user ??= await this.usersDataSource.getByEmail(usernameOrEmail);

    if (!user) {
      return null;
    }

    return UserMapper.fromPersistence(user);
  }
}
