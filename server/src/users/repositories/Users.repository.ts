import Inject from "shared/decorators/Inject";
import Injectable from "shared/decorators/Injectable";
import DataSource from "shared/domain/DataSource";
import UserMapper from "users/mappers/User.mapper";
import { PersistenceUser } from "users/models/User.dto";
import User from "users/models/User.entity";

@Injectable()
export default class UsersRepository {
  constructor(
    @Inject("Users.DataSource")
    private readonly usersDataSource: DataSource<PersistenceUser>,
  ) {}

  public async getById(id: string): Promise<User | null> {
    const persistenceUser = await this.usersDataSource.getById(id);

    if (persistenceUser === null) {
      return null;
    }

    return UserMapper.fromPersistence(persistenceUser);
  }

  public async create(user: User): Promise<User> {
    const persistenceUser: PersistenceUser = UserMapper.toPersistence(user);

    const created = await this.usersDataSource.create(persistenceUser);

    return UserMapper.fromPersistence(created);
  }
}
