import Domain from "shared/decorators/Domain";
import ServerConfigService from "./domain/ServerConfigService";
import Server from "./Server";
import WinstonLogger from "shared/infrastructure/Logger/WinstonLogger";

@Domain({
  name: "Server",
  dependencies: [
    {
      token: "Logger",
      class: WinstonLogger,
      args: ["Server"],
    },
    {
      token: ServerConfigService,
      factory() {
        return ServerConfigService.initialize();
      },
    },
    Server,
  ],
})
export default class ServerDomain {}
