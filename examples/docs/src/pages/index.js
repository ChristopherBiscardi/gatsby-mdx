import React from "react";
import { Backpack } from "react-kawaii";
import { useRef, useState, useEffect } from "react";
import { color } from "../components/color";
import { Navigation } from "../components/navigation";

import WhatIsGatsby from "../homepage-sections/what-is-gatsby.mdx";
import WhatIsMDX from "../homepage-sections/what-is-mdx.mdx";
import WhatCanIDo from "../homepage-sections/what-can-i-do.mdx";

function useHover() {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener("mouseout", handleMouseOut);

        return () => {
          node.removeEventListener("mouseover", handleMouseOver);
          node.removeEventListener("mouseout", handleMouseOut);
        };
      }
    },
    [ref.current] // Recall only if ref changes
  );

  return [ref, value];
}

const GetStarted = () => {
  const [hoverRef, isHovered] = useHover();

  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1rem"
      }}
    >
      <Backpack
        size={120}
        mood={isHovered ? "excited" : "happy"}
        color={color.mdx}
      />
      <div css={{ marginLeft: "2rem" }}>
        <a
          href="/getting-started"
          ref={hoverRef}
          css={{
            cursor: "pointer",
            padding: ".5rem .75rem",
            border: `3px solid ${color.gatsby}`,
            color: color.white,
            textDecoration: "none",
            "&:hover": { background: color.gatsby }
          }}
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div
      css={{
        color: color.white
      }}
    >
      <Navigation />
      <div
        css={{
          //          background: color.gatsby,
          background: `linear-gradient(45deg, ${color.gatsby} 0%,${
            color.mdx
          } 100%)`,
          padding: "8rem 4rem",
          textAlign: "center",
          textShadow: `0px 0px 2px ${color.dark}`
        }}
      >
        <h1>Gatsby+MDX</h1>
        <h2>Bringing MDX to Gatsby for ambitious projects</h2>
        <GetStarted />
      </div>
      <Section bgColor={color.white} color={color.dark}>
        <div css={{ flex: 1, padding: "0 1rem" }}>
          <WhatIsGatsby location={{ pathname: "/" }} />
        </div>
        <div css={{ flex: 1, padding: "0 1rem" }}>
          <WhatIsMDX location={{ pathname: "/" }} />
        </div>
      </Section>
      <Section bgColor={color.dark} color={color.white}>
        <WhatCanIDo location={{ pathname: "/" }} />
      </Section>
    </div>
  );
};

const Section = ({ children, bgColor, color }) => (
  <div
    css={{
      background: bgColor,
      minHeight: "600px",
      color,
      paddingTop: "2rem",
      paddingBottom: "2rem"
    }}
  >
    <div
      css={{
        maxWidth: "960px",
        display: "flex",
        margin: "auto",
        lineHeight: "1.5",
        "& li": { marginTop: ".5rem" }
      }}
    >
      {children}
    </div>
  </div>
);

export default HomePage;
