import React, { Component } from "react";
import Icon from "@material-ui/core/Icon";
import axios from "axios";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { Button } from "@material-ui/core";
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

      subject: "",
      message: "",
      formErrors: {
        name: "",
        email: "",

        subject: "",
        message: ""
      }
    };

    this.handleClearForm = this.handleClearForm.bind(this);
  }

  handleChange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "name":
        formErrors.name =
          value.length < 6 && value.length > 0
            ? "minimum 6 characters required"
            : "";
        break;
      case "email":
        formErrors.email =
          value.length < 5 && value.length > 0
            ? "minimum 5 characters required"
            : "";
        break;

      case "subject":
        formErrors.subject =
          value.length < 5 && value.length > 0
            ? "minimum 5 characters required"
            : "";
        break;
      case "message":
        formErrors.message =
          value.length < 5 && value.length > 0
            ? "minimum 5 characters required"
            : "";
        break;
      default:
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  handleSubmit = event => {
    event.preventDefault();

    if (formValid(this.state)) {
      console.log(`
      --SUBMITTING--
      Name: ${this.state.name}
      Email: ${this.state.email}
      Subject: ${this.state.subject}
      Message: ${this.state.message}
      `);
      setTimeout(() => window.location.reload(), 100);
      event.target.reset();
    } else {
      console.error("Form invalid - display error message");
    }

    const url = "/messages";

    const data = {
      name: this.state.name,
      email: this.state.email,
      subject: this.state.subject,
      message: this.state.message
    };

    axios
      .post(url, data, {
        headers: { "Content-Type": "application/json" }
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(error => console.error("Error:", error));
  };
  handleClearForm(e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      name: "",
      email: "",

      subject: "",
      message: "",
      formErrors: {
        name: "",
        email: "",

        subject: "",
        message: ""
      }
    });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} style={{ width: "600px" }}>
        <FormGroup>
          <h1
            style={{
              color: "#99ccff",
              fontSize: "30px",
              backgroundColor: "#00264d"
            }}
          >
            Send message
          </h1>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            onChange={this.handleChange}
            placeholder="Name"
            style={{ color: "#000000", fontSize: "20px" }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            onChange={this.handleChange}
            placeholder="Email"
            style={{ color: "#000000", fontSize: "20px" }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="subject">Subject</Label>
          <Input
            type="text"
            name="subject"
            onChange={this.handleChange}
            placeholder="Subject"
            style={{ color: "#000000", fontSize: "20px" }}
          />
        </FormGroup>

        <FormGroup>
          <Label for="message">Message</Label>
          <Input
            type="textarea"
            name="message"
            onChange={this.handleChange}
            cols={40}
            rows={10}
            placeholder="Message"
            style={{ color: "#000000", fontSize: "20px" }}
          />
        </FormGroup>

        <Button
          outline="true"
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          endIcon={<Icon>send</Icon>}
        >
          Send
        </Button>
      </Form>
    );
  }
}
