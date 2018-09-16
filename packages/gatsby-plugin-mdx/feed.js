/**
 * Configuration for `gatsby-plugin-feed` equivalent to the default, but for MDX
 * instead of remark.
 *
 * Original default: https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-feed/src/internals.js#L20
 * Usage: gatsby-config.js
 *
 * ```
 * const mdxFeed = require("gatsby-mdx/feed");
 *
 * module.exports = {
 *   plugins: [
 *     {
 *       resolve: `gatsby-plugin-feed`,
 *       options: mdxFeed
 *     }
 *   ]
 * };
 * ```
 *
 */
module.exports = {
  /**
   * no need to specify the other options, since they will be merged with this
   */
  feeds: [
    {
      serialize: ({ query: { site, allMdx } }) => {
        return allMdx.edges.map(edge => {
          return {
            ...edge.node.frontmatter,
            description: edge.node.excerpt,
            url: site.siteMetadata.siteUrl + edge.node.fields.slug,
            guid: site.siteMetadata.siteUrl + edge.node.fields.slug
          };
        });
      },
      query: `
      {
        allMdx(
          limit: 1000,
          sort: {
            order: DESC,
            fields: [frontmatter___date]
          }
        ) {
          edges {
            node {
              frontmatter {
                title
                date
              }
              fields {
                slug
              }
              excerpt
            }
          }
        }
      }
    `,
      output: `rss.xml`
    }
  ]
};
