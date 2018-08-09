const mkdirp = require("mkdirp");
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

// TODO hash the query name with the scope hash
const query =
  'export const pageQuery = graphql`query  { mdx(id: { eq: "e8215648-9479-5521-86f0-988e189139c7" }) { id codeBody } }`';
module.exports = function componentWithMDXScope(
  absWrapperPath,
  codeScopeAbsPath,
  projectRoot
) {
  mkdirp.sync(path.join(projectRoot, CACHE_DIR, PLUGIN_DIR, MDX_WRAPPERS_DIR));

  const newWrapper = `// .cache/gatsby-mdx/wrapper-components/{wrapper}-{scope-hash}.js
import React from 'react';

import __mdxScope from '${codeScopeAbsPath}';
console.log(__mdxScope)
  //const __mdxScope = {}

import OriginalWrapper from '${absWrapperPath}';

import { graphql } from 'gatsby';

${query};
//  export { pageQuery };

export default ({children, ...props}) => <OriginalWrapper {...props} __mdxScope={__mdxScope}>{children}</OriginalWrapper>`;

  const absPathToNewWrapper = createFilePath(
    projectRoot,
    `${createHash(absWrapperPath)}--${createHash(codeScopeAbsPath)}`,
    ".js"
  );

  fs.writeFileSync(absPathToNewWrapper, newWrapper);

  return absPathToNewWrapper;
};

const CACHE_DIR = `.cache`;
const PLUGIN_DIR = `gatsby-mdx`;
const MDX_WRAPPERS_DIR = `mdx-wrappers-dir`;

const createFilePath = (directory, filename, ext) =>
  path.join(
    directory,
    CACHE_DIR,
    PLUGIN_DIR,
    MDX_WRAPPERS_DIR,
    `${filename}${ext}`
  );

const createHash = str =>
  crypto
    .createHash(`md5`)
    .update(str)
    .digest(`hex`);
