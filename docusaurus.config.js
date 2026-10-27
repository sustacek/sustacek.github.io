// @ts-check
const {themes: prismThemes} = require('prism-react-renderer');

const description =
  'Josef Šustáček – Java Developer and Software Engineer with over 15 years of experience, ' +
  'ex-Liferay Global Services consultant. Java, Amazon Web Services (AWS), CI/CD, Tomcat, ' +
  'nginx, Gradle, git, best practices, code reviews.';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Josef Šustáček',
  tagline: 'Java Developer and Software Engineer',
  favicon: 'img/favicon.svg',

  url: 'https://www.josefsustacek.cz',
  baseUrl: '/',
  // Keep the URLs of the old Jekyll site (/about, /blog, ...) without trailing slash.
  trailingSlash: false,

  // Files served as-is (resume, certificates, CNAME, favicon ...)
  staticDirectories: ['src/static'],

  organizationName: 'sustacek',
  projectName: 'sustacek.github.io',

  onBrokenLinks: 'throw',

  markdown: {
    // *.md files are parsed as plain CommonMark, only *.mdx files as MDX.
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: [
    {
      tagName: 'meta',
      attributes: {name: 'description', content: description},
    },
  ],

  plugins: [
    [
      // Keep old Jekyll URLs of the blog posts working.
      // (/feed.xml is handled in the deploy workflow, as it is not a route.)
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/2013/01/10/2013-01-opends-testing-ldap-server.html',
            to: '/blog/2013/01/10/opends-testing-ldap-server',
          },
          {
            from: '/2013/02/05/2013-02-creating-unit-tests-in-core-liferay.html',
            to: '/blog/2013/02/05/creating-unit-tests-in-core-liferay',
          },
          {
            from: '/2013/02/12/2013-02-smartgithg-4-and-docky-in-ubuntu-1210.html',
            to: '/blog/2013/02/12/smartgithg-4-and-docky-in-ubuntu-1210',
          },
          {
            from: '/2013/02/14/2013-02-want-lambdas-with-jdk6-heres-idea.html',
            to: '/blog/2013/02/14/want-lambdas-with-jdk6-heres-idea',
          },
          {
            from: '/2013/03/22/2013-03-testing-plugins-with-ivy-using-powermock.html',
            to: '/blog/2013/03/22/testing-plugins-with-ivy-using-powermock',
          },
          {
            from: '/2016/09/15/2016-09-cloud-formation-boolean-as-parameter-in.html',
            to: '/blog/2016/09/15/cloud-formation-boolean-as-parameter-in',
          },
        ],
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        // The docs plugin hosts the DIY section, served at /diy.
        docs: {
          path: 'src/diy',
          routeBasePath: 'diy',
          sidebarPath: './sidebars.js',
        },
        blog: {
          path: 'src/blog',
          routeBasePath: 'blog',
          blogTitle: 'Blog',
          blogDescription: 'Occasional posts by Josef Šustáček about Java, Liferay, AWS and tooling.',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            title: 'Josef Šustáček',
            description,
          },
        },
        pages: {},
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Josef Šustáček',
        items: [
          {to: '/', label: 'Home', position: 'left', activeBaseRegex: '^/$'},
          {to: '/about', label: 'About', position: 'left'},
          {to: '/blog', label: 'Blog', position: 'left'},
          {to: '/personal-finance', label: 'Personal Finance', position: 'left'},
          {to: '/diy', label: 'DIY', position: 'left', activeBaseRegex: '^/diy'},
          {to: '/solar', label: 'Solar', position: 'left'},
          {to: '/contact', label: 'Contact', position: 'left'},
          {
            href: 'https://github.com/sustacek',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Contact',
            items: [
              {label: 'js@josefsustacek.cz', href: 'mailto:js@josefsustacek.cz'},
              {label: '+420 777 693 353', href: 'tel:+420777693353'},
            ],
          },
          {
            title: 'Elsewhere',
            items: [
              {label: 'GitHub', href: 'https://github.com/sustacek'},
              {label: 'LinkedIn', href: 'https://www.linkedin.com/in/josefsustacek'},
              {label: 'Twitter', href: 'https://www.twitter.com/sustacek'},
            ],
          },
          {
            title: 'More',
            items: [
              // 'pathname://' marks these as plain files (not Docusaurus routes): they open
              // directly instead of going through the client-side router, and are not
              // checked by the broken links check.
              {label: 'Resume (CV, PDF)', href: 'pathname:///files/resume/Josef-Sustacek-CV-20240708.pdf'},
              {label: 'Blog (Atom)', href: 'pathname:///blog/atom.xml'},
              {label: 'Blog (RSS)', href: 'pathname:///blog/rss.xml'},
            ],
          },
        ],
        copyright: `Josef Šustáček – ${description}`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['java', 'bash', 'properties'],
      },
    }),
};

module.exports = config;
