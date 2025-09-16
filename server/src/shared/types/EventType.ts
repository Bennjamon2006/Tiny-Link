import Constructor from "./Constructor";
import Event from "shared/domain/Event";

type EventType = Constructor<Event<any>>;

export default EventType;
