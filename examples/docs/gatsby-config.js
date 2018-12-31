module.exports = {
  siteMetadata: {
    title: `gatsby-mdx docs`,
    description: `gatsby-mdx documentation`,
    docsLocation: `https://github.com/ChristopherBiscardi/gatsby-mdx/tree/master/examples/docs/`
  },
  plugins: [
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-mdx`,
      options: {
        defaultLayouts: { default: require.resolve("./src/templates/docs.js") },
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
        path: `${__dirname}/src/pages/`
      }
    }
  ]
};
