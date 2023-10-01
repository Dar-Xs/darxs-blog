// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DarXs',
  tagline: 'Dare to face the Xs.',
  favicon: 'img/site/favicon.ico',

  // Set the production url of your site here
  url: 'https://darxs.cn',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Dar-Xs', // Usually your GitHub org/user name.
  projectName: 'darxs-blog', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['en','zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Dar-Xs/darxs-blog/tree/main',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Dar-Xs/darxs-blog/tree/main',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  plugins: ['docusaurus-plugin-sass'],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'DarXs',
        logo: {
          alt: 'DarXs Logo',
          src: 'img/site/logo_black.svg',
          srcDark: 'img/site/logo_white.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Notes',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {to: '/portfolio', label: 'Portfolio', position: 'left'},
          {
            href: 'https://github.com/Dar-Xs/darxs-blog',
            label: 'GitHub',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Docusaurus Tutorial',
                to: '/docs/Docusaurus/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/users/20128048/dr-xiong',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/YbgrhdmQ9F',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/darxs001',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Blogger',
                href: 'https://blog.darxs.cn',
              },
              {
                label: 'GitHub Repository',
                href: 'https://github.com/Dar-Xs/darxs-blog',
              },
            ],
          },
          {
            title: 'Thanks',
            items: [
              {
                label: 'Netlify',
                href: 'https://www.netlify.com',
              },
              {
                label: 'Docusaurus',
                href: 'https://docusaurus.io',
              },
              {
                label: 'GitHub',
                href: 'https://github.com',
              },
            ],
          },
        ],
        copyright: `Copyright © 2019 - ${new Date().getFullYear()} DarXs · Built with Docusaurus · Powered by Netlify</br><a href=\"https://icp.gov.moe/?keyword=20232192\" target=\"_blank\">萌ICP备20232192号</a> · <a href=\"http://beian.miit.gov.cn/\" target=\"_blank\">鄂ICP备2023017512号-1</a>`,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      liveCodeBlock: {
        /**
         * The position of the live playground, above or under the editor
         * Possible values: "top" | "bottom"
         */
        playgroundPosition: 'bottom',
      },
    }),
};

module.exports = config;
