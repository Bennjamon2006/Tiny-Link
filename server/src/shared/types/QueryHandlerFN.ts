import Query from "shared/domain/Query";

type QueryHandler = (query: Query<any, any>) => any;

export default QueryHandler;
