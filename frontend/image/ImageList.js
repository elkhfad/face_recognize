import React, { Component } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { authHeader } from "../authentication/AuthHeader";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 18
  },
  body: {
    fontSize: 18
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);
class ImageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pictures: []
    };

    this.loadPicture = this.loadPicture.bind(this);
    this.loadPicture();
  }

  fileSelectedHandler = event => {
    this.setState({});
  };

  loadPicture = e => {
    const url = `/pictures/`;

    axios
      .get(url, {
        headers: authHeader()
      })
      .then(res => {
        this.setState({ pictures: res.data });
      });
  };
  delete = id => {
    axios.delete(`/pictures/${id}`, { headers: authHeader() }).then(res => {
      this.setState({ pictures: res.data });
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
            Pictures List
          </h1>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Num</StyledTableCell>
                <StyledTableCell>Picture Name</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell>Picture</StyledTableCell>
                <StyledTableCell>Delete</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {this.state.pictures.map((picture, index) => (
                <StyledTableRow key={picture.id}>
                  <StyledTableCell>{++index}</StyledTableCell>
                  <StyledTableCell>{picture.name}</StyledTableCell>
                  <StyledTableCell>{picture.description}</StyledTableCell>
                  <StyledTableCell>
                    <img
                      className="thumbnailPicture"
                      src={`data:image/png;base64,${picture.picture}`}
                      alt=""
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button
                      onClick={() => this.delete(picture.id)}
                      outline="true"
                      color="secondary"
                      variant="contained"
                    >
                      <DeleteIcon />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default ImageList;
