import React, { Component } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { authHeader } from "../authentication/AuthHeader";
import { FormGroup, Input, Label } from "reactstrap";
import SaveIcon from "@material-ui/icons/Save";
class ImageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: undefined
    };
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
  }

  fileSelectedHandler = event => {
    event.preventDefault();
    console.log(event);
    this.setState({
      selectedFile: event.target.files[0]
    });
  };
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  fileUploadHandler = e => {
    if (!this.state.selectedFile) {
      return;
    }

    const url = `/picture/upload/`;
    const fd = new FormData();

    fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
    fd.append("description", this.state.description);
    axios
      .post(url, fd, {
        headers: authHeader()
      })
      .then(res => {
        console.log(res);
      });
  };

  render() {
    return (
      <div
        className="wrapper1"
        style={{
          color: "#99ccff",
          fontSize: "30px",
          textAlign: "left"
        }}
      >
        <div className="form-wrapper1" style={{ width: "900px" }}>
          <h1
            style={{
              color: "#99ccff",
              fontSize: "30px",
              backgroundColor: "#00264d"
            }}
          >
            Add picture
          </h1>
          <form onSubmit={this.fileUploadHandler}>
            <div className="name">
              <Button size="large" type="submit">
                <input
                  type="file"
                  name="file"
                  onChange={this.fileSelectedHandler}
                  size="small"
                  style={{ color: "#000000", fontSize: "20px" }}
                />
              </Button>
            </div>
            <div className="description">
              <FormGroup>
                <Label for="message">Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  placeholder="kirjoita tähän jotain tarinaa"
                  onChange={this.handleChange}
                  cols={20}
                  rows={5}
                  style={{ color: "#000000", fontSize: "20px" }}
                />
              </FormGroup>
            </div>

            <div className="Add Item">
              <Button
                outline="true"
                color="primary"
                size="large"
                type="submit"
                variant="contained"
              >
                <SaveIcon /> Upload
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ImageInput;
