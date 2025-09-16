import Token from "../types/Token";

export default function Injectable(token?: Token): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata("token", token || target, target);
  };
}
