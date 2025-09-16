import Token from "shared/types/Token";
import Injection from "../types/Injection";

export default function Inject(token: Token): ParameterDecorator {
  return (target, key, index) => {
    const injections: Injection[] =
      Reflect.getMetadata("injections", target, key) || [];

    injections.push({
      index,
      token,
    });

    Reflect.defineMetadata("injections", injections, target, key);
  };
}
