import ListenerData from "shared/types/ListenerData";

export default function EventWatcher(): ClassDecorator {
  return (target) => {
    const listeners: ListenerData[] =
      Reflect.getMetadata("listeners", target) || [];

    Reflect.defineMetadata("listeners", listeners, target);
  };
}
