export default ({ scope = {}, components = {}, children, ...props }) => {
  const fullScope = {
    components,
    props,
    ...scope
  };

  // children is pre-compiled mdx
  const keys = Object.keys(fullScope);
  const values = keys.map(key => fullScope[key]);
  const fn = new Function("_fn", ...keys, `return ${children}`);

  return fn({}, ...values);
};
