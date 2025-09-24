import Mail from "mail/domain/Mail";

export type MailData<T> = Omit<Mail<T>, "getTemplateClass">;

export type NoSubjectMailData<T> = Omit<MailData<T>, "subject">;

export type MailToSend = Omit<Mail<any>, "getTemplateClass" | "data"> & {
  body: string;
};
