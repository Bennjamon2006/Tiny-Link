import { Logger, format, transports } from "winston";

export default class WinstonLogger {
  private readonly logger: Logger;

  constructor(origin: string) {
    this.logger = new Logger({
      defaultMeta: { service: origin },
      format: format.combine(
        format.timestamp(),
        format.colorize({
          colors: {
            info: "cyan",
            error: "red",
            warn: "yellow",
          },
        }),
        format.printf(({ timestamp, level, message }) => {
          return `${timestamp} (${origin}) [${level}]: ${message}`;
        }),
      ),
      transports: [new transports.Console()],
    });
  }

  log(message: string): void {
    this.logger.log("info", message);
  }

  error(message: string): void {
    this.logger.log("error", message);
  }

  warn(message: string): void {
    this.logger.log("warn", message);
  }

  info(message: string): void {
    this.logger.log("info", message);
  }

  debug(message: string): void {
    this.logger.log("debug", message);
  }

  verbose(message: string): void {
    this.logger.log("verbose", message);
  }
}
