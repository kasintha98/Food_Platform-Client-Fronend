import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { Label } from "@mui/icons-material";
import loginImage from "../../img/loginim.JPG";
import Container from '@mui/material/Container';
import GoogleIcon from '@mui/icons-material/Google';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';

const nameBoxStyle = {
    backgroundColor: "#0000CD",
    height: "50px",
    width: "50px",
    color: "white",
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: "50px",
    borderRadius: "10px"
}

const UserDetails = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const onUserDetailsSubmit = (e) => {
        e.preventDefault();
        console.log(firstName);
        console.log(lastName);
        console.log(email);

    }

    return ( 
        <div>
            <div className="row">
                <div className="col-2 p-4">
                    <div style={nameBoxStyle}>
                        <p className="fw-bold">G</p>
                    </div>
                    <div className="col"></div>
                </div>
                <div className="col-10">
                    <div className="row">
                        <TextField
                            required
                            id="standard-search"
                            label="First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                            type="search"
                            variant="standard"
                        />
                    </div>
                    <div className="row">
                        <TextField
                            required
                            id="standard-search"
                            label="Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                            type="search"
                            variant="standard"
                        />
                    </div>
                </div>
            </div>
            <div>
                <List>
                    <ListItem button key={"PhoneInTalkIcon"}>
                        <ListItemIcon>
                            <PhoneInTalkIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <TextField
                                id="standard-search"
                                label="Phone"
                                type="tel"
                                variant="standard"
                            />
                        </ListItemText>
                    </ListItem>
                    <ListItem button key={"Inbox"}>
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <TextField
                                required
                                id="standard-search"
                                label="Email"
                                type="email"
                                variant="standard"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </ListItemText>
                    </ListItem>
                    <div className="row p-4">
                        <div class="text-end">
                            <Button variant="outlined" disableElevation onClick={onUserDetailsSubmit}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </List>
                {/* <Divider /> */}
            </div>
        </div>
     );
}
 
export default UserDetails;
