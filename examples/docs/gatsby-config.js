module.exports = {
  siteMetadata: {
    title: `gatsby-mdx docs`,
    description: `gatsby-mdx documentation`,
    docsLocation: `https://github.com/ChristopherBiscardi/gatsby-mdx/tree/master/examples/docs/content`
  },
  plugins: [
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1035,
              sizeByPixelDensity: true
            }
          }
        ]
      }
    },
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "docs",
        path: `${__dirname}/content/`
      }
    }
  ]
};
