import SetupError from "shared/exceptions/SetupError";
import CommandType from "shared/types/CommandType";
import Command from "shared/domain/Command";
import CommandHandlerData from "shared/types/CommandHandlerData";

export default function OnCommand(): MethodDecorator {
  return (target, key: string) => {
    const paramTypes: [CommandType] = Reflect.getMetadata(
      "design:paramtypes",
      target,
      key,
    );

    if (paramTypes.length !== 1) {
      throw new SetupError(
        `Command handler ${target.constructor.name}.${key} must receive one parameter`,
      );
    }

    const commandType = paramTypes[0];

    if (!(commandType.prototype instanceof Command)) {
      throw new SetupError(
        `Parameter of Command Handler ${target.constructor.name}.${key} must be a Command subclass`,
      );
    }

    if (commandType === Command) {
      throw new SetupError(
        `Command handler ${target.constructor.name}.${key} must no listen to generic huery`,
      );
    }

    const commandHandlers: CommandHandlerData[] =
      Reflect.getMetadata("commandHandlers", target.constructor) || [];

    commandHandlers.push({
      commandType,
      key,
    });

    Reflect.defineMetadata(
      "commandHandlers",
      commandHandlers,
      target.constructor,
    );
  };
}
