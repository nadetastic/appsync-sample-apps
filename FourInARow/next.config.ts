import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactStrictMode: true,
//   basePath: process.env.NODE_ENV === "development" ? "/FourInARow" : "",
// };

// export default nextConfig;

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  basePath:
    process.env.NODE_ENV === "development" ? "/FourInARow-frontend" : "",
  assetPrefix:
    process.env.NODE_ENV === "development" ? "/FourInARow-frontend" : "",
};

export default nextConfig;
