import Query from "shared/domain/Query";

type QueryResult<Q extends Query<any, any>> =
  Q extends Query<any, infer R> ? R : never;

export default QueryResult;
