import Command from "shared/domain/Command";

type CommandHandlerFN = (command: Command<any>) => any;

export default CommandHandlerFN;
