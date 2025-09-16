import Constructor from "./Constructor";

type Token<T = any> = Constructor<T> | string;

export default Token;
