import Event from "shared/domain/Event";

type EventListener = (event: Event<any>) => void | Promise<void>;

export default EventListener;
