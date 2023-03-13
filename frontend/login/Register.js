import React, { Component } from "react";
import { Button } from "@material-ui/core";
import axios from "axios";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
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

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      username: "",
      role: ["admin", "pm"],

      formErrors: {
        name: "",
        email: "",
        password: "",
        username: ""
      }
    };
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;

    this.validate(name, value);
  };
  validate = (name, value) => {
    let formErrors = this.state.formErrors;
    switch (name) {
      case "name":
        formErrors.name =
          value.length < 6 ? "minimum 6 characters required" : "";
        break;

      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "email.taken":
        formErrors.email = "invalid email";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characters required" : "";
        break;

      case "username":
        formErrors.username =
          value.length < 6 ? "minimum 6 characters required" : "";
        break;
      case "username.taken":
        formErrors.username = "invalid username";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors,
        [name]: value
      } /*, () => console.log(this.state));*/
    );
  };

  handleSubmit = event => {
    event.preventDefault();

    if (formValid(this.state)) {
      console.log(`
      --SUBMITTING--
      Name: ${this.state.name}
      Email: ${this.state.email}
      Password: ${this.state.password}
      username:${this.state.username}
      role:${this.state.role}
      `);
      console.log(event);
      console.info("Valid Form");
    } else {
      console.log(event);
    }

    const url = "/api/auth/signup";

    const data = {
      name: this.state.name,
      role: this.state.role,
      email: this.state.email,
      password: this.state.password,
      username: this.state.username
    };

    axios
      .post(url, data, {
        headers: { "Content-Type": "application/json" }
      })
      .then(res => {
        console.log(res);
        if (res.status === 201) {
          console.log(res);
          //   this.props.handle.handleSuccessfulAuth(res.data);
          console.log(res);

          this.props.history.push("/Login");
        }
      })

      .catch(error => {
        console.error(" registration error:", error.response);
        if (error.response && error.response.data.key) {
          this.validate(error.response.data.key);
        } else {
          console.log(error);
        }
      });
  };

  render() {
    const { formErrors } = this.state;
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1
            style={{
              color: "#99ccff",
              fontSize: "30px",
              backgroundColor: "#00264d"
            }}
          >
            Create Account
          </h1>
          {this.state.errorMessage && (
            <h3 className="error"> {this.state.errorMessage} </h3>
          )}

          <form onSubmit={this.handleSubmit} validate="true">
            <div className="name">
              <label htmlFor="name">Name</label>
              <input
                className={formErrors.name.length > 0 ? "error" : null}
                placeholder="Name"
                type="text"
                name="name"
                validate="true"
                onChange={this.handleChange}
                style={{ color: "#000000", fontSize: "20px" }}
              />

              {formErrors.name.length > 0 && (
                <span className="errorMessage">{formErrors.name}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                validate="true"
                onChange={this.handleChange}
                style={{ color: "#000000", fontSize: "20px" }}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="username">
              <label htmlFor="username">Username</label>
              <input
                className={formErrors.username.length > 0 ? "error" : null}
                placeholder="Username"
                type="username"
                name="username"
                validate="true"
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
                validate="true"
                onChange={this.handleChange}
                style={{ color: "#000000", fontSize: "20px" }}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>

            <div className="createAccount">
              <Button outline="true" color="primary" size="large" type="submit">
                Register
              </Button>
              <p
                style={{
                  color: "#000000",
                  fontSize: "14px"
                }}
              >
                {" "}
                Do you have account?
              </p>
              <Button outline="true" color="inherit" size="small" type="submit">
                <a href="./Login"> Login</a>
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
