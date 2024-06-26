import { PublicPageUrls } from "@/const";
import { footerMailPart, headMailPart } from "./partials";

const html = (args: { name: string; token: string }) => `
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
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                max-width: 680px;
                background-color: #fff;
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
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        color: #000;
                        width: 680px;
                        margin: 0 auto;
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
                                    padding-left: 60px;
                                    padding-right: 60px;
                                    padding-top: 40px;
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
                                        max-width: 450px;
                                        margin: 0 auto;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          font-size: 12px;
                                          text-align: center;
                                          mso-line-height-alt: 21.6px;
                                        "
                                      >
                                        <span style="color: #000000"
                                          ><strong
                                            ><span style="font-size: 24px"
                                              >Welcome ${args.name}!</span
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
                                    padding-left: 60px;
                                    padding-right: 60px;
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
                                        max-width: 450px;
                                        margin: 0 auto;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          font-size: 14px;
                                          text-align: center;
                                          mso-line-height-alt: 28.8px;
                                        "
                                      >
                                        <span
                                          style="
                                            font-size: 16px;
                                            color: #6b7489;
                                          "
                                          >Congratulations and welcome to Our
                                          Platform! We're thrilled to have you
                                          on board, and we appreciate you
                                          choosing us.</span
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
                              class="button_block block-3"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad" style="text-align: center">
                                  <div
                                    align="center"
                                    class="alignment"
                                    style="padding: 0 30px"
                                  >
                                    <a
                                      href="${
                                        process.env.FRONTEND_URL
                                      }${PublicPageUrls.verify(args.token)}"
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
                                        max-width: 450px;
                                        margin: 0 auto;
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
                                          >Verify your email</span
                                        ></span
                                      ></a
                                    >
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="text_block block-4"
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
                                  class="pad"
                                  style="
                                    padding-bottom: 30px;
                                    padding-left: 10px;
                                    padding-right: 10px;
                                    padding-top: 25px;
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
                                          font-size: 16px;
                                          text-align: center;
                                          mso-line-height-alt: 28.8px;
                                        "
                                      >
                                        <span style="color: #6b7489"
                                          >Thank you!</span
                                        >
                                      </p>
                                      <p
                                        style="
                                          margin: 0;
                                          font-size: 16px;
                                          text-align: center;
                                          mso-line-height-alt: 28.8px;
                                        "
                                      >
                                        <span style="color: #6b7489"
                                          >Job Boards Team</span
                                        >
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
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

const text = `Welcome to Joab Boards!`;
const subject = `Welcome to Joab Boards!`;

export const welcomeTemplate = {
  subject,
  html,
  text,
};
