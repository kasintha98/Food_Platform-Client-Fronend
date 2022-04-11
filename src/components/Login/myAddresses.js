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
import Container from '@mui/material/Container';
import addressImage from "../../../src/img/addressimg.png";
import AddNewAddress from "./addNewAddress";
import { useDispatch, useSelector } from "react-redux";
import { AddAddress, GetAddress } from "../../actions";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

const Texts = styled(Typography)`
 font-size: 0.875rem;
  font-weight: 400;
  font-family: Arial;
  @media (max-width: 992px) {
     font-size: 0.7rem;
  }
`;

const BoldTexts = styled(Typography)`
 font-size: 1rem;
  font-weight: 600;
  font-family: Arial;
  @media (max-width: 992px) {
    font-size: 0.9rem;
  }
`;

const SubmitButton = styled(Button)`
  background-color: rgb(130, 187, 55);
   font-size: 1rem;
  font-family: Arial;
    width: 40%; 
  &:hover {
    background-color: rgb(130, 187, 55);
  }
`;

const BackButton = styled(Button)`
  background-color: rgb(124, 105, 239);
   font-size: 1rem;
  font-family: Arial;
    width: 40%; 
  &:hover {
    background-color: rgb(124, 105, 239);
  }
`;

export default function MyAddresses(props) {
    const [addNewAddress, setAddNewAddress] = useState(false);
    const allAddress = useSelector((state) => state.user.allAddresses);
    const dispatch = useDispatch();
    const addNewAddressOnPress = () => {
        setAddNewAddress(true);
    }
    useEffect(() => {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        let localUserMobileNumber = localStorage.getItem("userMobileNumber");

        if (specialChars.test(localUserMobileNumber)) {
            encodeURIComponent(localUserMobileNumber);
        }
        dispatch(GetAddress(localUserMobileNumber));
    }, []);
    return (
        <div>
            {
                allAddress.length < 0 ?
                    (
                        <div>
                            <div className="row" id="add">
                                <BoldTexts class="fw-bold p-4">My Address</BoldTexts>
                            </div>
                            <div className="image-container">
                                <img src={addressImage} class="img-fluid" id="addImage" />
                            </div>
                            <div className="button-container">
                                <SubmitButton variant="contained" color="success" onClick={addNewAddressOnPress} >Add New Address</SubmitButton>
                            </div>
                            <div className="button-container">
                                <BackButton variant="contained" color="primary" onClick={props.onBackPress}>Back</BackButton>
                            </div>
                        </div>
                    ) :
                    (
                        <AddNewAddress onBackPress={props.onBackPress} />
                    )
            }
        </div>
    );
}
