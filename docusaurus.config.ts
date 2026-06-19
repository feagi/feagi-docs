import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// Derive the site root so cross-site links (outside /docs/ baseUrl) use full URLs.
// Docusaurus prepends baseUrl to any href that starts with "/", so links to
// /feagi/api-docs must be absolute to avoid becoming /docs/feagi/api-docs.
const siteRoot = process.env.FEAGI_DOCS_URL ?? "https://brainsforrobots.com";

const config: Config = {
  customFields: {
    // Exposed to client-side pages via useDocusaurusContext().siteConfig.customFields
    siteRoot: siteRoot,
  },
  title: "FEAGI Documentation",
  tagline: "Build brains. Connect embodiments. Understand the architecture.",
  favicon: "img/feagi-logo.png",

  // FEAGI_DOCS_URL and FEAGI_DOCS_BASE_URL can be overridden in CI.
  // Default values target the final production location.
  // For GitHub Pages testing without a custom domain, set:
  //   FEAGI_DOCS_URL=https://feagi.github.io
  //   FEAGI_DOCS_BASE_URL=/feagi-docs/
  url: process.env.FEAGI_DOCS_URL ?? "https://brainsforrobots.com",
  baseUrl: process.env.FEAGI_DOCS_BASE_URL ?? "/docs/",

  organizationName: "feagi",
  projectName: "feagi-docs",
  trailingSlash: false,

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Treat .md files as CommonMark, not MDX.
  // Synced source docs (feagi-core, embodiment-controllers) contain
  // bare angle brackets that MDX misinterprets as JSX.
  // Use .mdx extension for authored pages that need JSX/React components.
  markdown: {
    format: "detect",
    hooks: {
      // Synced embodiment READMEs reference local images that live in
      // their source repos. Warn instead of failing — images will be
      // resolved once the sync script copies assets alongside the docs.
      onBrokenMarkdownImages: "warn",
    },
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          // Default docs instance — Brain Builder journey
          routeBasePath: "brain-builder",
          path: "docs/brain-builder",
          sidebarPath: "./sidebars/brain-builder.ts",
          editUrl: "https://github.com/feagi/feagi-docs/tree/main/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      "@easyops-cn/docusaurus-search-local",
      {
        hashed: true,
        language: ["en"],
        // Index all three doc sections
        docsRouteBasePath: ["/brain-builder", "/sdk", "/contributing"],
        docsDir: ["docs/brain-builder", "docs/sdk", "docs/contributing"],
        indexBlog: false,
        searchBarPosition: "right",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "sdk",
        routeBasePath: "sdk",
        path: "docs/sdk",
        sidebarPath: "./sidebars/sdk.ts",
        editUrl: "https://github.com/feagi/feagi-docs/tree/main/",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "contributing",
        routeBasePath: "contributing",
        path: "docs/contributing",
        sidebarPath: "./sidebars/contributing.ts",
        editUrl: "https://github.com/feagi/feagi-docs/tree/main/",
      },
    ],
  ],

  themeConfig: {
    image: "img/feagi-social-card.png",

    navbar: {
      title: "FEAGI",
      logo: {
        alt: "FEAGI Logo",
        // feagi-logo.png is black on white — light mode.
        // Provide feagi-logo-dark.png (white/transparent bg) for dark mode.
        src: "img/feagi-logo.png",
        srcDark: "img/feagi-logo-dark.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "brainBuilder",
          position: "left",
          label: "Brain Builder",
        },
        {
          type: "docSidebar",
          docsPluginId: "sdk",
          sidebarId: "sdk",
          position: "left",
          label: "SDK & Integrations",
        },
        {
          type: "docSidebar",
          docsPluginId: "contributing",
          sidebarId: "contributing",
          position: "left",
          label: "Contributing",
        },
        {
          href: `${siteRoot}/feagi/api-docs`,
          label: "API Reference",
          position: "left",
        },
        {
          href: "https://brainsforrobots.com",
          label: "brainsforrobots.com",
          position: "right",
        },
        {
          href: "https://github.com/feagi",
          label: "GitHub",
          position: "right",
        },
      ],
    },

    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            { label: "Brain Builder", to: "/brain-builder/" },
            { label: "SDK & Integrations", to: "/sdk/" },
            { label: "Contributing", to: "/contributing/" },
            { label: "API Reference", href: `${siteRoot}/feagi/api-docs` },
          ],
        },
        {
          title: "Community",
          items: [
            { label: "GitHub", href: "https://github.com/feagi" },
            { label: "Discord", href: "https://discord.gg/PTVC8fyGN8" },
          ],
        },
        {
          title: "More",
          items: [
            { label: "FEAGI", href: "https://brainsforrobots.com/feagi" },
            { label: "Neurorobotics Studio", href: "https://brainsforrobots.com" },
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} Neuraville Inc. Built with Docusaurus.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["rust", "toml", "bash", "python", "java"],
    },

    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
