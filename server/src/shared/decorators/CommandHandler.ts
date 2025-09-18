import CommandHandlerData from "shared/types/CommandHandlerData";

export default function CommandHandler(): ClassDecorator {
  return (target) => {
    const CommandHandlers: CommandHandlerData[] =
      Reflect.getMetadata("commandHandlers", target) || [];

    Reflect.defineMetadata("commandHandlers", CommandHandlers, target);
  };
}
