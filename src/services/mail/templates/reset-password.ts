import { PublicPageUrls } from "@/const";

type Args = {
  token: string;
};

const html = (args: Args) => `
<!DOCTYPE html>

<html
  lang="en"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:v="urn:schemas-microsoft-com:vml"
>
  <head>
    <title></title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <!--[if mso
      ]><xml
        ><o:OfficeDocumentSettings
          ><o:PixelsPerInch>96</o:PixelsPerInch
          ><o:AllowPNG /></o:OfficeDocumentSettings></xml
    ><![endif]-->
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: inherit !important;
      }

      #MessageViewBody a {
        color: inherit;
        text-decoration: none;
      }

      p {
        line-height: inherit;
      }

      .desktop_hide,
      .desktop_hide table {
        mso-hide: all;
        display: none;
        max-height: 0px;
        overflow: hidden;
      }

      .image_block img + div {
        display: none;
      }

      @media (prefers-color-scheme: dark) {
        .logo-light {
          display: none;
        }
        .logo-dark {
          display: block;
        }
      }

      @media (max-width: 700px) {
        .desktop_hide table.icons-inner,
        .social_block.desktop_hide .social-table {
          display: inline-block !important;
        }

        .row-5 .column-1 .block-1.image_block img {
          margin: 0 auto;
        }

        .icons-inner {
          text-align: center;
        }

        .icons-inner td {
          margin: 0 auto;
        }

        .mobile_hide {
          display: none;
        }

        .title {
          padding-top: 30px !important;
          padding-right: 30px !important;
          padding-left: 30px !important;
        }

        .content {
          padding-top: 15px !important;
          padding-right: 30px !important;
          padding-left: 30px !important;
          padding-bottom: 30px !important;
        }

        .row-content {
          width: 100% !important;
        }

        .stack .column {
          width: 100%;
          display: block;
        }

        .mobile_hide {
          min-height: 0;
          max-height: 0;
          max-width: 0;
          overflow: hidden;
          font-size: 0px;
        }

        .desktop_hide,
        .desktop_hide table {
          display: table !important;
          max-height: none !important;
        }

        .row-3 .column-1 .block-3.text_block td.pad {
          padding: 10px 0 5px !important;
        }

        .row-3 .column-1 .block-2.text_block td.pad {
          padding: 10px 10px 10px 0 !important;
        }

        .row-3 .column-1 .block-1.divider_block td.pad {
          padding: 0 10px 0 0 !important;
        }

        .row-3 .column-1 .block-1.divider_block .alignment table,
        .row-4 .column-1 .block-2.divider_block .alignment table {
          display: inline-table;
        }

        .row-3 .column-2 .block-1.text_block td.pad {
          padding: 0 10px 5px 35px !important;
        }

        .row-3 .column-2 .block-2.paragraph_block td.pad {
          padding: 10px 10px 5px 35px !important;
        }

        .row-5 .column-1 .block-1.image_block td.pad {
          padding: 3px 0 0 !important;
        }

        .row-5 .column-1 .block-1.image_block .alignment {
          text-align: center !important;
        }

        .row-4 .column-1 .block-2.divider_block td.pad {
          padding: 20px 35px 0 0 !important;
        }

        .row-5 .column-2 .block-1.text_block td.pad {
          padding: 4px 45px 15px 50px !important;
        }

        .row-3 .column-2 .block-3.list_block td.pad {
          padding: 10px 10px 10px 35px !important;
        }

        .row-3 .column-2 .block-3.list_block ul {
          line-height: auto !important;
        }

        .row-3 .column-1 {
          padding: 21px 30px 5px !important;
        }

        .row-4 .column-1 {
          padding: 5px 0 0 35px !important;
        }

        .row-5 .column-1 {
          padding: 15px 35px !important;
        }
      }
    </style>
  </head>
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
                                              >Reset your password</span
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
                                          We received a request to reset the
                                          password for your account. <br />
                                          If you did not make this request,
                                          please ignore this email. Otherwise,
                                          you can reset your password by
                                          clicking the button below.
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
                                    <!--[if mso]>
																			<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://app.agenttrainer.ai/login" style="height:42px;width:442px;v-text-anchor:middle;" arcsize="20%" stroke="false" fillcolor="#356bf6">
																				<w:anchorlock/>
																				<v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px">
																					<![endif]-->

                                    <a
                                      href=${
                                        process.env.FRONTEND_URL
                                      }${PublicPageUrls.resetPasswordToken(
  args.token
)}
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
                                          >Reset password</span
                                        ></span
                                      ></a
                                    >
                                    <!--[if mso]>
																		</center>
																	</v:textbox>
																</v:roundrect>
																<![endif]-->
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
                                  class="pad content"
                                  style="
                                    padding-bottom: 30px;
                                    padding-left: 45px;
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
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-4"
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
                        background-color: #fafafa;
                        color: #000;
                        border-bottom: 0 solid #e4eaf9;
                        border-left: 0 solid #e4eaf9;
                        border-right: 0px solid #e4eaf9;
                        border-top: 0 solid #e4eaf9;
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
                              padding-left: 45px;
                              padding-top: 5px;
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
                              class="divider_block block-2"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="padding-right: 45px; padding-top: 20px"
                                >
                                  <div align="center" class="alignment">
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          class="divider_inner"
                                          style="
                                            font-size: 1px;
                                            line-height: 1px;
                                            border-top: 1px solid #c1c1c1;
                                          "
                                        >
                                          <span> </span>
                                        </td>
                                      </tr>
                                    </table>
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
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-5"
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
                        background-color: #fafafa;
                        color: #000;
                        border-bottom: 0 solid #505d74;
                        border-left: 0 solid #505d74;
                        border-right: 0px solid #505d74;
                        border-top: 0 solid #505d74;
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
                              padding-bottom: 15px;
                              padding-left: 45px;
                              padding-right: 45px;
                              padding-top: 15px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="66.66666666666667%"
                          >
                          </td>
                          <td
                            class="column column-2"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="33.333333333333336%"
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
                                  class="pad"
                                  style="
                                    padding-bottom: 15px;
                                    padding-right: 45px;
                                    padding-top: 19px;
                                  "
                                >
                                  <div style="font-family: sans-serif">
                                    <div
                                      class=""
                                      style="
                                        font-size: 12px;
                                        font-family: Arial, 'Helvetica Neue',
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 14.399999999999999px;
                                        color: #555555;
                                        line-height: 1.2;
                                      "
                                    >
                                      <p
                                      style="
                                        margin: 0;
                                        font-size: 14px;
                                        text-align: center;
                                        mso-line-height-alt: 16.8px;
                                      "
                                    >
                                      <span
                                        style="
                                          font-size: 12px;
                                          color: #8f98ac;
                                        "
                                        >2024 © Copyrights Job Boards</span
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
          </td>
        </tr>
      </tbody>
    </table>
    <!-- End -->
  </body>
</html>
`;

const text = `Request to change password`;
const subject = `Request to change password`;

export const resetPasswordTemplate = {
  subject,
  html,
  text,
};
