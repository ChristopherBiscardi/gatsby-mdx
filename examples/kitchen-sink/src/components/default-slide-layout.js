import React, { Component } from "react";

export default class DefaultSlideLayout extends Component {
  render() {
    const { children } = this.props;
    return <div data-id="custom-mdx-slide-layout">{children}</div>;
  }
}
