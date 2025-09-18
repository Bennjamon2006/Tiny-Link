import CommandHandlerFN from "shared/types/CommandHandlerFN";
import CommandType from "shared/types/CommandType";
import Command from "./Command";

export default interface CommandBus {
  registerHandler(queryType: CommandType, handler: CommandHandlerFN): void;
  execute(command: Command<any>): Promise<void>;
}
