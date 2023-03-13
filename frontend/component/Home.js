import React, { Component } from "react";
export default class Home extends Component {
  render() {
    return (
      <div className="container">
        <header className="Home-header">
          <h2 style={{ color: "#006600", fontSize: "24px", textAlign: "left" }}>
            Kerromme lyhyeesti toiminnastamme
          </h2>

          <h1 style={{ color: "#006600", fontSize: "24px", textAlign: "left" }}>
            Tämän ohjelman tarkoituksena on ilmoittaa, jos löytyy tuntematon
            henkilö.
          </h1>
          <br />
          <br />
          <br />
          <h1 style={{ color: "#000099", fontSize: "24px", textAlign: "left" }}>
            Toimii seuraavasti:
          </h1>
          <br />

          <ul className="lista">
            <li
              style={{ color: "#000099", fontSize: "20px", textAlign: "left" }}
            >
              Registeröidy järjestelmään
            </li>
            <li
              style={{ color: "#000099", fontSize: "20px", textAlign: "left" }}
            >
              Kirjaudu tunnuksillasi järjestelmään
            </li>
            <li
              style={{ color: "#000099", fontSize: "20px", textAlign: "left" }}
            >
              Laita järjestelmään kaikkien henkilöiden kuvat, joita tunnet
            </li>
            <li
              style={{ color: "#000099", fontSize: "20px", textAlign: "left" }}
            >
              Ohjelma ilmoittaa sitten jos löytyy tuntematon vierailija
            </li>
          </ul>
        </header>
      </div>
    );
  }
}
