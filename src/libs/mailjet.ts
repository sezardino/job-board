import Mailjet from "node-mailjet";

type SendArgs = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export class MailjetFactory {
  private api: Mailjet;
  private fromEmail: string;
  private fromName: string;

  constructor(
    key: string,
    secret: string,
    fromEmail: string,
    fromName: string
  ) {
    this.api = new Mailjet({ apiKey: key, apiSecret: secret });
    this.fromEmail = fromEmail;
    this.fromName = fromName;
  }

  async send(args: SendArgs) {
    const { to, subject, text, html } = args;

    try {
      return await this.api.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: this.fromEmail,
              Name: this.fromName,
            },
            To: [
              {
                Email: to,
                Name: to,
              },
            ],
            Subject: subject,
            TextPart: text,
            HTMLPart: html,
            CustomID: crypto.randomUUID(),
          },
        ],
      });
    } catch (error) {
      return error;
    }
  }
}
