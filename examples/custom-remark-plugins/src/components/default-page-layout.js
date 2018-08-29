import React, { Component } from "react";
import "katex/dist/katex.min.css";
import "./prism.css";

export default class DefaultPageLayout extends Component {
  render() {
    return (
      <div>
        <h1>The Default Page Layout</h1>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
