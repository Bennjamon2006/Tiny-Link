import UnresolvedError from "shared/exceptions/UnresolvedError";
import Constructor from "../../shared/types/Constructor";
import Injection from "../../shared/types/Injection";
import Token from "../../shared/types/Token";
import resolveToken from "./resolveToken";

export default function parseArgs(Class: Constructor<any>): Token[] {
  const paramTypes: Constructor<any>[] = Reflect.getMetadata(
    "design:paramtypes",
    Class,
  );

  if (paramTypes === undefined) {
    throw new UnresolvedError(
      `Cannot resolve constructor parameters for class "${Class.name}". ` +
        `Make sure that all dependencies are decorated with @Injectable or @Inject decorator.`,
      { dependency: Class },
    );
  }

  const tokens: Token[] = [];

  const injections: Injection[] =
    Reflect.getMetadata("injections", Class) || [];

  injections.forEach((injection) => {
    tokens[injection.index] = injection.token;
  });

  paramTypes.forEach((paramType, i) => {
    tokens[i] ??= resolveToken(paramType);
  });

  return tokens;
}
