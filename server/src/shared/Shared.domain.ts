import MongoConfigService from "./infrastructure/mongo/MongoConfigService";
import { MongoConnectionFactory } from "./infrastructure/mongo/MongoConnectionFactory";
import Domain from "./decorators/Domain";
import WinstonLogger from "./infrastructure/Logger/WinstonLogger";
import Logger from "./domain/Logger";
import InMemoryEventBus from "./infrastructure/EventBus/InMemoryEventBus";

@Domain({
  name: "Shared",
  dependencies: [
    {
      token: "Logger",
      class: WinstonLogger,
      args: ["Shared"],
    },
    MongoConfigService,
    {
      token: "MongoDB.Connection",
      factory: (mongoConfigService: MongoConfigService, logger: Logger) => {
        return MongoConnectionFactory.getDb(mongoConfigService, logger);
      },
      args: [MongoConfigService, "Shared.Logger"],
    },
    InMemoryEventBus,
  ],
})
export default class SharedDomain {}
