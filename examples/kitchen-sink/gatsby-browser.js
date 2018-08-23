/* globals window */
import React from "react";
import { hydrate } from "emotion";
import Wrapper from "./root-wrapper";

export const onInitialClientRender = () => {
  if (
    typeof window !== `undefined` &&
    typeof window.__EMOTION_CRITICAL_CSS_IDS__ !== `undefined`
  ) {
    hydrate(window.__EMOTION_CRITICAL_CSS_IDS__);
  }
};

export const wrapRootElement = ({ element } /*, options*/) => {
  return <Wrapper>{element}</Wrapper>;
};
