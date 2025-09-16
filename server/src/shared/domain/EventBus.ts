import EventListener from "shared/types/EventListener";
import Event from "./Event";
import EventType from "shared/types/EventType";

export default interface EventBus {
  registerListener(eventType: EventType, listener: EventListener): void;
  emit(event: Event<any>): Promise<void>;
  emitSync(event: Event<any>): void;
}
