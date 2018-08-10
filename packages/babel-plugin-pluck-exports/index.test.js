const Plugin = require(".");

const babel = require("@babel/core");

const testContents = `import React from "react";
import { graphql } from "gatsby";

export default ({ children }) => <div>{children}</div>;

export const pageQuery = graphql\`
  query MDXWhatever {
    name
  }
\`;
`;

describe("babel-plugin-pluck-exports", () => {
  test("plucks pageQuery", () => {
    const instance = new Plugin();
    const result = babel.transform(testContents, {
      plugins: [instance.plugin],
      presets: [require("@babel/preset-react")]
    });

    expect(result.code).toEqual(`import React from "react";
import { graphql } from "gatsby";
export default (({
  children
}) => React.createElement("div", null, children));`);

    expect(instance.state.exports).toEqual([
      `export const pageQuery = graphql\`
  query MDXWhatever {
    name
  }
\`;`
    ]);
  });
});
