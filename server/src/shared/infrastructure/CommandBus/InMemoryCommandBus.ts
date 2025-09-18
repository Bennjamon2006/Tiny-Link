import Command from "shared/domain/Command";
import CommandBus from "shared/domain/CommandBus";
import CommandType from "shared/types/CommandType";
import { InternalServerError } from "shared/exceptions/CustomRequestErrors";
import SetupError from "shared/exceptions/SetupError";
import CommandHandlerFN from "shared/types/CommandHandlerFN";
import Injectable from "shared/decorators/Injectable";

@Injectable("CommandBus")
export default class InMemoryCommandBus implements CommandBus {
  private readonly handlers: Map<CommandType, CommandHandlerFN> = new Map();

  constructor() {}

  public registerHandler(
    commandType: CommandType,
    handler: CommandHandlerFN,
  ): void {
    if (this.handlers.has(commandType)) {
      throw new SetupError(
        `There is already a handler registered for the command type ${commandType.name}.`,
      );
    }

    this.handlers.set(commandType, handler);
  }

  public async execute(command: Command<any>): Promise<void> {
    const commandType: CommandType = command.constructor as CommandType;

    if (!this.handlers.has(commandType)) {
      throw new SetupError(
        `There is not a handler registered for the command type ${commandType.name}.`,
      );
    }

    const handler = this.handlers.get(commandType);

    try {
      await handler(command);
    } catch (err) {
      throw new InternalServerError(
        `Error handling command ${commandType.name}: ${err.message}`,
      );
    }
  }
}
