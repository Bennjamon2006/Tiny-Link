import Command from "shared/domain/Command";

type CommandHandlerFN = (command: Command<any>) => void | Promise<void>;

export default CommandHandlerFN;
