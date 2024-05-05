export const headMailPart = `
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
`;
