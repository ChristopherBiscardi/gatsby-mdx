const mdx = require(`@mdx-js/mdx`);
const _ = require(`lodash`);
const crypto = require(`crypto`);
const path = require(`path`);

async function onCreateNode({ node, actions, loadNodeContent, createNodeId }) {
  function transformObject(obj, id, type) {
    const objStr = JSON.stringify(obj);
    const yamlNode = {
      ...obj,
      id,
      children: [],
      parent: node.id,
      internal: {
        contentDigest: crypto
          .createHash(`md5`)
          .update(objStr)
          .digest(`hex`),
        type
      }
    };
    createNode(yamlNode);
    createParentChildLink({ parent: node, child: yamlNode });
  }

  const { createNode, createParentChildLink } = actions;

  if (node.internal.mediaType !== `text/mdx`) {
    return;
  }

  const content = await loadNodeContent(node);
  const parsedContent = await mdx(content);

  if (_.isArray(parsedContent)) {
    parsedContent.forEach((obj, i) => {
      transformObject(
        obj,
        obj.id ? obj.id : createNodeId(`${node.id} [${i}] >>> MDX`),
        _.upperFirst(_.camelCase(`${node.name} Mdx`))
      );
    });
  } else if (_.isPlainObject(parsedContent)) {
    transformObject(
      parsedContent,
      parsedContent.id ? parsedContent.id : createNodeId(`${node.id} >>> MDX`),
      _.upperFirst(_.camelCase(`${path.basename(node.dir)} Mdx`))
    );
  }
}

exports.onCreateNode = onCreateNode;
