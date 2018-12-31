import React from "react";

const Heading = ({ as: Component, ...props }) => (
  <Component {...props} css={{ marginTop: "1em" }} />
);

export default Heading;
