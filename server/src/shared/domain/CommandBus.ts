import CommandHandlerFN from "shared/types/CommandHandlerFN";
import CommandType from "shared/types/CommandType";
import Command from "./Command";
import CommandResult from "shared/types/CommandResult";

export default interface CommandBus {
  registerHandler(commandType: CommandType, handler: CommandHandlerFN): void;
  execute<C extends Command<any, any>>(command: C): Promise<CommandResult<C>>;
}
