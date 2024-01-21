import { MailjetFactory } from "@/libs/mailjet";
import * as allTemplates from "./templates";

type SendArgs<Key extends keyof typeof allTemplates> = {
  to: string;
  templateKey: Key;
  data: Parameters<(typeof allTemplates)[Key]["html"]>[0];
};

class MailService {
  private api: MailjetFactory;

  constructor() {
    this.api = new MailjetFactory(
      process.env.MAILJET_API_KEY!,
      process.env.MAILJET_SECRET_KEY!,
      process.env.MAIL_SENDER_EMAIL!,
      process.env.MAIL_SENDER_NAME!
    );
  }

  async sendMail<Key extends keyof typeof allTemplates>(args: SendArgs<Key>) {
    const { data, templateKey, to } = args;

    const { html, ...rest } = allTemplates[templateKey];

    return await this.api.send({
      ...rest,
      html: html(data),
      to,
    });
  }
}

export const mailService = new MailService();
