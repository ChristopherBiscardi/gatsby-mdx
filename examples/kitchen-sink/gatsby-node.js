const componentWithMDXScope = require("gatsby-mdx/component-with-mdx-scope");
const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
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
                  fileAbsolutePath
                  codeScope
                  codeBody
                  fileNode {
                    name
                    sourceInstanceName
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        // Create blog posts pages.
        result.data.allMdx.edges.forEach(({ node }) => {
          if (node.fileNode.sourceInstanceName === "slides") {
            createPage({
              path: `/${node.fileNode.sourceInstanceName}/${
                node.fileNode.name
              }`,
              component: componentWithMDXScope(
                path.resolve("./src/components/mdx-runtime-slides-test.js"),
                node.codeScope,
                __dirname
              ),
              context: {
                absPath: node.absolutePath,
                tableOfContents: node.tableOfContents,
                id: node.id
              }
            });
          } else {
            createPage({
              path: `/${node.fileNode.sourceInstanceName}/${
                node.fileNode.name
              }`,
              component: componentWithMDXScope(
                path.resolve("./src/components/mdx-runtime-test.js"),
                node.codeScope,
                __dirname
              ),
              context: {
                absPath: node.absolutePath,
                tableOfContents: node.tableOfContents,
                id: node.id
              }
            });
          }
        });

        createPage({
          path: `/generated/multi-mdx`,
          component: componentWithMDXScope(
            path.resolve("./src/components/mdx-runtime-multi-test.js"),
            result.data.allMdx.edges.map(({ node }) => node.codeScope),
            __dirname
          ),
          context: {}
        });
      })
    );
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"]
    }
  });
};
