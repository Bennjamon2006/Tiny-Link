import QueryHandler from "shared/types/QueryHandlerFN";
import QueryType from "shared/types/QueryType";
import Query from "./Query";
import QueryResult from "shared/types/QueryResult";

export default interface QueryBus {
  registerHandler(queryType: QueryType, handler: QueryHandler): void;
  ask<Q extends Query<any, any>>(query: Q): Promise<QueryResult<Q>>;
}
