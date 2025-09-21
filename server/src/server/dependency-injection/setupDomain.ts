import Constructor from "shared/types/Constructor";
import Container from "./Container";
import wrapDependency from "server/utils/wrapDependency";
import SetupError from "shared/exceptions/SetupError";
import DomainData from "shared/types/DomainData";
import Logger from "shared/domain/Logger";
import CommandBus from "shared/domain/CommandBus";
import QueryBus from "shared/domain/QueryBus";
import CommandHandlerData from "shared/types/CommandHandlerData";
import QueryHandlerData from "shared/types/QueryHandlerData";
import EventBus from "shared/domain/EventBus";
import ListenerData from "shared/types/ListenerData";

export default async function setupDomain(domain: Constructor<any>) {
  const domainData: DomainData = Reflect.getMetadata("domain", domain);

  if (!domainData) {
    throw new SetupError(`Domain ${domain.name} is missing @Domain decorator`);
  }

  // Important: This first and in order
  for (const dependency of domainData.dependencies || []) {
    const wrappedDependency = wrapDependency(dependency, domainData.name);

    await Container.instance.register(wrappedDependency);
  }

  const commandBus: CommandBus = Container.instance.get("Shared.CommandBus");
  const queryBus: QueryBus = Container.instance.get("Shared.QueryBus");
  const eventBus: EventBus = Container.instance.get("Shared.EventBus");
  const logger: Logger = Container.instance.get("Shared.Logger");

  const controllersPromises = (domainData.controllers || []).map((controller) =>
    Container.instance.register(wrapDependency(controller, domainData.name)),
  );

  const eventWatchersPromises = (domainData.eventWatchers || []).map(
    async (eventWatcher) => {
      await Container.instance.register(
        wrapDependency(eventWatcher, domainData.name),
      );

      const listeners: ListenerData[] = Reflect.getMetadata(
        "listeners",
        eventWatcher,
      );

      if (!listeners) {
        throw new SetupError(
          `EventWatcher ${eventWatcher.name} is missing @EventWatcher decorator`,
        );
      }

      const eventWatcherInstance = Container.instance.get(eventWatcher);

      for (const listener of listeners) {
        const { key, eventType } = listener;

        if (typeof eventWatcherInstance[key] !== "function") {
          throw new Error(
            `Method ${key.toString()} does not exist on event watcher ${eventWatcher.name}`,
          );
        }

        eventBus.registerListener(
          eventType,
          eventWatcherInstance[key].bind(eventWatcherInstance),
        );
      }
    },
  );

  const commandHandlersPromises = (domainData.commandHandlers || []).map(
    async (commandHandler) => {
      await Container.instance.register(
        wrapDependency(commandHandler, domainData.name),
      );

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
    },
  );

  const queryHandlerPromises = (domainData.queryHandlers || []).map(
    async (queryHandler) => {
      await Container.instance.register(
        wrapDependency(queryHandler, domainData.name),
      );

      const queryHandlers: QueryHandlerData[] = Reflect.getMetadata(
        "queryHandlers",
        queryHandler,
      );

      if (!queryHandlers) {
        throw new SetupError(
          `Query handler ${queryHandler.name} is missing @QueryHandler decorator`,
        );
      }

      const queryHandlerInstance = Container.instance.get(queryHandler);

      for (const queryHandlerData of queryHandlers) {
        const { key, queryType } = queryHandlerData;

        if (typeof queryHandlerInstance[key] !== "function") {
          throw new Error(
            `Method ${key.toString()} does not exist on query handler ${queryHandler.name}`,
          );
        }

        queryBus.registerHandler(
          queryType,
          queryHandlerInstance[key].bind(queryHandlerInstance),
        );
      }
    },
  );

  await Promise.all([
    ...controllersPromises,
    ...eventWatchersPromises,
    ...commandHandlersPromises,
    ...queryHandlerPromises,
  ]);

  logger.info(`Domain ${domainData.name} registered`);
}
