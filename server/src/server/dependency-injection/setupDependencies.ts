import domains from "./domains";
import Container from "./Container";
import DomainData from "shared/types/DomainData";
import SetupError from "shared/exceptions/SetupError";
import wrapDependency from "server/utils/wrapDependency";

export default async function setupDependencies() {
  for (const domain of domains) {
    const domainData: DomainData = Reflect.getMetadata("domain", domain);

    if (!domainData) {
      throw new SetupError(
        `Domain ${domain.name} is missing @Domain decorator`,
      );
    }

    for (const dependency of domainData.dependencies || []) {
      const wrappedDependency = wrapDependency(dependency, domainData.name);

      await Container.instance.register(wrappedDependency);
    }

    for (const controller of domainData.controllers || []) {
      const wrappedController = wrapDependency(controller, domainData.name);
      await Container.instance.register(wrappedController);
    }

    for (const eventWatcher of domainData.eventWatchers || []) {
      await Container.instance.register(eventWatcher);
    }
  }
}
