import React, { Component } from "react";
import "../index.css";
import ImageInput from "../image/ImageInput";
import ImageList from "../image/ImageList";
import Main from "../component/Main";
import authenticationService from "../authentication/authenticationService";

class Etusivu extends Component {
  render() {
    return (
      <div className="Etusivu">
        <header className="Etusivu-header">
          <div className="Uuer">
            <h1 style={{ color: "#006600", fontSize: "30px" }}>
              Welcome {authenticationService.currentUserValue.username}{" "}
              <div className="float-right">
                <Main />
              </div>
            </h1>
            <br />
            <br />

            <ImageInput />
            <ImageList />

            <br />
            <br />
            <br />
          </div>
        </header>
      </div>
    );
  }
}
export default Etusivu;
