module.exports = {
  siteMetadata: {
    title: `Gatsby with Emotion`
  },
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    `gatsby-mdx`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/content/`
      }
    },
    `gatsby-plugin-offline`
  ]
};
