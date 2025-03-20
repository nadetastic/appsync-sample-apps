type AmplifyConfig = {
  userPool: string;
  userPoolClient: string;
  appsyncEndpoint: string;
  appsyncApiKey: string;
  appsyncAuthMode: "apiKey" | "userPool";
};

export const config: AmplifyConfig = {
  userPool: "",
  userPoolClient: "",
  appsyncEndpoint: "",
  appsyncApiKey: "",
  appsyncAuthMode: "apiKey",
};
