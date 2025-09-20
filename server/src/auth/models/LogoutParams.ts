import { ExposedSession } from "./Session.dto";

type LogoutParams = {
  authenticatedSession: ExposedSession;
  sessionId: string;
};

export default LogoutParams;
