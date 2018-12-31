import React, { Fragment } from "react";
import { GoFold, GoUnfold } from "react-icons/go";

const ExpandAllButton = ({ onClick, expandAll }) => (
  <button
    onClick={onClick}
    css={{
      //      ...scale(-2 / 3),
      lineHeight: 1,
      background: `transparent`,
      border: `none`,
      borderRadius: "3px",
      color: "#edaf3d",
      display: `flex`,
      cursor: `pointer`,
      alignItems: `center`,
      flexGrow: 0,
      marginLeft: `auto`,
      //      paddingTop: rhythm(options.blockMarginBottom / 3),
      //      paddingBottom: rhythm(options.blockMarginBottom / 3),
      //      fontFamily: options.systemFontFamily.join(`,`),
      textAlign: `left`,
      transition: `all .2s`,
      "&:hover": {
        background: "#e0d6eb"
      }
    }}
  >
    {expandAll ? (
      <Fragment>
        <span>Collapse All</span>
        <Icon>
          <GoFold />
        </Icon>
      </Fragment>
    ) : (
      <Fragment>
        <span>Expand All</span>
        <Icon>
          <GoUnfold />
        </Icon>
      </Fragment>
    )}
  </button>
);

export default ExpandAllButton;

const Icon = props => (
  <span
    {...props}
    css={{
      display: `inline-block`,
      fontSize: `.9rem`,
      marginLeft: 8
    }}
  />
);
