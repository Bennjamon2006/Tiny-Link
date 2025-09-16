import Injectable from "shared/decorators/Injectable";
import NotFoundError from "shared/exceptions/NotFoundError";
import UserMapper from "users/mappers/User.mapper";
import { ExposedUser, UserToCreate } from "users/models/User.dto";
import UsersRepository from "users/repositories/Users.repository";

@Injectable()
export default class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async getById(id: string): Promise<ExposedUser> {
    const user = await this.usersRepository.getById(id);

    if (user === null) {
      throw new NotFoundError(`User #${id} nor found`);
    }

    return UserMapper.toExposed(user);
  }

  public async create(data: UserToCreate) {
    const user = UserMapper.fromCreate(data);

    const created = await this.usersRepository.create(user);

    return UserMapper.toExposed(created);
  }
}
