import React, { Component } from "react";

export default class PageLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <h1>A Page</h1>
        <div>{children}</div>
      </div>
    );
  }
}
