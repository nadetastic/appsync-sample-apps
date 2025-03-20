import "@/styles/globals.css";
import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import AppWrapper from "@/components/AppWrapper";
import { Amplify } from "aws-amplify";
import { config } from "@/amplifyconfiguration";
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
  const [isConfigured, setIsConfigured] = useState(false);
  useEffect(() => {
    const hasAllValues = (obj: typeof config) => {
      return Object.values(obj).every(
        (value) => value !== null && value !== undefined && value !== ""
      );
    };

    if (hasAllValues(config)) {
      setIsConfigured(true);
    }
  }, []);

  return isConfigured ? (
    <Authenticator>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </Authenticator>
  ) : (
    <div className="flex justify-center items-center h-screen w-screen">
      <p className="text-center">
        Amplify has not been configured with required parameters.
        <br />
        Verify that the&nbsp;
        <code>amplifyconfiguration.ts</code> file has the proper values, and
        refresh the page.
      </p>
    </div>
  );
}
