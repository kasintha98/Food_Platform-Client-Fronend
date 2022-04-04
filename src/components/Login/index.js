import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Nav } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { Label } from "@mui/icons-material";
import loginImage from "../../img/loginim.JPG";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";

//
export default function LoginDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 700 }}
      role="presentation"
      //onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      alignItems="center"
      justify="center"
    >
      <img className="img-fluid" src={loginImage} style={{ width: "700px" }} />
      <div className="jumbotron vertical-center">
        <div className="mt-5">
          <Card sx={{ maxWidth: 600, margin: "0px auto" }}>
            <CardContent>
              <form className="p-3">
                <div className="row">
                  <p className="fw-bold">Login with your valid mobile number</p>
                </div>
                <div className="row">
                  <TextField
                    id="outlined-helperText"
                    label="Mobile Number"
                    // defaultValue="Default Value"
                  />
                </div>
                <div className="row mt-4">
                  <div className="text-end">
                    <Button variant="contained" disableElevation>
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="mt-5">
          <Card sx={{ maxWidth: 600, margin: "0px auto" }}>
            <CardContent>
              <form className="p-2">
                <div className="row">
                  <p className="fw-bold">Login with social accounts</p>
                </div>
                <div className="row margin-auto">
                  <div className="col text-end">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<FacebookIcon />}
                    >
                      Facebook
                    </Button>
                  </div>
                  <div className="col">
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<GoogleIcon />}
                    >
                      Google
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="text-center mt-5">
          <p className="fw-bold text-primary">TERMS OF USE</p>
        </div>
      </div>
    </Box>
  );

  return (
    <div>
      <Nav.Link onClick={toggleDrawer("right", true)}>Login</Nav.Link>
      <SwipeableDrawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        {list("right")}
      </SwipeableDrawer>
    </div>
  );
}
