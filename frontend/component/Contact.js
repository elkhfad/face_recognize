import React, { Component } from "react";
import Message from "./Message";
class Contact extends Component {
  render() {
    return (
      <div>
        <h2
          style={{
            color: "#009933",
            fontSize: "34px",
            textAlign: "left"
          }}
        >
          GOT QUESTIONS?
        </h2>
        <p
          style={{
            color: "#000000",
            fontSize: "24px",
            textAlign: "left"
          }}
        >
          Send message or post on our site
          <a href="https://reactjs.org/community/courses.html "> forums</a>
          <br />
          <br />
          <br />
          <Message />
        </p>
      </div>
    );
  }
}
export default Contact;
