import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Directory containing this config (`frontend/`) — stable tracing root when the repo also has files at the parent level. */
const tracingRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  /**
   * Avoids broken client chunks (`Cannot read properties of undefined (reading 'call')`)
   * when Next infers the wrong monorepo root due to an extra lockfile at the repository root.
   */
  outputFileTracingRoot: tracingRoot,
};

export default nextConfig;
