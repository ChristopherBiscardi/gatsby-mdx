module.exports = {
  siteMetadata: {
    title: `Gatsby MDX with Custom Remark Plugins`
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "liek",
        path: `${__dirname}/src/pages`
      }
    },
    `gatsby-plugin-emotion`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        defaultLayout: require.resolve(
          "./src/components/default-page-layout.js"
        ),
        remarkPlugins: [require("remark-toc")],
        gatsbyRemarkPlugins: [
          { resolve: `gatsby-remark-katex` },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1035,
              sizeByPixelDensity: true
            }
          },
          { resolve: "gatsby-remark-autolink-headers" },
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
