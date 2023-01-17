import React, { useState } from "react";
const Counter = (OriginalComponent) => {
  class newComponent extends React.Component {
    constructor() {
      super();
      this.state = {
        count: 0,
      };
    }
    handler = () => {
      this.setState({ count: this.state.count + 1 });
    };
    render() {
      return (
        <OriginalComponent handler={this.handler} count={this.state.count} />
      );
    }
  }
  return newComponent;
};

export default Counter;
