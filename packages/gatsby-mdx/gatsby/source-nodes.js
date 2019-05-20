const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLJSON
} = require("gatsby/graphql");
const _ = require("lodash");
const remark = require("remark");
const english = require("retext-english");
const remark2retext = require("remark-retext");
const unified = require("unified");
const visit = require("unist-util-visit");
const remove = require("unist-util-remove");
const toString = require("mdast-util-to-string");
const generateTOC = require("mdast-util-toc");
const prune = require("underscore.string/prune");

const debug = require("debug")("gatsby-mdx:extend-node-type");
const getTableOfContents = require("../utils/get-table-of-content");
const defaultOptions = require("../utils/default-options");
const genMDX = require("../utils/gen-mdx");
const { mdxHTMLLoader: loader } = require("../utils/render-html");

async function getCounts({ mdast }) {
  let counts = {};

  // convert the mdxast to back to mdast
  remove(mdast, "import");
  remove(mdast, "export");
  visit(mdast, "jsx", node => {
    node.type = "html";
  });

  await remark()
    .use(
      remark2retext,
      unified()
        .use(english)
        .use(count)
    )
    .run(mdast);

  function count() {
    return counter;
    function counter(tree) {
      visit(tree, visitor);
      function visitor(node) {
        counts[node.type] = (counts[node.type] || 0) + 1;
      }
    }
  }

  return {
    paragraphs: counts.ParagraphNode,
    sentences: counts.SentenceNode,
    words: counts.WordNode
  };
}

module.exports = (
  { store, pathPrefix, getNode, getNodes, cache, reporter, actions, schema },
  pluginOptions
) => {
  let mdxHTMLLoader;
  const { createTypes } = actions;

  const options = defaultOptions(pluginOptions);

  createTypes(`
  type MdxFrontmatter {
title: String!

}
  type MdxHeadingMdx {
    value: String
    depth: Int
  }

  enum HeadingsMdx {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6
  }
`);

  /**
   * Support gatsby-remark parser plugins
   */
  for (let plugin of options.gatsbyRemarkPlugins) {
    debug("requiring", plugin.resolve);
    const requiredPlugin = require(plugin.resolve);
    debug("required", plugin);
    if (_.isFunction(requiredPlugin.setParserPlugins)) {
      for (let parserPlugin of requiredPlugin.setParserPlugins(
        plugin.pluginOptions
      )) {
        if (_.isArray(parserPlugin)) {
          const [parser, parserPluginOptions] = parserPlugin;
          debug(
            "adding remarkPlugin with options",
            plugin,
            parserPluginOptions
          );
          options.remarkPlugins.push([parser, parserPluginOptions]);
        } else {
          debug("adding remarkPlugin", plugin);
          options.remarkPlugins.push(parserPlugin);
        }
      }
    }
  }

  const processMDX = ({ node }) =>
    genMDX({ node, getNode, getNodes, reporter, cache, pathPrefix, options });

  // New Code // Schema
  const MdxType = schema.buildObjectType({
    name: "Mdx",
    fields: {
      rawBody: { type: "String!" },
      fileAbsolutePath: { type: "String!" },
      frontmatter: { type: "MdxFrontmatter" },
      body: {
        type: `String!`,
        async resolve(mdxNode) {
          const { body } = await processMDX({ node: mdxNode });
          return body;
        }
      },
      excerpt: {
        type: `String!`,
        args: {
          pruneLength: {
            type: `Int`,
            defaultValue: 140
          }
        },
        async resolve(mdxNode, { pruneLength }) {
          if (mdxNode.excerpt) {
            return Promise.resolve(mdxNode.excerpt);
          }
          const { mdast } = await processMDX({ node: mdxNode });

          const excerptNodes = [];
          visit(mdast, node => {
            if (node.type === "text" || node.type === "inlineCode") {
              excerptNodes.push(node.value);
            }
            return;
          });

          return prune(excerptNodes.join(" "), pruneLength, "…");
        }
      },
      headings: {
        type: `[MdxHeadingMdx]`,
        args: {
          depth: {
            type: `HeadingsMdx`
          }
        },
        async resolve(mdxNode, { depth }) {
          // TODO: change this to operate on html instead of mdast
          const { mdast } = await processMDX({ node: mdxNode });
          let headings = [];
          visit(mdast, "heading", heading => {
            headings.push({
              value: toString(heading),
              depth: heading.depth
            });
          });
          if (typeof depth === `number`) {
            headings = headings.filter(heading => heading.depth === depth);
          }
          return headings;
        }
      },
      html: {
        type: `String`,
        async resolve(mdxNode) {
          if (mdxNode.html) {
            return Promise.resolve(mdxNode.html);
          }
          const { body } = await processMDX({ node: mdxNode });
          try {
            if (!mdxHTMLLoader) {
              mdxHTMLLoader = loader({ reporter, cache, store });
            }
            const html = await mdxHTMLLoader.load({ ...mdxNode, body });
            return html;
          } catch (e) {
            reporter.error(
              `Error querying the \`html\` field. This field is intended for use with RSS feed generation.
If you're trying to use it in application-level code, try querying for \`Mdx.body\` instead.
Original error:
${e}`
            );
          }
        }
      },
      mdxAST: {
        type: GraphQLJSON,
        async resolve(mdxNode) {
          const { mdast } = await processMDX({ node: mdxNode });
          return mdast;
        }
      },
      tableOfContents: {
        type: `JSON`,
        args: {
          maxDepth: {
            type: `Int`,
            default: 6
          }
        },
        async resolve(mdxNode, { maxDepth }) {
          const { mdast } = await processMDX({ node: mdxNode });
          const toc = generateTOC(mdast, maxDepth);

          return getTableOfContents(toc.map, {});
        }
      },
      timeToRead: {
        type: `Int`,
        async resolve(mdxNode) {
          const { mdast } = await processMDX({ node: mdxNode });
          const { words } = await getCounts({ mdast });
          let timeToRead = 0;
          const avgWPM = 265;
          timeToRead = Math.round(words / avgWPM);
          if (timeToRead === 0) {
            timeToRead = 1;
          }
          return timeToRead;
        }
      },
      wordCount: {
        type: new GraphQLObjectType({
          name: `wordCountsMdx`,
          fields: {
            paragraphs: {
              type: GraphQLInt
            },
            sentences: {
              type: GraphQLInt
            },
            words: {
              type: GraphQLInt
            }
          }
        }),
        async resolve(mdxNode) {
          const { mdast } = await processMDX({ node: mdxNode });
          return getCounts({ mdast });
        }
      }
    },
    interfaces: [`Node`]
  });
  createTypes(MdxType);
};
