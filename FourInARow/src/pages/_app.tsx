import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppWrapper from "@/components/AppWrapper";
import { Amplify } from "aws-amplify";
import { config } from "../../amplifyconfiguration";
import { sessionStorage } from "aws-amplify/utils";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: config.userPool,
      userPoolClientId: config.userPoolClient,
      userAttributes: {
        email: {
          required: true,
        },
      },
    },
  },
  API: {
    Events: {
      endpoint: config.appsyncEndpoint,
      defaultAuthMode: config.appsyncAuthMode,
      apiKey: config.appsyncApiKey,
    },
  },
});

cognitoUserPoolsTokenProvider.setKeyValueStorage(sessionStorage);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Authenticator>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </Authenticator>
  );
}
