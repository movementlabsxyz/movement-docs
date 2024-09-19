// @ts-check
import { themes as prismThemes } from "prism-react-renderer";
import tailwindPlugin from './plugins/tailwind-config.cjs';
import "dotenv/config";


/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Movement Network | Movement",
  tagline: "Movement Network is building a network of Move-based blockchains.",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.movementnetwork.xyz",
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: "/",

  // GitHub pages deployment config.
  organizationName: "movementnetwork", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  plugins: [
    tailwindPlugin,
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "api",
        docsPluginId: "classic",
        config: {
          aptosnode: {
            specPath: "apispec/node.yaml",
            outputDir: "docs/api/node",
            sidebarOptions: {
              groupPathsBy: "tag",
                categoryLinkSource: "tag",
            },
          },
        },
      },
    ],
  ],

  themes: ["docusaurus-theme-openapi-docs"],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          docItemComponent: "@theme/ApiItem",
          routeBasePath: "/",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/movementlabsxyz/movement-docs/blob/main",
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        // The application ID provided by Algolia
        appId: process.env.ALGOLIA_APPID || "xyz",

        // Public API key: it is safe to commit it
        apiKey: process.env.ALGOLIA_APIKEY || "xyz",

        indexName: "movementnetwork",

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: "search",
      },
      // Replace with your project's social card
      image: "img/movementlabs-social-card.png",
      navbar: {
        title: "Movement",
        logo: {
          alt: "Movement Network Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Learn",
          },
          {
            type: "docSidebar",
            sidebarId: "developersSidebar",
            position: "left",
            label: "Build",
          },
          {
            type: "docSidebar",
            sidebarId: "apiSidebar",
            position: "left",
            label: "API",
          },
          {
            type: 'search',
            position: 'left',
            className: "searchBar_nav",
          },
          {
            href: "https://github.com/movementlabsxyz/movement-docs",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "light",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/category/tutorials",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://discord.gg/movementlabsxyz",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/movementlabsxyz",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/movementlabsxyz/movement-docs",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Movement Foundation.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
    }),
  
    clientModules:[
      require.resolve("./src/js/keyboard-shortcuts.js")
    ]
};

export default config;
