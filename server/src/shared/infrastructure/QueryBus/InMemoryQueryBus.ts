import Query from "shared/domain/Query";
import QueryBus from "shared/domain/QueryBus";
import QueryType from "shared/types/QueryType";
import { InternalServerError } from "shared/exceptions/CustomRequestErrors";
import SetupError from "shared/exceptions/SetupError";
import QueryHandler from "shared/types/QueryHandlerFN";
import QueryResult from "shared/types/QueryResult";
import Injectable from "shared/decorators/Injectable";

@Injectable("QueryBus")
export default class InMemoryQueryBus implements QueryBus {
  private readonly handlers: Map<QueryType, QueryHandler> = new Map();

  constructor() {}

  public registerHandler(queryType: QueryType, handler: QueryHandler): void {
    if (this.handlers.has(queryType)) {
      throw new SetupError(
        `There is already a handler registered for the query type ${queryType.name}.`,
      );
    }

    this.handlers.set(queryType, handler);
  }

  public async ask<Q extends Query<any, any>>(
    query: Q,
  ): Promise<QueryResult<Q>> {
    const queryType: QueryType = query.constructor as QueryType;

    if (!this.handlers.has(queryType)) {
      throw new SetupError(
        `There is not a handler registered for the query type ${queryType.name}.`,
      );
    }

    const handler = this.handlers.get(queryType);

    try {
      const result = await handler(query);

      return result;
    } catch (err) {
      throw new InternalServerError(
        `Error handling query ${queryType.name}: ${err.message}`,
      );
    }
  }
}
