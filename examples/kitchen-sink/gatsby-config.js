module.exports = {
  siteMetadata: {
    title: `Gatsby with Emotion`
  },
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    `gatsby-mdx`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-93349937-2`
      }
    },
    `gatsby-plugin-offline`
  ]
};
