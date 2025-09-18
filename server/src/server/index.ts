import "reflect-metadata";
import "./loadAliases";
import setupDependencies from "./dependency-injection/setupDependencies";
import Container from "./dependency-injection/Container";
import Server from "./Server";
import loadEventWatchers from "./loadEventWatchers";
import loadCommandHandlers from "./loadCommandHandlers";
import loadQueryHandlers from "./loadQueryHandlers";

async function main() {
  await setupDependencies();
  loadEventWatchers();
  loadCommandHandlers();
  loadQueryHandlers();

  const server = Container.instance.get(Server);

  server.start();

  // Handle graceful shutdown
  process.on("SIGINT", () => {
    server.stop();
    process.exit(0);
  });
}

main().catch((error) => {
  console.error("Error starting the application:", error.message);
  process.exit(1);
});
