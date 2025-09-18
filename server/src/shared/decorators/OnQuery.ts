import SetupError from "shared/exceptions/SetupError";
import QueryType from "shared/types/QueryType";
import Query from "shared/domain/Query";
import QueryHandlerData from "shared/types/QueryHandlerData";

export default function OnQuery(): MethodDecorator {
  return (target, key: string) => {
    const paramTypes: [QueryType] = Reflect.getMetadata(
      "design:paramtypes",
      target,
      key,
    );

    if (paramTypes.length !== 1) {
      throw new SetupError(
        `Query handler ${target.constructor.name}.${key} must receive one parameter`,
      );
    }

    const queryType = paramTypes[0];

    if (!(queryType.prototype instanceof Query)) {
      throw new SetupError(
        `Parameter of Query Handler ${target.constructor.name}.${key} must be a Query subclass`,
      );
    }

    if (queryType === Query) {
      throw new SetupError(
        `Query handler ${target.constructor.name}.${key} must no listen to generic huery`,
      );
    }

    const queryHandlers: QueryHandlerData[] =
      Reflect.getMetadata("queryHandlers", target.constructor) || [];

    queryHandlers.push({
      queryType,
      key,
    });

    Reflect.defineMetadata("queryHandlers", queryHandlers, target.constructor);
  };
}
