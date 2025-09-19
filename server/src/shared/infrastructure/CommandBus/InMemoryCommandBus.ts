import Command from "shared/domain/Command";
import CommandBus from "shared/domain/CommandBus";
import CommandType from "shared/types/CommandType";
import { InternalServerError } from "shared/exceptions/CustomRequestErrors";
import SetupError from "shared/exceptions/SetupError";
import CommandHandlerFN from "shared/types/CommandHandlerFN";
import Injectable from "shared/decorators/Injectable";
import RequestError from "shared/exceptions/RequestError";
import CommandResult from "shared/types/CommandResult";

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

  public async execute<C extends Command<any, any>>(
    command: C,
  ): Promise<CommandResult<C>> {
    const commandType: CommandType = command.constructor as CommandType;

    if (!this.handlers.has(commandType)) {
      throw new SetupError(
        `There is not a handler registered for the command type ${commandType.name}.`,
      );
    }

    const handler = this.handlers.get(commandType);

    try {
      const result = await handler(command);

      return result;
    } catch (err) {
      if (RequestError.isRequestError(err)) {
        throw err;
      }

      throw new InternalServerError(
        `Error handling command ${commandType.name} at: ${err.stack.split("\n")[1]}:\n ${err.message}`,
      );
    }
  }
}
