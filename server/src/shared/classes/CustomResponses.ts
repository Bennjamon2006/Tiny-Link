import Response from "./Response";

export class Ok extends Response {
  constructor(data: any, headers?: Record<string, string>) {
    super(200, data, headers);
  }
}

export class Created extends Response {
  constructor(data: any, headers?: Record<string, string>) {
    super(201, data, headers);
  }
}

export class NoContent extends Response {
  constructor(headers?: Record<string, string>) {
    super(204, null, headers);
  }
}
