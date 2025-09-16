import Request from "shared/classes/Request";
import Response from "shared/classes/Response";

type Handler = (req: Request) => Response | Promise<Response>;

export default Handler;
