module.exports = {
  siteMetadata: {
    title: `Gatsby MDX Kitchen Sink`
  },
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-mdx`,
      options: {
        root: __dirname,
        extensions: [".mdx", ".md"],
        defaultLayout: require.resolve(
          "./src/components/default-page-layout.js"
        ),
        mdPlugins: [require("remark-toc")],
        gatsbyRemarkPlugins: [
          { resolve: `gatsby-remark-katex` },
          { resolve: "gatsby-remark-prismjs", options: {} }
        ]
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/content/`
      }
    }
  ]
};
