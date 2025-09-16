import UnresolvedError from "shared/exceptions/UnresolvedError";
import Dependency from "../../shared/types/Dependency";
import Token from "../../shared/types/Token";

export default function resolveToken<T>(dependency: Dependency<T>): Token<T> {
  if ("token" in dependency) {
    return dependency.token;
  }

  if ("class" in dependency) {
    return resolveToken(dependency.class);
  }

  const token = Reflect.getMetadata("token", dependency);

  if (token) {
    return token;
  }

  if (dependency instanceof Function) {
    return dependency;
  }

  throw new UnresolvedError("Cannot resolve token for dependency", {
    dependency,
  });
}
