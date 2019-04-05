module.exports = {
  siteMetadata: {
    title: `Gatsby MDX Kitchen Sink`,
    siteUrl: "gatsby-mdx-kitchen-sink.netlify.com",
    description: "everything you can do with gatsby-mdx"
  },
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        globalScope: `import { SketchPicker } from 'react-color';
        export default { Picker: SketchPicker }`,
        defaultLayouts: {
          posts: require.resolve("./src/components/default-post-layout.js"),
          default: require.resolve("./src/components/default-page-layout.js")
        }
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/content/`
      }
    },
    "gatsby-transformer-remark",
    `gatsby-plugin-offline`
  ]
};
