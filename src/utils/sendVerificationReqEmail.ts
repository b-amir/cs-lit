import { SendVerificationRequestParams } from 'next-auth/providers';
import { MagicLinkEmail } from '@/components/emails/MagicLinkEmail';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationRequest = async (
  params: SendVerificationRequestParams,
) => {
  const { url, identifier, } = params;

  const normalizeIdentifier = (identifier: string): string => {
    // Get the first two elements only,
    // separated by `@` from user input.
    let [local, domain] = identifier.toLowerCase().trim().split("@")
    // The part before "@" can contain a ","
    // but we remove it on the domain part
    domain = domain?.split(",")[0]
    return `${local}@${domain}`

    // You can also throw an error, which will redirect the user
    // to the error page with error=EmailSignin in the URL
    if (identifier.split("@").length > 2) {
      throw new Error("Only one email allowed")
    }
  }

  try {
    await resend.emails.send({
      from: 'CS-LIT <hi@cslit.cc>',
      to: normalizeIdentifier(identifier),
      subject: 'Verify your email address',
      text: text(url),
      react: MagicLinkEmail({ url }),
      // html: 'YOUR EMAIL CONTENT',
    });

  } catch (error) {
    console.log({ error });
  }
};

function text(url: string) {
  return `Welcome to CS-LIT!
 Please click the following link to verify your email address:
  
 ${url}`
}