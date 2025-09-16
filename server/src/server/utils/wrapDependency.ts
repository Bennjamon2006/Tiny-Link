import Dependency from "shared/types/Dependency";

export default function wrapDependency<T>(
  dependency: Dependency<T>,
  domainName: string,
): Dependency<T> {
  if ("token" in dependency && typeof dependency.token === "string") {
    dependency.token = `${domainName}.${dependency.token}`;
  }

  if (dependency instanceof Function) {
    const token = Reflect.getMetadata("token", dependency);

    if (typeof token === "string") {
      Reflect.defineMetadata("token", `${domainName}.${token}`, dependency);
    }
  }

  return dependency;
}
