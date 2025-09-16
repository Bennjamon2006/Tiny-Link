import EventWatcher from "shared/decorators/EventWatcher";
import OnEvent from "shared/decorators/OnEvent";
import UserCreatedEvent from "users/events/UserCreatedEvent";

@EventWatcher()
export default class UsersEventWatcher {
  constructor() {}

  @OnEvent()
  public onUserCreated(event: UserCreatedEvent) {
    console.log(`User #${event.payload.id} created: ${event.payload.username}`);
  }
}
