import { createTransport } from "nodemailer"

export async function sendVerificationRequest(params) {
  const { identifier, url, provider, theme } = params
  const { host } = new URL(url)
  const transport = createTransport(provider.server)
  const result = await transport.sendMail({
    to: identifier,
    // from: provider.from,
    from: 'CS-LIT login verification <hi@cslit.cc>',
    sender: "CS-LIT login verification",
    subject: `Sign in to ${host}`,
    text: text({ url, host }),
    html: html({ url, host, theme, provider: {id: "cslit", name: "CS-LIT login verification"} }),
  })
  const failed = result.rejected.concat(result.pending).filter(Boolean)
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
  }
}
const Theme = { colorScheme: 'auto', logo: '/assets/logo.svg', brandColor: '#ff7263', buttonText: '#fff' }

function html(params: { url: string, host: string, theme: typeof Theme, provider: { id: string, name: string }}) {
  const { url, host, theme } = params

  const escapedHost = host.replace(/\./g, "&#8203;.")

  const brandColor = theme.brandColor || "#ff7263"
  const color = {
    background: "#f9f9f9",
    text: "#444",
    link: "#0070f3",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || "#fff",
  }

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
      style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        <img src="https://b-amir.storage.iran.liara.space/cslit/images/logo.png" width="180" style="display: block;" />
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Sign in to <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>

    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          Here's the full link to sign in: 
          <br>
          <p style="font-size: 12px; color: ${color.link};">${url}</p>
      </td>
  </tr>
  </table>
</body>
`
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string, host: string }) {
  return `Sign in to ${host}\n${url}\n\n`
}