import React, { Component } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { authHeader } from "../authentication/AuthHeader";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";

import Moment from "react-moment";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import ErrorIcon from "@material-ui/icons/Error";
import DoneIcon from "@material-ui/icons/Done";
import { green } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";

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
class AccessControllList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessControllList: []
    };

    this.loadPicture = this.loadPicture.bind(this);
    this.loadPicture();
  }

  fileSelectedHandler = event => {
    this.setState({});
  };

  loadPicture = e => {
    const url = `/accessControll`;

    axios
      .get(url, {
        headers: authHeader()
      })
      .then(res => {
        console.log(res.data);
        this.setState({ accessControllList: res.data });
      });
  };
  delete = id => {
    axios
      .delete(`/accessControll/${id}`, { headers: authHeader() })
      .then(res => {
        this.loadPicture();
      });
  };

  markChecked = id => {
    axios
      .post(`/accessControll/${id}/checked`, {}, { headers: authHeader() })
      .then(res => {
        this.loadPicture();
      });
  };

  renderImage = image => {
    if (!image) {
      return "";
    }
    return (
      <img
        className="thumbnailPicture"
        src={`data:image/png;base64,${image}`}
        alt=""
      />
    );
  };

  renderErrorImage = status => {
    if (status === "ACCESS_DENIED") {
      return <ErrorIcon color="secondary"></ErrorIcon>;
    }
  };

  statusClassName = (statusName, accessType) => {
    if (accessType === "ACCESS_DENIED") {
      return "accessController_" + statusName + "_" + accessType;
    }
    return "accessController_" + statusName;
  };

  renderCheckedButton = (id, status) => {
    if (status === "ACKNOWLEDGED") {
      return "";
    }
    return (
      <Button
        onClick={() => this.markChecked(id)}
        outline="true"
        style={{ backgroundColor: green[200] }}
        variant="contained"
      >
        <DoneIcon />
      </Button>
    );
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
        <div className="form-wrapper1" style={{ width: "100%" }}>
          <h1
            style={{
              color: "#99ccff",
              fontSize: "30px",
              backgroundColor: "#00264d"
            }}
          >
            Access Controll List
          </h1>
          <Button
            onClick={() => this.loadPicture()}
            outline="true"
            color="primary"
            variant="contained"
          >
            RELOAD <AutorenewIcon />
          </Button>
          <p></p>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>

                <StyledTableCell>Compare Picture</StyledTableCell>
                <StyledTableCell>Information</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Picture</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {this.state.accessControllList.map((accessControll, index) => (
                <StyledTableRow
                  key={accessControll.id}
                  class={this.statusClassName(
                    accessControll.status,
                    accessControll.accessType
                  )}
                >
                  <StyledTableCell>
                    {this.renderErrorImage(accessControll.accessType)}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Moment format="HH:mm DD/MM/YYYY">
                      {accessControll.aikaleima}
                    </Moment>
                  </StyledTableCell>
                  <StyledTableCell>
                    {this.renderImage(accessControll.comparePicture)}
                  </StyledTableCell>

                  <StyledTableCell>{accessControll.huomautus}</StyledTableCell>
                  <StyledTableCell>{accessControll.accessType}</StyledTableCell>
                  <StyledTableCell>
                    {this.renderImage(accessControll.picture?.picture)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {this.renderCheckedButton(
                      accessControll.id,
                      accessControll.status
                    )}
                    <p></p>
                    <Button
                      onClick={() => this.delete(accessControll.id)}
                      outline="true"
                      style={{ backgroundColor: red[200] }}
                      variant="contained"
                    >
                      {" "}
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

export default AccessControllList;
