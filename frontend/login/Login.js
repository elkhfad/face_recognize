import React, { Component } from "react";
import { Button } from "@material-ui/core";
import authenticationService from "../authentication/authenticationService";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  //validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  //validate the form was filled out
  Object.values(rest).forEach(val => {
    (val == null || val.length === 0) && (valid = false);
  });

  return valid;
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      username: "",
      formErrors: {
        password: "",
        username: ""
      }
    };

    this.handleClearForm = this.handleClearForm.bind(this);
    if (authenticationService.currentUserValue) {
      this.props.history.push("/userPage");
    }
  }

  handleChange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characters required" : "";
        break;
      case "username":
        formErrors.username =
          value.length < 6 ? "minimum 6 characters required" : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Password: ${this.state.password}
        username:${this.state.username}

      `);
      event.target.reset();
    } else {
      console.error("Form invalid - display error message");
    }

    const user = authenticationService
      .login(this.state.username, this.state.password)
      .then(user => {
        this.props.history.push("/userPage");
      });
  };
  handleClearForm(e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      password: "",
      username: "",
      formErrors: {
        password: "",
        username: ""
      }
    });
  }

  render(RESET) {
    const { formErrors } = this.state;
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1
            style={{
              color: "#006600",
              fontSize: "30px"
            }}
          >
            Login
          </h1>
          <form onSubmit={this.handleSubmit}>
            <div className="username">
              <label htmlFor="username">Username</label>
              <input
                className={formErrors.username.length > 0 ? "error" : null}
                placeholder="Username"
                type="username"
                name="username"
                noValidate
                onChange={this.handleChange}
                style={{ color: "#000000", fontSize: "20px" }}
              />
              {formErrors.username.length > 0 && (
                <span className="errorMessage">{formErrors.username}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
                style={{ color: "#000000", fontSize: "20px" }}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="login">
              <Button outline="true" color="primary" size="small" type="submit">
                Login
              </Button>

              <h1
                style={{
                  color: "#006600",
                  fontSize: "14px",
                  textAlign: "center"
                }}
              >
                Don't Have An Account ? Create one
              </h1>
              <Button outline="true" color="inherit" size="small" type="submit">
                <a href="./Register"> Register</a>
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
