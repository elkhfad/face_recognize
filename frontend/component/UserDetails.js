import React from "react";
import axios from "axios";
import Main from "../component/Main";
import { Form, FormGroup, Label, Button } from "reactstrap";

import { authHeader } from "../authentication/AuthHeader";
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
export default class ItemsList extends React.Component {
  constructor(props) {
    super(props);
    this.user = {};
    this.state = {
      users: [],
      formErrors: {
        name: "",
        email: "",
        username: ""
      }
    };

    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {}
  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    axios.get(`/users`, { headers: authHeader() }).then(res => {
      this.setState({ users: res.data });
      this.user = res.data;
    });
  };

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
    console.log(name + " " + value);
    this.setState(
      { formErrors, [name]: value } /*, () => console.log(this.state));*/
    );
  };
  handleSubmit = event => {
    event.preventDefault();

    if (formValid(this.state)) {
      console.log(`
      --SUBMITTING--
      Name: ${this.state.name}
      Email: ${this.state.email}
      username:${this.state.username}
      role:${this.state.role}
      `);
      console.log(event);
      console.info("Valid Form");
    } else {
      console.log(event);
    }

    const id = this.state.users.id || this.user.id;
    const url = `/update/${id}`;

    const data = {
      name: this.state.name || this.user.name,
      role: this.state.role || this.user.role,
      email: this.state.email || this.user.email,
      username: this.state.username || this.user.username
    };

    axios
      .put(url, data, {
        headers: authHeader()
      })
      .then(res => {
        console.log(res.data);
      })

      .catch(error => {
        console.error(" Edit error:", error.response);
        if (error.response && error.response.data.key) {
          this.validate(error.response.data.key);
          alert("error while submitting form ");
        } else {
          console.log(error);
        }
      });
  };
  render() {
    const { formErrors } = this.state;
    return (
      <div>
        <div className="float-right">
          <Main />
        </div>
        <div className="UsersDetails">
          <Form
            onSubmit={this.handleSubmit}
            validate="true"
            style={{ width: "600px" }}
          >
            <h1
              style={{
                color: "#99ccff",
                fontSize: "30px",
                backgroundColor: "#00264d"
              }}
            >
              User Details
            </h1>
            <FormGroup>
              <Label for="name">Name:</Label>
              <input
                type="text"
                defaultValue={this.state.users.name}
                style={{
                  color: "#000000",
                  fontSize: "20px"
                }}
                name="name"
                className={formErrors.name.length > 0 ? "error" : null}
                onChange={this.handleChange}
              ></input>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email:</Label>
              <input
                type="email"
                style={{
                  color: "#000000",
                  fontSize: "20px"
                }}
                name="email"
                className={formErrors.email.length > 0 ? "error" : null}
                defaultValue={this.state.users.email}
                onChange={this.handleChange}
              ></input>
            </FormGroup>
            <FormGroup>
              <Label for="username">Username:</Label>
              <input
                type="text"
                className={formErrors.username.length > 0 ? "error" : null}
                defaultValue={this.state.users.username}
                style={{
                  color: "#000000",
                  fontSize: "20px"
                }}
                name="username"
                readOnly
                disabled
              ></input>
            </FormGroup>
            <div className="createAccount">
              <Button outline color="primary" size="large" type="submit">
                Save
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}
