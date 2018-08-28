const componentWithMDXScope = require('gatsby-mdx/component-with-mdx-scope')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx {
              edges {
                node {
                  id
                  tableOfContents
                  code {
                    scope
                  }
                  parent {
                    ... on File {
                      absolutePath
                      name
                      sourceInstanceName
                    }
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
        result.data.allMdx.edges.forEach(({ node }) => {
          createPage({
            path: `/${node.parent.sourceInstanceName}/${node.parent.name}`,
            component: componentWithMDXScope(
              path.resolve('./src/components/content-layout.js'),
              node.code.scope,
              __dirname
            ),
            context: {
              absPath: node.parent.absolutePath,
              tableOfContents: node.tableOfContents,
              id: node.id,
            },
          })
        })
      })
    )
  })
}
