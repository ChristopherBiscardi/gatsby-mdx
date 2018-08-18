const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const componentWithMDXScope = require('gatsby-mdx/component-with-mdx-scope')
const slugify = require('slugify')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
          {
            allContentfulBlogPostMdx {
              edges {
                node {
                  id
                  code {
                    scope
                  }
                  meta {
                    title
                  }
                }
              }
            }
            allMdx(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  code {
                    scope
                  }
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors) // eslint-disable-line no-console
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allMdx.edges

        _.each(posts, (post, index) => {
          const previous =
            index === posts.length - 1 ? null : posts[index + 1].node
          const next = index === 0 ? null : posts[index - 1].node

          createPage({
            path: post.node.fields.slug,
            component: componentWithMDXScope(
              blogPost,
              post.node.code.scope,
              __dirname
            ),
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })
        })

        result.data.allContentfulBlogPostMdx.edges.forEach(({ node }) => {
          createPage({
            path: `/contentful/${slugify(node.meta.title, { lower: true })}`,
            component: componentWithMDXScope(
              path.resolve('./src/templates/contentful-post.js'),
              node.code.scope,
              __dirname
            ),
            context: { id: node.id },
          })
        })
      })
    )
  })
}

exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
