/**
 * Generates the FEAGI REST API reference page.
 *
 * Runs feagi-api's dump_openapi_json Rust example to emit the OpenAPI spec,
 * then wraps it in a self-contained Scalar HTML viewer.
 *
 * Output:
 *   api-docs/index.html  - Scalar viewer with embedded spec
 *   api-docs/openapi.json - raw spec for code generators and tooling
 *
 * Path resolution:
 *   CI:    feagi-core full source at _sources/feagi-core-build/
 *   Local: feagi-core at ../../feagi-core (monorepo sibling)
 *
 * Usage: node scripts/generate-api-reference.mjs
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsRoot = path.resolve(__dirname, "..");

function resolveFeagiCore() {
  const ciPath = path.join(docsRoot, "_sources", "feagi-core-build");
  if (fs.existsSync(ciPath)) return ciPath;
  const localPath = path.resolve(docsRoot, "..", "feagi-core");
  if (fs.existsSync(localPath)) return localPath;
  return null;
}

const feagiCoreRoot = resolveFeagiCore();
if (!feagiCoreRoot) {
  console.error(
    "feagi-core not found. Expected at _sources/feagi-core-build/ (CI) or ../../feagi-core (local)."
  );
  process.exit(1);
}

console.log(`Using feagi-core at: ${feagiCoreRoot}`);
console.log("Building OpenAPI spec...");

execSync("cargo run -p feagi-api --example dump_openapi_json", {
  cwd: feagiCoreRoot,
  stdio: "inherit",
});

const specSrc = "/tmp/openapi_dump.json";
if (!fs.existsSync(specSrc)) {
  console.error(`OpenAPI spec not found at ${specSrc}`);
  process.exit(1);
}

const spec = fs.readFileSync(specSrc, "utf8");
JSON.parse(spec); // validate

const outDir = path.join(docsRoot, "api-docs");
fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(path.join(outDir, "openapi.json"), spec, "utf8");

const configuration = JSON.stringify({ hiddenClients: true });

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>FEAGI REST API Reference</title>
  <style>body { margin: 0; }</style>
</head>
<body>
  <script
    id="api-reference"
    type="application/json"
    data-configuration='${configuration}'
  >${spec}</script>
  <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
</body>
</html>
`;

fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
console.log(`API reference written to ${outDir}/`);
