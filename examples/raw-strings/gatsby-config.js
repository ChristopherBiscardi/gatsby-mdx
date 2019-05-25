module.exports = {
  siteMetadata: {
    title: `Gatsby MDX raw strings`
  },
  plugins: [
    `gatsby-plugin-mdx`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `${__dirname}/content/`
      }
    }
  ]
};
