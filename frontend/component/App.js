import React, { Component } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Home from "./Home";
import { Button } from "@material-ui/core";
import Register from "../login/Register";
import Login from "../login/Login";
import Contact from "../component/Contact";

import ImageInput from "../image/ImageInput";
import UserDetails from "../component/UserDetails";
import AccessControllList from "../image/AccessControllList";
import { PrivateRoute } from "../authentication/PrivateRouter";
import authenticationService from "../authentication/authenticationService";
import "../";
import UserPage from "../component/UserPage";

export default class App extends Component {
  constructor() {
    super();

    this.handleLogin = this.handleLogin.bind(this);
    authenticationService.currentUser.subscribe(user => {
      this.setState({});
    });
  }
  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data
    });
  }

  logout() {
    return (
      <a
        className={`${!authenticationService.currentUserValue && "hide"}`}
        href="/login"
        onClick={authenticationService.logout}
      >
        Logout
      </a>
    );
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <ul
            className="header"
            style={{
              color: "#ffffff",
              fontSize: "58px",
              backgroundColor: "#00264d"
            }}
          >
            <li>
              <Button>
                <Link to="/">Home</Link>
              </Button>
            </li>

            <div className="float-right">
              <li>
                <Button>
                  <a
                    className={`${authenticationService.currentUserValue &&
                      "hide"}`}
                    href="/login"
                  >
                    Login
                  </a>
                </Button>
              </li>
            </div>

            <li>
              <div className="float-right">
                <Button>{this.logout()}</Button>
              </div>
            </li>
            <li>
              <Button>
                <Link to="/userpage">User page</Link>
              </Button>
            </li>

            <li>
              <Button>
                <Link to="/AccessControllList">Access Control</Link>
              </Button>
            </li>
          </ul>
          <div className="content">
            <Switch>
              <Route exact path={"/"} component={Home} />

              <PrivateRoute path="/ImageInput" component={ImageInput} />
              <PrivateRoute
                path="/AccessControllList"
                component={AccessControllList}
              />
              <PrivateRoute path="/userPage" component={UserPage} />
              <PrivateRoute path="/UserDetails" component={UserDetails} />

              <Route path="/register" component={Register} />
              <Route path="/contact" component={Contact} />
              <Route path="/login" component={Login} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
