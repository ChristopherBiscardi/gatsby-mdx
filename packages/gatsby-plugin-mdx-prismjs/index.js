const {
  GatsbyComponentPrismjsReplacement,
  GatsbyComponentPrismjsReplacementInline
} = require("./components");

exports.guards = {};
exports.components = {
  inlineCode: GatsbyComponentPrismjsReplacementInline,
  pre: GatsbyComponentPrismjsReplacement
};
