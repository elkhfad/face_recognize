import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SettingsIcon from "@material-ui/icons/Settings";
import ListItemText from "@material-ui/core/ListItemText";

import HomeIcon from "@material-ui/icons/Home";

const StyledMenu = withStyles({
  paper: {
    border: "2px solid #000000"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {}
    }
  }
}))(MenuItem);

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = () => {
    return (
      <div>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
          size="large"
        >
          Menu
        </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <a href="/">
            <StyledMenuItem>
              <ListItemIcon>
                <HomeIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </StyledMenuItem>
          </a>

          <a href="/UserDetails">
            <StyledMenuItem>
              <ListItemIcon>
                <SettingsIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Details" />
            </StyledMenuItem>
          </a>
        </StyledMenu>
      </div>
    );
  };
  return <Router>{menuItems()}</Router>;
}
