import Dependency from "./Dependency";
import Token from "./Token";

type UnresolvedTokenData = {
  dependency: Dependency<any>;
};

type UnresolvedDependencyData = {
  token: Token<any>;
};

type UnresolvedData = UnresolvedTokenData | UnresolvedDependencyData;

export default UnresolvedData;
