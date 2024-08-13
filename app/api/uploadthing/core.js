import { createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { cookies } from "next/headers";
import { UploadRegistrationData } from "@/app/lib/UploadRegistrationData";
import { Resend } from "resend";
import { CounterAPI } from "counterapi";
import { UploadRegistrationDataPassive } from "@/app/lib/UploadRegistrationDataPassive";
const counter = new CounterAPI();

const f = createUploadthing();
// Fake auth function
const resend = new Resend(process.env.RESEND_API_KEY);

export const FileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "3MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      const regCookie = cookies().get("registrationData").value;
      const regData = JSON.parse(Buffer.from(regCookie, "base64").toString());

      return { regCookie, regData };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        console.log(metadata.regData?.passiveDelegate);
        if (metadata.regData?.passiveDelegate) {
          let counterRes = await counter.up("kritikmc", "passiveDelegates");
          if (counterRes.Count <= 500) {
            await counter.set("kritikmc", "passiveDelegates", 500);
            counterRes = await counter.up("kritikmc", "passiveDelegates");
          }
          const delegateId = `KPD-${String(counterRes.Count).padStart(4, "0")}`;
          metadata.regData.delegateId = delegateId;
          console.log("Uploaded File:  ", file);
          /////////////////////////////////////////////////////
          // Send an email to user
          /////////////////////////////////////////////////////
          const dataUploaded = await UploadRegistrationDataPassive(
            metadata.regData,
            file.url
          );
          const {
            studentEmail,
            studentName,
            studentNumber,
            isKmcStudent,
            isPgStudent,
          } = metadata.regData;
          const email = await resend.emails.send({
            from: `registrations@kritikmc.com`,
            to: `${studentEmail}`,
            subject: "🎉 Thanks for Registering for kriti by KMC Warangal!",
            html: `<!DOCTYPE HTML
            PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
            xmlns:o="urn:schemas-microsoft-com:office:office">
  
          <head>
            <!--[if gte mso 9]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="x-apple-disable-message-reformatting">
            <!--[if !mso]><!-->
            <meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
            <title></title>
  
            <style type="text/css">
              @media only screen and (min-width: 620px) {
                .u-row {
                  width: 600px !important;
                }
  
                .u-row .u-col {
                  vertical-align: top;
                }
  
                .u-row .u-col-100 {
                  width: 600px !important;
                }
  
              }
  
              @media (max-width: 620px) {
                .u-row-container {
                  max-width: 100% !important;
                  padding-left: 0px !important;
                  padding-right: 0px !important;
                }
  
                .u-row .u-col {
                  min-width: 320px !important;
                  max-width: 100% !important;
                  display: block !important;
                }
  
                .u-row {
                  width: 100% !important;
                }
  
                .u-col {
                  width: 100% !important;
                }
  
                .u-col>div {
                  margin: 0 auto;
                }
              }
  
              body {
                margin: 0;
                padding: 0;
              }
  
              table,
              tr,
              td {
                vertical-align: top;
                border-collapse: collapse;
              }
  
              p {
                margin: 0;
              }
  
              .ie-container table,
              .mso-container table {
                table-layout: fixed;
              }
  
              * {
                line-height: inherit;
              }
  
              a[x-apple-data-detectors='true'] {
                color: inherit !important;
                text-decoration: none !important;
              }
  
              table,
              td {
                color: #000000;
              }
  
              #u_body a {
                color: #0000ee;
                text-decoration: underline;
              }
  
              #u_content_text_4 a {
                color: #f1c40f;
              }
  
              @media (max-width: 480px) {
                #u_content_image_2 .v-src-width {
                  width: auto !important;
                }
  
                #u_content_image_2 .v-src-max-width {
                  max-width: 25% !important;
                }
  
                #u_content_text_3 .v-container-padding-padding {
                  padding: 10px 20px 20px !important;
                }
  
                #u_content_text_4 .v-container-padding-padding {
                  padding: 60px 20px !important;
                }
  
                #u_content_text_5 .v-container-padding-padding {
                  padding: 10px 20px 30px !important;
                }
  
                #u_content_text_5 .v-text-align {
                  text-align: center !important;
                }
              }
            </style>
  
            <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css">
            <!--<![endif]-->
  
          </head>
  
          <body class="clean-body u_body"
            style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #000000;color: #000000">
            <!--[if IE]><div class="ie-container"><![endif]-->
            <!--[if mso]><div class="mso-container"><![endif]-->
            <table id="u_body"
              style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #000000;width:100%"
              cellpadding="0" cellspacing="0">
              <tbody>
                <tr style="vertical-align: top">
                  <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #000000;"><![endif]-->
  
                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                      <div class="u-row"
                        style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div
                          style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  
                          <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                          <div class="u-col u-col-100"
                            style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                            <div style="height: 100%;width: 100% !important;">
                              <!--[if (!mso)&(!IE)]><!-->
                              <div
                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                <!--<![endif]-->
  
                                <table id="u_content_image_2" style="font-family:'Open Sans',sans-serif;" role="presentation"
                                  cellpadding="0" cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td class="v-container-padding-padding"
                                        style="overflow-wrap:break-word;word-break:break-word;padding:120px 10px 100px;font-family:'Open Sans',sans-serif;"
                                        align="left">
  
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                          <tr>
                                            <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
  
                                              <img align="center" border="0" src="https://www.kritikmc.com/kmc_mail_logo.jpeg"
                                                alt="Logo" title="Logo"
                                                style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 47%;max-width: 272.6px;"
                                                width="272.6" class="v-src-width v-src-max-width" />
  
                                            </td>
                                          </tr>
                                        </table>
  
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
  
                                <!--[if (!mso)&(!IE)]><!-->
                              </div><!--<![endif]-->
                            </div>
                          </div>
                          <!--[if (mso)|(IE)]></td><![endif]-->
                          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                        </div>
                      </div>
                    </div>
  
                    <!--[if gte mso 9]>
                <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;min-width: 320px;max-width: 600px;">
                  <tr>
                    <td background="https://cdn.templates.unlayer.com/assets/1662456088977-back2.png" valign="top" width="100%">
                <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 600px;">
                  <v:fill type="frame" src="https://cdn.templates.unlayer.com/assets/1662456088977-back2.png" /><v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
                <![endif]-->
  
                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                      <div class="u-row"
                        style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div
                          style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-image: url('images/image-5.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;">
                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-image: url('images/image-5.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;"><![endif]-->
  
                          <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                          <div class="u-col u-col-100"
                            style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                            <div
                              style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                              <!--[if (!mso)&(!IE)]><!-->
                              <div
                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                <!--<![endif]-->
  
                                <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0"
                                  cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td class="v-container-padding-padding"
                                        style="overflow-wrap:break-word;word-break:break-word;padding:60px 10px 10px;font-family:'Open Sans',sans-serif;"
                                        align="left">
  
                                        <div class="v-text-align"
                                          style="font-size: 14px; line-height: 170%; text-align: center; word-wrap: break-word;">
                                          <p style="font-size: 14px; line-height: 170%;"><span
                                              style="font-size: 20px; line-height: 34px;"><strong><span
                                                  style="line-height: 34px; font-size: 20px;">Hi ${studentName},</span></strong></span>
                                          </p>
                                        </div>
  
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
  
                                <table id="u_content_text_3" style="font-family:'Open Sans',sans-serif;" role="presentation"
                                  cellpadding="0" cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td class="v-container-padding-padding"
                                        style="overflow-wrap:break-word;word-break:break-word;padding:10px 100px 50px;font-family:'Open Sans',sans-serif;"
                                        align="left">
  
                                        <div class="v-text-align"
                                          style="font-size: 14px; line-height: 170%; text-align: center; word-wrap: break-word;">
                                          <p style="line-height: 170%;"><span style="font-size: 16px; line-height: 27.2px;">Thank
                                              you for registering for kriti.</span></p>
                                          <p style="line-height: 170%;"><span style="font-size: 16px; line-height: 27.2px;">Your
                                              registering request was recieved and you will be informed when confirmed.</span></p>
                                          <p style="line-height: 170%;">  </p>
                                          <p style="line-height: 170%;"><span style="font-size: 16px; line-height: 27.2px;">Till
                                              then keep the info below handy!</span></p>
                                        </div>
  
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
  
                                <!--[if (!mso)&(!IE)]><!-->
                              </div><!--<![endif]-->
                            </div>
                          </div>
                          <!--[if (mso)|(IE)]></td><![endif]-->
                          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                        </div>
                      </div>
                    </div>
  
                    <!--[if gte mso 9]>
                </v:textbox></v:rect>
              </td>
              </tr>
              </table>
              <![endif]-->
  
                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                      <div class="u-row"
                        style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div
                          style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  
                          <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #000000;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                          <div class="u-col u-col-100"
                            style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                            <div
                              style="background-color: #000000;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                              <!--[if (!mso)&(!IE)]><!-->
                              <div
                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                <!--<![endif]-->
  
                                <table id="u_content_text_4" style="font-family:'Open Sans',sans-serif;" role="presentation"
                                  cellpadding="0" cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td class="v-container-padding-padding"
                                        style="overflow-wrap:break-word;word-break:break-word;padding:60px 80px;font-family:'Open Sans',sans-serif;"
                                        align="left">
  
                                        <div class="v-text-align"
                                          style="font-size: 14px; color: #ffffff; line-height: 170%; text-align: center; word-wrap: break-word;">
                                          <p style="font-size: 14px; line-height: 170%; text-align: left;"><strong>{</strong></p>
                                          <p style="font-size: 14px; line-height: 170%; text-align: left;"><strong>Delegate ID:
                                            </strong>${delegateId}</p>
                                          <p style="font-size: 14px; line-height: 170%; text-align: left;"><strong>Name: </strong>
                                            ${studentName}</p>
                                          <p style="font-size: 14px; line-height: 170%; text-align: left;"><strong>Email Id:
                                            </strong>${studentEmail}<a
                                              href="https://www.kritikmc.com/_next/image?url=%2Fkriti_logo_dark.png&w=640&q=75"></a>
                                          </p>
                                          <p style="font-size: 14px; line-height: 170%; text-align: left;"><strong>Mobile No. :
                                            </strong>${studentNumber}</p>
                                          <p style="font-size: 14px; line-height: 170%; text-align: left;"><strong>Registration
                                              Fee: </strong>₹200</p>
                                          <p style="font-size: 14px; line-height: 170%; text-align: left;"><strong>Payment
                                              Screenshot Link: </strong>${file.url}</p>
                                          <p style="font-size: 14px; line-height: 170%; text-align: left;"></p>
                                          <p style="font-size: 14px; line-height: 170%; text-align: left;">Events: Can watch all events ✨✨ <strong>}</strong></p>
                                          <p style="font-size: 14px; line-height: 170%; text-align: left;"> </p>
                                        </div>
  
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
  
                                <!--[if (!mso)&(!IE)]><!-->
                              </div><!--<![endif]-->
                            </div>
                          </div>
                          <!--[if (mso)|(IE)]></td><![endif]-->
                          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                        </div>
                      </div>
                    </div>
  
                    <!--[if gte mso 9]>
                <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;min-width: 320px;max-width: 600px;">
                  <tr>
                    <td background="https://cdn.templates.unlayer.com/assets/1662456866997-back2.png" valign="top" width="100%">
                <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 600px;">
                  <v:fill type="frame" src="https://cdn.templates.unlayer.com/assets/1662456866997-back2.png" /><v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
                <![endif]-->
  
                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                      <div class="u-row"
                        style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div
                          style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-image: url('images/image-2.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;">
                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-image: url('images/image-2.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;"><![endif]-->
  
                          <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #732d34;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                          <div class="u-col u-col-100"
                            style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                            <div
                              style="background-color: #732d34;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                              <!--[if (!mso)&(!IE)]><!-->
                              <div
                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                <!--<![endif]-->
  
                                <table id="u_content_text_5" style="font-family:'Open Sans',sans-serif;" role="presentation"
                                  cellpadding="0" cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td class="v-container-padding-padding"
                                        style="overflow-wrap:break-word;word-break:break-word;padding:31px 50px 30px 10px;font-family:'Open Sans',sans-serif;"
                                        align="left">
  
                                        <div class="v-text-align"
                                          style="font-size: 14px; color: #ffffff; line-height: 170%; text-align: right; word-wrap: break-word;">
                                          <div>
                                            <p style="line-height: 170%; text-align: center;"><strong>Kakatiya Research Initiative
                                                for Transformative Innovations - kriti</strong><br /><strong>(formerly
                                                krd)</strong></p>
                                            <p style="line-height: 170%; text-align: center;"> </p>
                                          </div>
                                        </div>
  
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
  
                                <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0"
                                  cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td class="v-container-padding-padding"
                                        style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;"
                                        align="left">
  
                                        <div align="center">
                                          <div style="display: table; max-width:36px;">
                                            <!--[if (mso)|(IE)]><table width="36" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:36px;"><tr><![endif]-->
  
                                            <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                                            <table align="center" border="0" cellspacing="0" cellpadding="0" width="32"
                                              height="32"
                                              style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                                              <tbody>
                                                <tr style="vertical-align: top">
                                                  <td align="center" valign="middle"
                                                    style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                    <a href="https://instagram.com/kritikmc2024" title="Instagram"
                                                      target="_blank">
                                                      <img src="https://www.kritikmc.com/image-1.png" alt="Instagram"
                                                        title="Instagram" width="32"
                                                        style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                    </a>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            <!--[if (mso)|(IE)]></td><![endif]-->
  
                                            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                          </div>
                                        </div>
  
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
  
                                <!--[if (!mso)&(!IE)]><!-->
                              </div><!--<![endif]-->
                            </div>
                          </div>
                          <!--[if (mso)|(IE)]></td><![endif]-->
                          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                        </div>
                      </div>
                    </div>
  
                    <!--[if gte mso 9]>
                </v:textbox></v:rect>
              </td>
              </tr>
              </table>
              <![endif]-->
  
                    <!--[if gte mso 9]>
                <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;min-width: 320px;max-width: 600px;">
                  <tr>
                    <td background="https://cdn.templates.unlayer.com/assets/1662456713969-back2.png" valign="top" width="100%">
                <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 600px;">
                  <v:fill type="frame" src="https://cdn.templates.unlayer.com/assets/1662456713969-back2.png" /><v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
                <![endif]-->
  
                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                      <div class="u-row"
                        style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div
                          style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-image: url('images/image-3.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;">
                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-image: url('images/image-3.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;"><![endif]-->
  
                          <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #000000;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                          <div class="u-col u-col-100"
                            style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                            <div
                              style="background-color: #000000;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                              <!--[if (!mso)&(!IE)]><!-->
                              <div
                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                <!--<![endif]-->
  
                                <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0"
                                  cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td class="v-container-padding-padding"
                                        style="overflow-wrap:break-word;word-break:break-word;padding:20px;font-family:'Open Sans',sans-serif;"
                                        align="left">
  
                                        <div class="v-text-align"
                                          style="font-size: 14px; color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
                                          <p style="font-size: 14px; line-height: 140%;">Kakatiya Medical College - South North V
                                            P Road, Nizampura, Rangampet Street, Warangal 506007, Telangana, India</p>
                                            <br/>
                                            <p style="text-align:center;"> made with ❤️ by <a href="portfolio-eashaan.vercel.app">Eashaan -> </a> </p>
                                        </div>
  
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
  
                                <!--[if (!mso)&(!IE)]><!-->
                              </div><!--<![endif]-->
                            </div>
                          </div>
                          <!--[if (mso)|(IE)]></td><![endif]-->
                          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                        </div>
                      </div>
                    </div>
  
                    <!--[if gte mso 9]>
                </v:textbox></v:rect>
              </td>
              </tr>
              </table>
              <![endif]-->
  
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
            <!--[if mso]></div><![endif]-->
            <!--[if IE]></div><![endif]-->
          </body>
  
          </html>`,
          });

          return {
            dataUploaded,
          };
        } else {
          /////////////////////////////////////////////////////
          // Generate a id on the visitor number
          /////////////////////////////////////////////////////
          const counterRes = await counter.up("kritikmc", "delegatesFinal");
          const delegateId = `K-${String(counterRes.Count).padStart(4, "0")}`;
          metadata.regData.delegateId = delegateId;
          console.log("Uploaded File:  ", file);
          /////////////////////////////////////////////////////
          // Upload all data to server
          /////////////////////////////////////////////////////
          const dataUploaded = await UploadRegistrationData(
            metadata.regData,
            file.url
          );
          const {
            studentEmail,
            studentName,
            studentNumber,
            isKmcStudent,
            isPgStudent,
            events,
          } = metadata.regData;
          /////////////////////////////////////////////////////
          // Send an email to user
          /////////////////////////////////////////////////////

          const email = await resend.emails.send({
            from: `registrations@kritikmc.com`,
            to: `${studentEmail}`,
            subject: "🎉 Thanks for Registering for kriti by KMC Warangal!",
            html: `<!DOCTYPE HTML
            PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
            xmlns:o="urn:schemas-microsoft-com:office:office">
  
          <head>
            <!--[if gte mso 9]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="x-apple-disable-message-reformatting">
            <!--[if !mso]><!-->
            <meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
            <title></title>
  
            <style type="text/css">
              @media only screen and (min-width: 620px) {
                .u-row {
                  width: 600px !important;
                }
  
                .u-row .u-col {
                  vertical-align: top;
                }
  
                .u-row .u-col-100 {
                  width: 600px !important;
                }
  
              }
  
              @media (max-width: 620px) {
                .u-row-container {
                  max-width: 100% !important;
                  padding-left: 0px !important;
                  padding-right: 0px !important;
                }
  
                .u-row .u-col {
                  min-width: 320px !important;
                  max-width: 100% !important;
                  display: block !important;
                }
  
                .u-row {
                  width: 100% !important;
                }
  
                .u-col {
                  width: 100% !important;
                }
  
                .u-col>div {
                  margin: 0 auto;
                }
              }
  
              body {
                margin: 0;
                padding: 0;
              }
  
              table,
              tr,
              td {
                vertical-align: top;
                border-collapse: collapse;
              }
  
              p {
                margin: 0;
              }
  
              .ie-container table,
              .mso-container table {
                table-layout: fixed;
              }
  
              * {
                line-height: inherit;
              }
  
              a[x-apple-data-detectors='true'] {
                color: inherit !important;
                text-decoration: none !important;
              }
  
              table,
              td {
                color: #000000;
              }
  
              #u_body a {
                color: #0000ee;
                text-decoration: underline;
              }
  
              #u_content_text_4 a {
                color: #f1c40f;
              }
  
              @media (max-width: 480px) {
                #u_content_image_2 .v-src-width {
                  width: auto !important;
                }
  
                #u_content_image_2 .v-src-max-width {
                  max-width: 25% !important;
                }
  
                #u_content_text_3 .v-container-padding-padding {
                  padding: 10px 20px 20px !important;
                }
  
                #u_content_text_4 .v-container-padding-padding {
                  padding: 60px 20px !important;
                }
  
                #u_content_text_5 .v-container-padding-padding {
                  padding: 10px 20px 30px !important;
                }
  
                #u_content_text_5 .v-text-align {
                  text-align: center !important;
                }
              }
            </style>
  
            <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css">
            <!--<![endif]-->
  
          </head>
  
          <body class="clean-body u_body"
            style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #000000;color: #000000">
            <!--[if IE]><div class="ie-container"><![endif]-->
            <!--[if mso]><div class="mso-container"><![endif]-->
            <table id="u_body"
              style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #000000;width:100%"
              cellpadding="0" cellspacing="0">
              <tbody>
                <tr style="vertical-align: top">
                  <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #000000;"><![endif]-->
  
                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                      <div class="u-row"
                        style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div
                          style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  
                          <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                          <div class="u-col u-col-100"
                            style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                            <div style="height: 100%;width: 100% !important;">
                              <!--[if (!mso)&(!IE)]><!-->
                              <div
                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                <!--<![endif]-->
  
                                <table id="u_content_image_2" style="font-family:'Open Sans',sans-serif;" role="presentation"
                                  cellpadding="0" cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td class="v-container-padding-padding"
                                        style="overflow-wrap:break-word;word-break:break-word;padding:120px 10px 100px;font-family:'Open Sans',sans-serif;"
                                        align="left">
  
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                          <tr>
                                            <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
  
                                              <img align="center" border="0" src="https://www.kritikmc.com/kmc_mail_logo.jpeg"
                                                alt="Logo" title="Logo"
                                                style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 47%;max-width: 272.6px;"
                                                width="272.6" class="v-src-width v-src-max-width" />
  
                                            </td>
                                          </tr>
                                        </table>
  
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
  
                                <!--[if (!mso)&(!IE)]><!-->
                              </div><!--<![endif]-->
                            </div>
                          </div>
                          <!--[if (mso)|(IE)]></td><![endif]-->
                          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                        </div>
                      </div>
                    </div>
  
                    <!--[if gte mso 9]>
                <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;min-width: 320px;max-width: 600px;">
                  <tr>
                    <td background="https://cdn.templates.unlayer.com/assets/1662456088977-back2.png" valign="top" width="100%">
                <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 600px;">
                  <v:fill type="frame" src="https://cdn.templates.unlayer.com/assets/1662456088977-back2.png" /><v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
                <![endif]-->
  
                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                      <div class="u-row"
                        style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div
                          style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-image: url('images/image-5.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;">
                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-image: url('images/image-5.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;"><![endif]-->
  
                          <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                          <div class="u-col u-col-100"
                            style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                            <div
                              style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                              <!--[if (!mso)&(!IE)]><!-->
                              <div
                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                <!--<![endif]-->
  
                                <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0"
                                  cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td class="v-container-padding-padding"
                                        style="overflow-wrap:break-word;word-break:break-word;padding:60px 10px 10px;font-family:'Open Sans',sans-serif;"
                                        align="left">
  
                                        <div class="v-text-align"
                                          style="font-size: 14px; line-height: 170%; text-align: center; word-wrap: break-word;">
                                          <p style="font-size: 14px; line-height: 170%;"><span
                                              style="font-size: 20px; line-height: 34px;"><strong><span
                                                  style="line-height: 34px; font-size: 20px;">Hi ${studentName},</span></strong></span>
                                          </p>
                                        </div>
  
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
  
                                <table id="u_content_text_3" style="font-family:'Open Sans',sans-serif;" role="presentation"
                                  cellpadding="0" cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td class="v-container-padding-padding"
                                        style="overflow-wrap:break-word;word-break:break-word;padding:10px 100px 50px;font-family:'Open Sans',sans-serif;"
                                        align="left">
  
                                        <div class="v-text-align"
                                          style="font-size: 14px; line-height: 170%; text-align: center; word-wrap: break-word;">
                                          <p style="line-height: 170%;"><span style="font-size: 16px; line-height: 27.2px;">Thank
                                              you for registering for kriti.</span></p>
                                          <p style="line-height: 170%;"><span style="font-size: 16px; line-height: 27.2px;">Your
                                              registering request was recieved and you will be informed when confirmed.</span></p>
                                          <p style="line-height: 170%;">  </p>
                                          <p style="line-height: 170%;"><span style="font-size: 16px; line-height: 27.2px;">Till
                                              then keep the info below handy!</span></p>
                                        </div>
  
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
  
                                <!--[if (!mso)&(!IE)]><!-->
                              </div><!--<![endif]-->
                            </div>
                          </div>
                          <!--[if (mso)|(IE)]></td><![endif]-->
                          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                        </div>
                      </div>
                    </div>
  
                    <!--[if gte mso 9]>
                </v:textbox></v:rect>
              </td>
              </tr>
              </table>
              <![endif]-->
  
                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                      <div class="u-row"
                        style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div
                          style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  
                          <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #000000;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                          <div class="u-col u-col-100"
                            style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                            <div
                              style="background-color: #000000;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                              <!--[if (!mso)&(!IE)]><!-->
                              <div
                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                <!--<![endif]-->
  
                                <table id="u_content_text_4" style="font-family:'Open Sans',sans-serif;" role="presentation"
                                  cellpadding="0" cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td class="v-container-padding-padding"
                                        style="overflow-wrap:break-word;word-break:break-word;padding:60px 80px;font-family:'Open Sans',sans-serif;"
                                        align="left">
  
                                        <div class="v-text-align"
                                          style="font-size: 14px; color: #ffffff; line-height: 170%; text-align: center; word-wrap: break-word;">
                                          <p style="font-size: 14px; line-height: 170%; text-align: left;"><strong>{</strong></p>
                                          <p style="font-size: 14px; line-height: 170%; text-align: left;"><strong>Delegate ID:
                                            </strong>${delegateId}</p>
                                          <p style="font-size: 14px; line-height: 170%; text-align: left;"><strong>Name: </strong>
                                            ${studentName}</p>
                                          <p style="font-size: 14px; line-height: 170%; text-align: left;"><strong>Email Id:
                                            </strong>${studentEmail}<a
                                              href="https://www.kritikmc.com/_next/image?url=%2Fkriti_logo_dark.png&w=640&q=75"></a>
                                          </p>
                                          <p style="font-size: 14px; line-height: 170%; text-align: left;"><strong>Mobile No. :
                                            </strong>${studentNumber}</p>
                                          <p style="font-size: 14px; line-height: 170%; text-align: left;"><strong>Registration
                                              Fee: </strong>₹${
                                                isKmcStudent === "true"
                                                  ? "300"
                                                  : isPgStudent
                                                    ? "600"
                                                    : "400"
                                              }</p>
                                          <p style="font-size: 14px; line-height: 170%; text-align: left;"><strong>Payment
                                              Screenshot Link: </strong>${file.url}</p>
                                          <p style="font-size: 14px; line-height: 170%; text-align: left;"></p>
                                          <p style="font-size: 14px; line-height: 170%; text-align: left;"> <strong> Events Participated in:</strong> ${events.reduce((sum, el) => sum + ", " + el)} </p>
                                          <p style="font-size: 14px; line-height: 170%; text-align: left;"><strong>}</strong> </p>
                                        </div>
  
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
  
                                <!--[if (!mso)&(!IE)]><!-->
                              </div><!--<![endif]-->
                            </div>
                          </div>
                          <!--[if (mso)|(IE)]></td><![endif]-->
                          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                        </div>
                      </div>
                    </div>
  
                    <!--[if gte mso 9]>
                <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;min-width: 320px;max-width: 600px;">
                  <tr>
                    <td background="https://cdn.templates.unlayer.com/assets/1662456866997-back2.png" valign="top" width="100%">
                <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 600px;">
                  <v:fill type="frame" src="https://cdn.templates.unlayer.com/assets/1662456866997-back2.png" /><v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
                <![endif]-->
  
                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                      <div class="u-row"
                        style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div
                          style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-image: url('images/image-2.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;">
                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-image: url('images/image-2.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;"><![endif]-->
  
                          <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #732d34;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                          <div class="u-col u-col-100"
                            style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                            <div
                              style="background-color: #732d34;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                              <!--[if (!mso)&(!IE)]><!-->
                              <div
                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                <!--<![endif]-->
  
                                <table id="u_content_text_5" style="font-family:'Open Sans',sans-serif;" role="presentation"
                                  cellpadding="0" cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td class="v-container-padding-padding"
                                        style="overflow-wrap:break-word;word-break:break-word;padding:31px 50px 30px 10px;font-family:'Open Sans',sans-serif;"
                                        align="left">
  
                                        <div class="v-text-align"
                                          style="font-size: 14px; color: #ffffff; line-height: 170%; text-align: right; word-wrap: break-word;">
                                          <div>
                                            <p style="line-height: 170%; text-align: center;"><strong>Kakatiya Research Initiative
                                                for Transformative Innovations - kriti</strong><br /><strong>(formerly
                                                krd)</strong></p>
                                            <p style="line-height: 170%; text-align: center;"> </p>
                                          </div>
                                        </div>
  
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
  
                                <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0"
                                  cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td class="v-container-padding-padding"
                                        style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;"
                                        align="left">
  
                                        <div align="center">
                                          <div style="display: table; max-width:36px;">
                                            <!--[if (mso)|(IE)]><table width="36" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:36px;"><tr><![endif]-->
  
                                            <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                                            <table align="center" border="0" cellspacing="0" cellpadding="0" width="32"
                                              height="32"
                                              style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                                              <tbody>
                                                <tr style="vertical-align: top">
                                                  <td align="center" valign="middle"
                                                    style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                    <a href="https://instagram.com/kritikmc2024" title="Instagram"
                                                      target="_blank">
                                                      <img src="https://www.kritikmc.com/image-1.png" alt="Instagram"
                                                        title="Instagram" width="32"
                                                        style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                    </a>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            <!--[if (mso)|(IE)]></td><![endif]-->
  
                                            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                          </div>
                                        </div>
  
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
  
                                <!--[if (!mso)&(!IE)]><!-->
                              </div><!--<![endif]-->
                            </div>
                          </div>
                          <!--[if (mso)|(IE)]></td><![endif]-->
                          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                        </div>
                      </div>
                    </div>
  
                    <!--[if gte mso 9]>
                </v:textbox></v:rect>
              </td>
              </tr>
              </table>
              <![endif]-->
  
                    <!--[if gte mso 9]>
                <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;min-width: 320px;max-width: 600px;">
                  <tr>
                    <td background="https://cdn.templates.unlayer.com/assets/1662456713969-back2.png" valign="top" width="100%">
                <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 600px;">
                  <v:fill type="frame" src="https://cdn.templates.unlayer.com/assets/1662456713969-back2.png" /><v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
                <![endif]-->
  
                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                      <div class="u-row"
                        style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div
                          style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-image: url('images/image-3.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;">
                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-image: url('images/image-3.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;"><![endif]-->
  
                          <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #000000;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                          <div class="u-col u-col-100"
                            style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                            <div
                              style="background-color: #000000;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                              <!--[if (!mso)&(!IE)]><!-->
                              <div
                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                <!--<![endif]-->
  
                                <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0"
                                  cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td class="v-container-padding-padding"
                                        style="overflow-wrap:break-word;word-break:break-word;padding:20px;font-family:'Open Sans',sans-serif;"
                                        align="left">
  
                                        <div class="v-text-align"
                                          style="font-size: 14px; color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
                                          <p style="font-size: 14px; line-height: 140%;">Kakatiya Medical College - South North V
                                            P Road, Nizampura, Rangampet Street, Warangal 506007, Telangana, India</p>
                                            <br/>
                                            <p style="text-align:center;"> made with ❤️ by <a href="portfolio-eashaan.vercel.app">Eashaan -> </a> </p>
                                        </div>
  
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
  
                                <!--[if (!mso)&(!IE)]><!-->
                              </div><!--<![endif]-->
                            </div>
                          </div>
                          <!--[if (mso)|(IE)]></td><![endif]-->
                          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                        </div>
                      </div>
                    </div>
  
                    <!--[if gte mso 9]>
                </v:textbox></v:rect>
              </td>
              </tr>
              </table>
              <![endif]-->
  
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
            <!--[if mso]></div><![endif]-->
            <!--[if IE]></div><![endif]-->
          </body>
  
          </html>`,
          });
          return {
            dataUploaded,
          };
        }
      } catch (err) {
        if (err.message.includes("email_1 dup key")) {
          return {
            error:
              "Duplicate Email Address Used, email at kmckriti@gmail.com for refund if amount paid.",
          };
        } else if (err.message.includes("mobileno_1 dup key")) {
          return {
            error:
              "Duplicate Mobile Number Used, email at kmckriti@gmail.com for refund if amount paid.",
          };
        } else {
          return {
            error: err.message,
          };
        }
      }
    }),
};

export default FileRouter;
