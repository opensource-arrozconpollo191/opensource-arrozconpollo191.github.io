import type { NextConfig } from "next";

const staticExport = process.env.NEXT_STATIC_EXPORT === "true";
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
const basePath = configuredBasePath.replace(/\/+$/, "");

if (basePath && !/^\/[a-z0-9._~/-]+$/i.test(basePath)) {
  throw new Error("NEXT_PUBLIC_BASE_PATH must be empty or start with a slash.");
}

const nextConfig: NextConfig = staticExport
  ? {
      basePath,
      output: "export",
      trailingSlash: true,
      turbopack: { root: process.cwd() },
      typescript: { tsconfigPath: "tsconfig.pages.json" },
    }
  : { turbopack: { root: process.cwd() } };

export default nextConfig;
