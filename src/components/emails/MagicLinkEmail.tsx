import * as React from "react";

interface EmailTemplateProps {
  url: string;
}

export const MagicLinkEmail: React.FC<Readonly<EmailTemplateProps>> = ({
  url,
}) => (
  <>
    <h1>Sign in to your account</h1>
    <p>
      Click the link below to sign in to your account. If you did not request a
      sign in link, you can safely ignore this email.
    </p>
    <a href={url}>{url}</a>

    <br />
    <br />

    <hr />
    <small>
      This message has been sent to you by <a href="cslit.cc">cslit.cc</a>
    </small>
  </>
);
