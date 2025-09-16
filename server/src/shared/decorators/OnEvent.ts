import SetupError from "shared/exceptions/SetupError";
import EventType from "shared/types/EventType";
import Event from "shared/domain/Event";
import ListenerData from "shared/types/ListenerData";

export default function OnEvent(): MethodDecorator {
  return (target, key: string) => {
    const paramTypes: [EventType] = Reflect.getMetadata(
      "design:paramtypes",
      target,
      key,
    );

    if (paramTypes.length !== 1) {
      throw new SetupError(
        `Event listener ${target.constructor.name}.${key} must receive one parameter`,
      );
    }

    const eventType = paramTypes[0];

    if (!(eventType.prototype instanceof Event)) {
      throw new SetupError(
        `Parameter of event listener ${target.constructor.name}.${key} must be a event subclass`,
      );
    }

    if (eventType === Event) {
      throw new SetupError(
        `Event listener ${target.constructor.name}.${key} must no listen to generic event`,
      );
    }

    const listeners: ListenerData[] =
      Reflect.getMetadata("listeners", target.constructor) || [];

    listeners.push({
      eventType,
      key,
    });

    Reflect.defineMetadata("listeners", listeners, target.constructor);
  };
}
