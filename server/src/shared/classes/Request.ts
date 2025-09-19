import { ExposedSession } from "auth/models/Session.dto";

export default class Request {
  public session?: ExposedSession;

  constructor(
    public body: any,
    public query: any,
    public params: any,
    public headers: any,
    public method: string,
    public url: string,
    public ip: string,
  ) {}
}
