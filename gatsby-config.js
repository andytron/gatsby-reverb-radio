module.exports = {
  siteMetadata: {
    title: `Reverberation Radio`,
    author: `Andrew Huang`,
    description: `Description coming soon.`,
    siteUrl: `https://reverberation-radio-ii-demo.netlify.app/`,
    links: {
      tikiRocketUrl: `tikirocket.com`,
      podcast: `reverberation-radio/id520739212`,
      instagram: `reverberationradio`,
      twitter: `reverb_radio`,
      email: `gm@tikirocket.com`,
    },
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-offline`,
    // `gatsby-plugin-remove-serviceworker`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/images`,
        name: `uploads`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts`,
        name: `post`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages`,
        name: `pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/images`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data`,
        name: `data`,
      },
    },
    `gatsby-transformer-json`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              loading: `lazy`,
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destinationDir: `static`,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },
          {
            resolve: `gatsby-remark-smartypants`,
          },
        ],
        plugins: [
          {
            resolve: `gatsby-remark-images`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Reverberation Radio`,
        short_name: `Reverb Radio`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/images/reverblogo.png`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
        customizeWebpackConfig: (config, { plugins }) => {
          config.plugins.push(
            plugins.define({
              __MANIFEST_PLUGIN_HAS_LOCALISATION__: JSON.stringify('false'),
            }),
          );
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `raleway:300,400,600,700,900`,
          `libre baskerville:300,400,600,700`,
          `barlow condensed:300,400,500,600,700,800,900`,
        ],
        display: `swap`,
      },
    },
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `https://reverberationradio.libsyn.com/rss`,
        name: `ReverbRadio`,
        // Optional: parser document https://github.com/bobby-brennan/rss-parser#readme
        parserOption: {
          customFields: {
            title: ["title"],
            date: ["pubDate"],
            audio: ["enclosure.$.url"],
            artwork: ["itunes:image"],
            description: ["description"],
            keywords: ["itunes:keywords"],
          },
        },
      },
    },
    // {
    //   resolve: `gatsby-source-bandsintown`,
    //   options: {
    //     key: ``,
    //     artist: `Reverberation`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    // {
    //   resolve: `gatsby-plugin-typography`,
    //   options: {
    //     pathToConfigModule: `src/utils/typography`,
    //   },
    // },
    // {
    //   resolve: `gatsby-plugin-purgecss`,
    //   options: {
    //     develop: true,
    //     purgeOnly: [`/index.scss`],
    //   },
    // },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        mergeLinkHeaders: false,
        mergeCachingHeaders: false
      },
    }
  ],
}
