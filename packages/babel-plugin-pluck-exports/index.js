const declare = require("@babel/helper-plugin-utils").declare;
const t = require("@babel/core").types;
const generate = require("@babel/generator").default;

module.exports = class Plugin {
  constructor() {
    const exports = [];
    this.state = { exports: exports };
    this.plugin = declare(api => {
      api.assertVersion(7);

      return {
        //    inherits: syntaxExportDefaultFrom,

        visitor: {
          ExportNamedDeclaration(path) {
            const { node, scope } = path;
            const { specifiers } = node;
            const name = path.get("declaration.declarations.0").node.id.name;

            // TODO: make this check an option to the babel plugin if we need to
            // hoist any other exports.
            if (name === "pageQuery") {
              const pageQueryExport = path.hub.file.code.slice(
                path.node.start,
                path.node.end
              );
              exports.push(pageQueryExport);
              path.remove();
            }
          }
        }
      };
    });
  }
};
