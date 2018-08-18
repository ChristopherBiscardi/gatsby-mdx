const declare = require("@babel/helper-plugin-utils").declare;

module.exports = class Plugin {
  constructor() {
    const exports = [];
    this.state = { exports: exports };
    this.plugin = declare(api => {
      api.assertVersion(7);

      return {
        visitor: {
          ExportNamedDeclaration(path) {
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
