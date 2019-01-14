import React from "react";
import GHSlugger from "github-slugger";
const slugger = new GHSlugger();

const AutoLinkHeader = ({ is: Component, ...props }) => (
  <Component id={slugger.slug(props.children)} {...props} />
);

export default AutoLinkHeader;
