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
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import MyAddresses from "./myAddresses";

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

    const [editName, setEditName] = useState("Edit");
    const [editPhone, setEditPhone] = useState("Edit");
    const [editEmail, setEditEmail] = useState("Edit");
    const [myAddresses, setMyAddresses] = useState(true);

    const onUserDetailsSubmit = (e) => {
        e.preventDefault();
        console.log(firstName);
        console.log(lastName);
        console.log(email);

    }

    const onNameEditPress = (e) => {
        e.preventDefault();
        if (editName === "Done") {
            setEditName("Edit");
        } else {
            setEditName("Done");
        }
    }

    const onEmailEditPress = (e) => {
        e.preventDefault();
        if (editEmail === "Done") {
            setEditEmail("Edit");
        } else {
            setEditEmail("Done");
        }
    }

    const onTelEditPress = (e) => {
        e.preventDefault();
        if (editPhone === "Done") {
            setEditPhone("Edit");
        } else {
            setEditPhone("Done");
        }
    }

    const onAddressPress = (e) => {
        e.preventDefault();
        setMyAddresses(true);
    }

    const onBackPress = () => {
        setMyAddresses(false);
    }

    return (
        <div>
            {
                !myAddresses ?
                    (
                        <div className="ms-3">
                            <div className="row mt-5">
                                <div className="col-2 p-4">
                                    <div style={nameBoxStyle}>
                                        <p className="fw-bold">G</p>
                                    </div>
                                    <div className="col"></div>
                                </div>
                                <div className="col-8">
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
                                <div className="col-2 mt-4">
                                    <div class="text-start mt-4">
                                        <Button variant="text" disableElevation onClick={(e) => onNameEditPress(e)}>
                                            {editName}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3" id="tb">
                                <div className="col-2 p-4">
                                    <PhoneInTalkIcon fontSize="large" />
                                    <div className="col"></div>
                                </div>
                                <div className="col-8">
                                    <div className="row">
                                        <TextField
                                            id="standard-search"
                                            label="Phone"
                                            onChange={(e) => setFirstName(e.target.value)}
                                            type="tel"
                                            variant="standard"
                                        />
                                    </div>
                                </div>
                                <div className="col-2 mt-4">
                                    <div class="text-start">
                                        <Button variant="text" disableElevation onClick={(e) => onTelEditPress(e)}>
                                            {editPhone}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="row" id="tb">
                                <div className="col-2 p-4">
                                    <MailIcon fontSize="large" />
                                    <div className="col"></div>
                                </div>
                                <div className="col-8">
                                    <div className="row">
                                        <TextField
                                            id="standard-search"
                                            label="Email"
                                            onChange={(e) => setFirstName(e.target.value)}
                                            type="mail"
                                            variant="standard"
                                        />
                                    </div>
                                </div>
                                <div className="col-2 mt-4">
                                    <div class="text-start">
                                        <Button variant="text" disableElevation onClick={(e) => onEmailEditPress(e)}>
                                            {editEmail}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <Divider />
                            <div className="row" id="tb">
                                <div className="col-2 p-4">
                                    <LocalPizzaIcon fontSize="large" />
                                    <div className="col"></div>
                                </div>
                                <div className="col-8">
                                    <div className="row">
                                        <p class="fw-bold mt-4">My Orders</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row" id="tb">
                                <div className="col-2 p-4">
                                    <HomeIcon fontSize="large" />
                                    <div className="col"></div>
                                </div>
                                <div className="col-8" onClick={(e) => onAddressPress(e)}>
                                    <div className="row">
                                        <p class="fw-bold mt-4">My Addresses</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row" id="tb">
                                <div className="col-2 p-4">
                                    <LogoutIcon fontSize="large" />
                                    <div className="col"></div>
                                </div>
                                <div className="col-8">
                                    <div className="row">
                                        <p class="fw-bold mt-4">LogOut</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) :

                    (
                        <MyAddresses onBackPress={onBackPress}/>
                    )
            }
        </div>

    );
}

export default UserDetails;