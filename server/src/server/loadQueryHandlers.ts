import SetupError from "shared/exceptions/SetupError";
import DomainData from "shared/types/DomainData";
import domains from "./dependency-injection/domains";
import QueryBus from "shared/domain/QueryBus";
import Container from "./dependency-injection/Container";
import QueryHandlerData from "shared/types/QueryHandlerData";
import Logger from "shared/domain/Logger";

export default function loadQueryHandlers() {
  const queryBus: QueryBus = Container.instance.get("Shared.QueryBus");
  const logger: Logger = Container.instance.get("Shared.Logger");

  for (const domain of domains) {
    const domainData: DomainData = Reflect.getMetadata("domain", domain);

    if (!domainData) {
      throw new SetupError(
        `Domain ${domain.name} is missing @Domain decorator`,
      );
    }

    for (const queryHandler of domainData.queryHandlers || []) {
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
    }
  }

  logger.info("Query handlers loaded");
}
