import { FractalConfig } from '../../../../core/users/interfaces'

export const getFractalAuthUrl = (payload: FractalConfig): string => {
    return `${payload.frontendServer}/authorize?client_id=${
        payload.client_id
    }&redirect_uri=${encodeURIComponent(
        payload.redirect_uri,
    )}&response_type=code&scope=${payload.scope}`
}

export const getWhitelistedTemplate = (
    imageUrl: string,
    fractalPayload: FractalConfig,
): string => {
    return `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <title>Avata Registration Success</title>
    </head>
    <body
      style="margin: 0;"
    >
    <div style="background: #0e0e15; font-family: Aria, Helvetica, sans-serif;">
      <table style="
          width: 100%;
            text-align: center;
            height: 160px;
            background: #222227;
            font-size: 0;
          ">
        <thead>
        <tr>
          <td style="padding: 0"></td>
          <td width="90%" style="overflow: hidden; padding: 0;">
            <div style="background-image: url('${imageUrl}/logo'); height: 160px; background-repeat: no-repeat; background-position: center"></div>
          </td>
          <td style="padding: 0"></td>
        </tr>
        </thead>
      </table>
      <div style="padding: 64px;">
        <span style="text-transform: uppercase; font-size: 22px; font-weight: 700; color: #fff;">
          Congratulations!
        </span>
        <div style="margin: 40px 0 24px; font-size: 18px; font-weight: 400; color: #FAF9FC; line-height: 27px">
          You have been whitelisted for AVATA IDO. Please complete the KYC requirements from your dashboard ASAP before the token sale event.
        </div>
        <span style="font-size: 18px; color: #FAF9FC; line-height: 27px">
          Failing to comply could result in the revoke of your <strong style="color: #da0303">$AVAT</strong> allocation. You don't want to miss this!
        </span>
        <a href="${getFractalAuthUrl(
            fractalPayload,
        )}" style="margin: 48px 0 56px;
        text-decoration: none;
        width: 181px;
        padding: 12px 0;
        color: #fff;
        background: #DA0303;
        font-size: 15px;
        font-weight: 600;
        border-radius: 10px;
        line-height: 24px;
        display: block;
        text-align: center; vertical-align: center">
          Pass KYC
        </a>
        <span style="font-size: 18px; font-weight: 700; color: #FBFAFF;">
          Best, The AVATA team!
        </span>
      </div>
    </div>
    </body>
    </html>
    `
}
