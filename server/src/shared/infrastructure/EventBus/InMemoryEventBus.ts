import Injectable from "shared/decorators/Injectable";
import Event from "shared/domain/Event";
import EventBus from "shared/domain/EventBus";
import { InternalServerError } from "shared/exceptions/CustomRequestErrors";
import EventListener from "shared/types/EventListener";
import EventType from "shared/types/EventType";

@Injectable("EventBus")
export default class InMemoryEventBus implements EventBus {
  constructor() {}

  private readonly listeners: Map<EventType, EventListener[]> = new Map();

  public registerListener(eventType: EventType, listener: EventListener): void {
    const registeredListeners = this.listeners.get(eventType) || [];

    registeredListeners.push(listener);

    this.listeners.set(eventType, registeredListeners);
  }

  public async emit(event: Event<any>): Promise<void> {
    const eventType: EventType = event.constructor as EventType;

    const listeners = this.listeners.get(eventType) || [];

    try {
      await Promise.all(listeners.map((listener) => listener(event)));
    } catch (err) {
      throw new InternalServerError(
        `Error emitting event ${eventType.name}: ${err.message}`,
      );
    }
  }

  public emitSync(event: Event<any>): void {
    const eventType: EventType = event.constructor as EventType;

    const listeners = this.listeners.get(eventType) || [];

    for (const listener of listeners) {
      const prom = listener(event);

      if (prom instanceof Promise) {
        prom.catch((err) => {
          throw new InternalServerError(
            `Error emitting event ${eventType.name}: ${err.message}`,
          );
        });
      }
    }
  }
}
