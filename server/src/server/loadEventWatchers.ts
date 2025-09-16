import SetupError from "shared/exceptions/SetupError";
import DomainData from "shared/types/DomainData";
import domains from "./dependency-injection/domains";
import EventBus from "shared/domain/EventBus";
import Container from "./dependency-injection/Container";
import ListenerData from "shared/types/ListenerData";
import Logger from "shared/domain/Logger";

export default function loadEventWatchers() {
  const eventBus: EventBus = Container.instance.get("Shared.EventBus");
  const logger: Logger = Container.instance.get("Shared.Logger");

  for (const domain of domains) {
    const domainData: DomainData = Reflect.getMetadata("domain", domain);

    if (!domainData) {
      throw new SetupError(
        `Domain ${domain.name} is missing @Domain decorator`,
      );
    }

    for (const eventWatcher of domainData.eventWatchers || []) {
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
    }
  }

  logger.info("Event watchers loaded");
}
