import SetupError from "./SetupError";
import Token from "shared/types/Token";
import Dependency from "shared/types/Dependency";
import UnresolvedData from "shared/types/UnresolvedData";

export default class UnresolvedError extends SetupError {
  dependency?: Dependency<any>;

  token?: Token<any>;

  constructor(message: string, data?: UnresolvedData) {
    super(`UnresolvedError: ${message}`);
    this.name = "UnresolvedError";

    if (data) {
      if ("dependency" in data) {
        this.dependency = data.dependency;
      } else if ("token" in data) {
        this.token = data.token;
      }
    }
  }
}
