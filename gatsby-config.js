module.exports = {
  siteMetadata: {
    title: `Orbital`,
    author: `Prime Ordinal`,
    description: `Lorem ipsum dolor sit amet`,
    siteUrl: `https://orbital-web-app.netlify.com/`,
    social: {
      twitter: `primeordinal`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    // {
    //   resolve: "gatsby-source-graphql",
    //   options: {
    //     // This type will contain remote schema Query type
    //     typeName: "PostGraphile",
    //     // This is the field under which it's accessible
    //     fieldName: "postgraphile",
    //     // URL to query from
    //     url: "http://localhost:5000/graphql",
    //   },
    // },
    // {
    //   resolve: "gatsby-source-graphql",
    //   options: {
    //     // This type will contain remote schema Query type
    //     typeName: "SWAPI",
    //     // This is the field under which it's accessible
    //     fieldName: "swapi",
    //     // URL to query from
    //     url: "https://api.graphcms.com/simple/v1/swapi",
    //   },
    // },
    {
      resolve: "gatsby-source-pg",
      options: {
        appendPlugins: [require("@graphile-contrib/pg-simplify-inflector"), require("@graphile-contrib/pg-many-to-many")],
        connectionString: "postgres:///orbital",
        refetchInterval: 60, // Refetch data every 60 seconds
        schema: "forum_example",
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    // `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        // jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "YOUR_GOOGLE_TAGMANAGER_ID",
  
        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,
  
        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        // Defaults to null
        defaultDataLayer: { platform: "gatsby" },
  
        // Specify optional GTM environment details.
        gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
        gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
        dataLayerName: "YOUR_DATA_LAYER_NAME",
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /assets/ // See below to configure properly
        }
      }
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-netlify`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-sitemap`,
  ],
}
