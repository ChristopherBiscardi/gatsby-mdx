import React from "react";
import renderer from "react-test-renderer";

import C from ".";

describe("mdx-component-autolink-header", () => {
  it("renders with a slug", () => {
    Array(6)
      .fill(undefined)
      .map((_, index) => {
        const i = index + 1;
        const result = renderer.create(<C is={`h${i}`}>Test Header</C>);
        expect(result.toJSON()).toEqual({
          type: `h${i}`,
          props: { id: index ? `test-header-${index}` : "test-header" },
          children: ["Test Header"]
        });
      });
  });

  it("defaults to h2", () => {
    const result = renderer.create(<C>Test Header</C>);
    expect(result.toJSON()).toEqual({
      type: `h2`,
      props: { id: "test-header-6" },
      children: ["Test Header"]
    });
  });
});
