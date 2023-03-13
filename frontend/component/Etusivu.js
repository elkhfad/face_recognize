import React, { Component } from "react";
import App from ".//App";

import "../index.css";

class Etusivu extends Component {
  render() {
    return (
      <div className="Etusivu">
        <h1
          style={{
            color: "#99ccff",
            fontSize: "48px",
            backgroundColor: "#00264d"
          }}
        >
          Face Recognized
          <App />
        </h1>

        <header className="Etusivu-header">
          <div className="Etusivu-title"></div>
        </header>
      </div>
    );
  }
}
export default Etusivu;
