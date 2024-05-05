import { PublicPageUrls } from "@/const";
import { footerMailPart, headMailPart, thanksMailPart } from "./partials";

type Args = {
  token: string;
  inviterName: string;
};

const html = (args: Args) => `
<!DOCTYPE html>

<html
  lang="en"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:v="urn:schemas-microsoft-com:vml"
>

  ${headMailPart}

  <body
    style="
      margin: 0;
      background-color: #fafafa;
      padding: 0;
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
    "
  >
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      class="nl-container"
      role="presentation"
      style="
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        background-color: #fafafa;
        background-image: none;
        background-position: top left;
        background-size: auto;
        background-repeat: no-repeat;
      "
      width="100%"
    >
      <tbody>
        <tr>
          <td>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-2"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        color: #000;
                        width: 680px;
                        margin: 0 auto;
                        background-color: #fff;
                      "
                      width="680"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="text_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td
                                  class="pad title"
                                  style="
                                    padding-left: 45px;
                                    padding-right: 45px;
                                    padding-top: 30px;
                                  "
                                >
                                  <div style="font-family: sans-serif">
                                    <div
                                      class=""
                                      style="
                                        font-size: 12px;
                                        font-family: Arial, 'Helvetica Neue',
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 21.6px;
                                        color: #555555;
                                        line-height: 1.5;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          font-size: 12px;
                                          mso-line-height-alt: 21.6px;
                                        "
                                      >
                                        <span style="color: #000000"
                                          ><strong
                                            ><span style="font-size: 24px"
                                              >Invitation to Job Board!</span
                                            ></strong
                                          ></span
                                        >
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>

                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="text_block block-2"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td
                                  class="pad content"
                                  style="
                                    padding-bottom: 30px;
                                    padding-left: 45px;
                                    padding-right: 45px;
                                    padding-top: 15px;
                                  "
                                >
                                  <div style="font-family: sans-serif">
                                    <div
                                      class=""
                                      style="
                                        font-size: 12px;
                                        font-family: Arial, 'Helvetica Neue',
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 21.6px;
                                        color: #555555;
                                        line-height: 1.8;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          font-size: 14px;
                                          mso-line-height-alt: 28.8px;
                                        "
                                      >
                                        <span
                                          style="
                                            font-size: 16px;
                                            color: #6b7489;
                                          "
                                        >
                                          <strong style="color: #356bf6">
                                            ${args.inviterName}</strong
                                          >
                                          invites you to join tp Job Boards administrators team<br />
                                          Just click the link below to configure your account
                                          and start your journey.
                                          <br />
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="button_block block-3"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td
                                  class="pad content"
                                  style="padding-left: 45px"
                                >
                                  <div>
                                    <a
                                      href="${
                                        process.env.FRONTEND_URL
                                      }/${PublicPageUrls.invite(args.token)}"
                                      style="
                                        text-decoration: none;
                                        display: block;
                                        color: #ffffff;
                                        background-color: #356bf6;
                                        border-radius: 8px;
                                        border-top: 0px solid transparent;
                                        font-weight: undefined;
                                        border-right: 0px solid transparent;
                                        border-bottom: 0px solid transparent;
                                        border-left: 0px solid transparent;
                                        padding-top: 5px;
                                        padding-bottom: 5px;
                                        font-family: Arial, 'Helvetica Neue',
                                          Helvetica, sans-serif;
                                        font-size: 16px;
                                        text-align: center;
                                        mso-border-alt: none;
                                        word-break: keep-all;
                                        max-width: 200px;
                                      "
                                      target="_blank"
                                      ><span
                                        style="
                                          padding-left: 20px;
                                          padding-right: 20px;
                                          font-size: 16px;
                                          display: inline-block;
                                          letter-spacing: normal;
                                        "
                                        ><span
                                          style="
                                            margin: 0;
                                            word-break: break-word;
                                            line-height: 32px;
                                          "
                                          >Create your account</span
                                        ></span
                                      ></a
                                    >
                                  </div>
                                </td>
                              </tr>
                            </table>
                            ${thanksMailPart}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>

            ${footerMailPart}

          </td>
        </tr>
      </tbody>
    </table>

    <!-- End -->
  </body>
</html>

`;

const text = `Invite to Job Boards`;
const subject = `Invite to Job Boards`;

export const inviteAdminTemplate = {
  subject,
  html,
  text,
};
