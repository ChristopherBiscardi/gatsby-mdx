import React from "react";
import { Link } from "gatsby";
import { color } from "./color";

const linkStyles = {
  cursor: "pointer",
  color: color.white,
  textDecoration: "none",
  flex: 1,
  display: "flex",
  borderBottom: `0px solid ${color.white}`,
  height: "100%",
  padding: "12px",
  "&:hover": {
    borderWidth: "3px"
  }
};

export const Navigation = () => (
  <div
    css={{
      background: color.dark,
      color: color.gatsby,
      display: "flex",
      height: "50px",
      position: "fixed",
      zIndex: 1,
      width: "100%"
    }}
  >
    <nav>
      <ul
        css={{
          display: "flex",
          listStyleType: "none",
          flex: 1,
          height: "100%"
        }}
      >
        {Object.entries({ Overview: "/", Docs: "/getting-started" }).map(
          ([label, href]) => (
            <li key={label}>
              <Link
                css={linkStyles}
                activeStyle={{
                  color: color.mdx,
                  borderColor: color.mdx,
                  borderWidth: "3px"
                }}
                to={href}
              >
                {label}
              </Link>
            </li>
          )
        )}
        <li>
          <a
            css={linkStyles}
            href="https://github.com/ChristopherBiscardi/gatsby-mdx"
          >
            GitHub
          </a>
        </li>
      </ul>
    </nav>
  </div>
);
