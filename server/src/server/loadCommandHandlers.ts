import SetupError from "shared/exceptions/SetupError";
import DomainData from "shared/types/DomainData";
import domains from "./dependency-injection/domains";
import CommandBus from "shared/domain/CommandBus";
import Container from "./dependency-injection/Container";
import CommandHandlerData from "shared/types/CommandHandlerData";
import Logger from "shared/domain/Logger";

export default function loadCommandHandlers() {
  const commandBus: CommandBus = Container.instance.get("Shared.CommandBus");
  const logger: Logger = Container.instance.get("Shared.Logger");

  for (const domain of domains) {
    const domainData: DomainData = Reflect.getMetadata("domain", domain);

    if (!domainData) {
      throw new SetupError(
        `Domain ${domain.name} is missing @Domain decorator`,
      );
    }

    for (const commandHandler of domainData.commandHandlers || []) {
      const commandHandlers: CommandHandlerData[] = Reflect.getMetadata(
        "commandHandlers",
        commandHandler,
      );

      if (!commandHandlers) {
        throw new SetupError(
          `Command handler ${commandHandler.name} is missing @CommandHandler decorator`,
        );
      }

      const commandHandlerInstance = Container.instance.get(commandHandler);

      for (const commandHandlerData of commandHandlers) {
        const { key, commandType } = commandHandlerData;

        if (typeof commandHandlerInstance[key] !== "function") {
          throw new Error(
            `Method ${key.toString()} does not exist on command handler ${commandHandler.name}`,
          );
        }

        commandBus.registerHandler(
          commandType,
          commandHandlerInstance[key].bind(commandHandlerInstance),
        );
      }
    }
  }

  logger.info("Command handlers loaded");
}
