import Inject from "shared/decorators/Inject";
import Injectable from "shared/decorators/Injectable";
import EventBus from "shared/domain/EventBus";
import ConflictError from "shared/exceptions/ConflictError";
import NotFoundError from "shared/exceptions/NotFoundError";
import UserCreatedEvent from "users/events/UserCreatedEvent";
import UserMapper from "users/mappers/User.mapper";
import { ExposedUser, UserToCreate } from "users/models/User.dto";
import UsersRepository from "users/repositories/Users.repository";

@Injectable()
export default class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @Inject("Shared.EventBus") private readonly eventBus: EventBus,
  ) {}

  public async getById(id: string): Promise<ExposedUser> {
    const user = await this.usersRepository.getById(id);

    if (user === null) {
      throw new NotFoundError(`User #${id} nor found`);
    }

    return UserMapper.toExposed(user);
  }

  public async create(data: UserToCreate) {
    await this.verifyNoRepeated(data);

    const user = UserMapper.fromCreate(data);

    const created = await this.usersRepository.create(user);

    await this.eventBus.emit(new UserCreatedEvent(created));

    return UserMapper.toExposed(created);
  }

  private async verifyNoRepeated(data: UserToCreate) {
    const isRepeatedUsername = await this.usersRepository.existsWithUsername(
      data.username,
    );

    if (isRepeatedUsername) {
      throw new ConflictError(
        `User with username "${data.username}" already exists`,
      );
    }

    const isRepeatedEmail = await this.usersRepository.existsWithEmail(
      data.email,
    );

    if (isRepeatedEmail) {
      throw new ConflictError(`User with email "${data.email}" already exists`);
    }
  }
}
