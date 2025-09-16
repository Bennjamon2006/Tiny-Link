export default class SetupError extends Error {
  constructor(message: string) {
    super(`SetupError: ${message}`);
    this.name = "SetupError";
  }
}
