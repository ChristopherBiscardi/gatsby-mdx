import React from "react";
import { Link } from "gatsby";
import { color } from "./color";

export const Navigation = () => (
  <div
    css={{
      background: color.dark,
      color: color.gatsby,
      display: "flex",
      height: "50px"
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
                css={{
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
                }}
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
      </ul>
    </nav>
  </div>
);
