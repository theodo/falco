/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: 'Falco · an Open Source WebPageTest runner',
  tagline: 'Falco helps you monitor, analyze, and optimize your websites.',
  url: 'https://getfal.co',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'theodo', // Usually your GitHub org/user name.
  projectName: 'falco', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Falco',
      logo: {
        alt: 'Falco Logo',
        src: 'img/logo.svg',
      },
      links: [
        {
          to: 'docs/getting-started/installation',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/theodo/falco',
          label: 'GitHub',
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
              label: 'Introduction',
              to: '/docs/introduction/motivation',
            },
            {
              label: 'Getting Started',
              to: '/docs/getting-started/installation',
            },
            {
              label: 'REST API',
              to: '/docs/api-reference/api-docs',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/theodo/falco',
            },
          ],
        },
      ],
      logo: {
        alt: 'Theodo Logo',
        src: 'https://cdn2.hubspot.net/hub/2383597/hubfs/Website/Logos/Logo_Theodo_cropped.svg',
      },
      copyright: `Copyright © ${new Date().getFullYear()} Theodo. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
