export default ({
  scope: { React, MDXTag } = {},
  components = {},
  children,
  ...props
}) => {
  const fullScope = {
    components,
    props,
    React,
    MDXTag
  };

  // children is pre-compiled mdx
  const keys = Object.keys(fullScope);
  const values = keys.map(key => fullScope[key]);
  const fn = new Function("_fn", "React", ...keys, `return ${children}`);

  return fn({}, React, ...values);
};
