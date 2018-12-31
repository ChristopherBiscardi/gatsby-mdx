import React from "react";
import { css } from "@emotion/core";

const lineHeight = 1.5;
export const P = props => (
  <p
    css={css`
      font-family: "Inter UI", sans-serif;
      /* Reading Width */
      // width should be between 45 and 75 characters, 66 is preferred
      max-width: 38em;
      min-width: 23em;

      /* Typographic Color */
      line-height: ${lineHeight};

      /* Hyphenation */
      hyphenate-limit-lines: 2;
      hyphenate-limit-char: 6 3 2;
      // legacy hyphenate-limit-char support
      hyphenate-limit-before: 3;
      hyphenate-limit-after: 2;
      hyphenate-limit-zone: 8%;
      hyphenate-limit-last: always;

      /* Ligatures */
      font-feature-settings: "liga" 1;
      @supports (font-variant-ligatures: common-ligatures) {
        font-feature-settings: normal;
        font-variant-ligatures: common-ligatures;
      }

      margin-top: 1.5em;
      & + & {
        text-indent: ${lineHeight}em;
      }

      // oldstyle numbs
      font-variant-numeric: oldstyle-nums;
    `}
    {...props}
  />
);
