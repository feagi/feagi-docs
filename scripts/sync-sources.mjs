/**
 * Syncs content from checked-out source repos into the Docusaurus docs tree.
 *
 * In CI: source repos are checked out under _sources/ by the workflow.
 * Locally: source repos are siblings in the FEAGI-2.0 monorepo.
 *
 * Run: node scripts/sync-sources.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function resolveSource(...parts) {
  // CI: _sources/<repo>/<path>
  const ciPath = path.join(root, "_sources", ...parts);
  if (fs.existsSync(ciPath)) return ciPath;
  // Local monorepo: ../../<repo>/<path>
  const localPath = path.resolve(root, "..", ...parts);
  if (fs.existsSync(localPath)) return localPath;
  return null;
}

function copyDir(src, dest) {
  if (!src || !fs.existsSync(src)) {
    console.warn(`  Source not found, skipping: ${src}`);
    return;
  }
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
  console.log(`  Copied ${src} -> ${dest}`);
}

function copyFile(src, dest) {
  if (!src || !fs.existsSync(src)) {
    console.warn(`  Source not found, skipping: ${src}`);
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`  Copied ${src} -> ${dest}`);
}

// ---------------------------------------------------------------------------
// Brain Visualizer guides -> docs/brain-builder/visualizer/
// Images live in ../UI/GenericResources/ relative to the Guides folder.
// We copy them into static/img/bv/ and rewrite the paths in the markdown.
// ---------------------------------------------------------------------------
console.log("\nSyncing Brain Visualizer guides...");
const bvGuidesSource = resolveSource(
  "brain-visualizer",
  "godot_source/BrainVisualizer/Guides"
);
const bvAssetsSource = resolveSource(
  "brain-visualizer",
  "godot_source/BrainVisualizer/UI/GenericResources"
);
const bvImgDest = path.join(root, "static/img/bv");
const bvDocsDest = path.join(root, "docs/brain-builder/visualizer");

// Copy image assets into static/img/bv/ preserving subfolder structure
copyDir(bvAssetsSource, bvImgDest);

// Copy each markdown guide and rewrite image paths
if (bvGuidesSource && fs.existsSync(bvGuidesSource)) {
  fs.mkdirSync(bvDocsDest, { recursive: true });
  for (const entry of fs.readdirSync(bvGuidesSource, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const srcFile = path.join(bvGuidesSource, entry.name);
    const destFile = path.join(bvDocsDest, entry.name);
    if (entry.name.endsWith(".md")) {
      let content = fs.readFileSync(srcFile, "utf8");
      // Rewrite ../UI/GenericResources/<subpath> -> /docs/img/bv/<subpath>
      // The baseUrl is /docs/ so static/img/bv maps to /docs/img/bv
      content = content.replace(
        /\(\.\.\/UI\/GenericResources\//g,
        "(/docs/img/bv/"
      );
      fs.writeFileSync(destFile, content, "utf8");
      console.log(`  Wrote (rewritten) ${destFile}`);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  }
} else {
  console.warn(`  Brain Visualizer Guides source not found, skipping.`);
}

// ---------------------------------------------------------------------------
// feagi-core architecture docs -> docs/contributing/architecture/
// ---------------------------------------------------------------------------
console.log("\nSyncing feagi-core docs...");
const feagiCoreDocsSource = resolveSource("feagi-core", "docs");
copyDir(feagiCoreDocsSource, path.join(root, "docs/contributing/feagi-core-source"));

// ---------------------------------------------------------------------------
// feagi-mcp README -> docs/sdk/api/mcp-server.md
// ---------------------------------------------------------------------------
console.log("\nSyncing feagi-mcp README...");
const mcpReadme = resolveSource("feagi-mcp", "README.md");
copyFile(mcpReadme, path.join(root, "docs/sdk/api/_mcp-source.md"));

// ---------------------------------------------------------------------------
// embodiment-controllers READMEs -> docs/sdk/embodiments/
// ---------------------------------------------------------------------------
console.log("\nSyncing embodiment READMEs and assets...");
const embodimentsSource = resolveSource("embodiment-controllers", "embodiments");
if (embodimentsSource) {
  for (const entry of fs.readdirSync(embodimentsSource, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const embDir = path.join(embodimentsSource, entry.name);
    const readme = path.join(embDir, "README.md");
    if (fs.existsSync(readme)) {
      copyFile(
        readme,
        path.join(root, "docs/sdk/embodiments", `${entry.name}.md`)
      );
      // Copy any _static/ or assets/ image directories alongside the README
      for (const assetDir of ["_static", "assets", "images", "media"]) {
        const srcAssets = path.join(embDir, assetDir);
        if (fs.existsSync(srcAssets)) {
          copyDir(
            srcAssets,
            path.join(root, "docs/sdk/embodiments", assetDir)
          );
        }
      }
    }
  }
}

console.log("\nSync complete.\n");
