import { preToCodeBlock } from ".";

const preProps = {
  children: {
    $$typeof: Symbol("react.element"),
    props: {
      name: "code",
      components: {},
      parentName: "pre",
      props: {
        className: "language-js"
      },
      children: "const some = {}\n"
    }
  }
};

const preProps2 = {
  children: {
    $$typeof: Symbol("react.element"),
    props: {
      name: "code",
      components: {},
      parentName: "pre",
      props: {
        className: "language-js",
        metastring: "react-live",
        "react-live": true
      },
      children: "<button onClick={alert('clicked')}>Click Me!</button>\n"
    }
  }
};

describe("preToCodeBlock", () => {
  test("preToCodeBlock works", () => {
    expect(preToCodeBlock(preProps)).toEqual({
      codeString: "const some = {}",
      language: "js"
    });
  });

  test("preToCodeBlock passes metastring vars", () => {
    expect(preToCodeBlock(preProps2)).toEqual({
      codeString: "<button onClick={alert('clicked')}>Click Me!</button>",
      language: "js",
      metastring: "react-live",
      "react-live": true
    });
  });

  test("returns undefined if props dont match", () => {
    expect(preToCodeBlock({})).toBeUndefined();
  });
});
