import QueryHandlerData from "shared/types/QueryHandlerData";

export default function QueryHandler(): ClassDecorator {
  return (target) => {
    const queryHandlers: QueryHandlerData[] =
      Reflect.getMetadata("queryHandlers", target) || [];

    Reflect.defineMetadata("queryHandlers", queryHandlers, target);
  };
}
