const createMDXNode = require("gatsby-mdx/utils/create-mdx-node");

exports.onCreateNode = async ({
  node,
  actions,
  loadNodeContent,
  createNodeId
}) => {
  // Note: this is a meh API I think. There's very few reasons to
  // yield this level of control to the user. We can probably expose a
  // function with the signature ({node, content}) which handles the
  // parent/child relationship, node id creations, etc
  const { createNode, createParentChildLink } = actions;
  // do any checks for which content you want to transform here
  if (node.internal.type === "File") {
    const content = await loadNodeContent(node);
    const mdxNode = await createMDXNode({
      id: createNodeId(`${node.id} >>> Mdx`),
      node,
      content
    });
    createNode(mdxNode);
    createParentChildLink({ parent: node, child: mdxNode });
  }
};
