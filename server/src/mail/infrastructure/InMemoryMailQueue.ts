import MailPort from "mail/domain/MailPort";
import MailQueue from "mail/domain/MailQueue";
import { MailToSend } from "mail/models/Mail.dto";
import Inject from "shared/decorators/Inject";
import Injectable from "shared/decorators/Injectable";
import Logger from "shared/domain/Logger";

@Injectable("MailQueue")
export default class InMemoryMailQueue implements MailQueue {
  private readonly maxParallel = 5;

  private readonly maxTries = 10;

  private readonly timeout = 5000;

  private readonly warnLimit = 30;

  private pending = 0;

  private readonly queue: MailToSend[] = [];

  private readonly tries: Map<string, number> = new Map();

  private failed = 0;

  constructor(
    @Inject("Mail.MailPort") private readonly mailPort: MailPort,
    @Inject("Mail.Logger") private readonly logger: Logger,
  ) {}

  public push(mail: MailToSend): void {
    this.queue.push(mail);

    this.trySend();
  }

  private trySend(): void {
    if (this.pending >= this.maxParallel || this.queue.length === 0) {
      return;
    }

    const mail = this.queue.shift();

    setTimeout(() => {
      Promise.race([
        this.mailPort.sendMail(mail),
        new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error("Mail sent timeout exceded"));
          }, this.timeout);
        }),
      ])
        .then(() => {
          this.failed = 0;
        })
        .catch((err) => {
          this.failed++;

          if (this.failed >= this.warnLimit) {
            this.logger.warn("Mail port likwely down");
          }

          const tries = this.tries.get(mail.id) || 0;

          this.logger.error(
            `Error sending mail ${mail.type} #${mail.id}: ${err.message}`,
          );

          if (tries < this.maxTries) {
            this.tries.set(mail.id, tries + 1);

            this.queue.push(mail);
          } else {
            this.tries.delete(mail.id);
          }
        })
        .finally(() => {
          this.pending--;
          this.trySend();
        });

      this.pending++;
    }, this.getBackoff());
  }

  private getBackoff() {
    return this.failed ? Math.min(60_000, 500 * 1.5 ** this.failed) : 0;
  }
}
