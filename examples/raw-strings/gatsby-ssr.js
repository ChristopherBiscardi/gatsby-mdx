import React from "react";
import { renderToString } from "react-dom/server";
import { extractCritical } from "emotion-server";
import Wrapper from "./root-wrapper";

let emotionSSR = { html: undefined, css: undefined, ids: undefined };

export const wrapRootElement = ({ element } /*, options*/) => {
  const string = renderToString(<Wrapper>{element}</Wrapper>);
  emotionSSR = extractCritical(string);
  return <Wrapper>{element}</Wrapper>;
};

export const onRenderBody = ({ setHeadComponents }) => {
  const criticalStyle = (
    <style
      key="emotion-css"
      dangerouslySetInnerHTML={{ __html: emotionSSR.css }}
    />
  );
  const criticalIds = (
    <script
      key="emotion-rehydration"
      dangerouslySetInnerHTML={{
        __html: `window.__EMOTION_CRITICAL_CSS_IDS__ = ${JSON.stringify(
          emotionSSR.ids
        )};`
      }}
    />
  );

  setHeadComponents([criticalIds, criticalStyle]);
  //  replaceBodyHTMLString(html);
};
