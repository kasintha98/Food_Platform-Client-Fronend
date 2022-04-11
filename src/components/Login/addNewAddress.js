import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { Label } from "@mui/icons-material";
import loginImage from "../../img/loginim.JPG";
import Container from '@mui/material/Container';
import MyAddresses from "./myAddresses";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/material/Box';
import { IconButton } from "@mui/material";
import { AddAddress, GetAddress } from "../../actions";
import FormControl from '@mui/material/FormControl';
import Typography from "@mui/material/Typography";

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
    width: 100%; 
    border:none; 
     font-size: 1rem;
  font-family: Arial;
    display:inline-block;
  &:hover {
    background-color: rgb(130, 187, 55);
  }
`;

const BackButton = styled(Button)`
  background-color: rgb(124, 105, 239);
    width: 100%; 
    border:none; 
     font-size: 1rem;
       font-family: Arial;
    display:inline-block;
  &:hover {
    background-color: rgb(124, 105, 239);
  }
`;

const NewAddress = ({ address }) => {
    console.log("address: " + address.city)
    return (
        <div style={{ "width": "88%", "margin": "auto" }} className="mb-2">
            <Card sx={{ display: 'flex', maxWidth: 600, margin: "0px auto" }}>
                <IconButton aria-label="play/pause">
                    <LocationOnIcon sx={{ height: 38, width: 38 }} />
                </IconButton>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Texts className="p-3">
                        {address.customerAddressType}{" "}{address.address1}{" "}{address.address2}
                        {address.landmark}{" "}{address.state}{" "}{address.city}{" "}{address.zip}
                    </Texts>
                </Box>
            </Card>
        </div>
    )
};

export default function AddNewAddress(props) {

    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");

    const [landMark, setLandMark] = useState("");
    const [state, setState] = useState("");

    const [city, setCity] = useState("");
    const [zip, setZip] = useState(0);

    const [type, setType] = useState("");
    const [validateErrror, setValidateErrror] = useState(false);


    const allAddress = useSelector((state) => state.user.allAddresses);
    const dispatch = useDispatch();


    useEffect(() => {
        displayAdresses();
    }, []);

    const displayAdresses = () => {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        let localUserMobileNumber = localStorage.getItem("userMobileNumber");

        if (specialChars.test(localUserMobileNumber)) {
            encodeURIComponent(localUserMobileNumber);
        }
        dispatch(GetAddress(localUserMobileNumber));
    }

    const onSubmitPress = (e) => {
        try {
            e.preventDefault();
            let localUserMobileNumber = localStorage.getItem("userMobileNumber");
            let addressObj = {
                mobileNumber: localUserMobileNumber,
                customerAddressType: type,
                address1: address1,
                address2: address2,
                city: city,
                state: state,
                landmark: landMark,
                zip_code: parseInt(zip)
            }
            if (address1 != "" || address2 != "" || city != "" || type != "" || landMark != "") {
                dispatch(AddAddress(addressObj));
                props.onBackPress();
            } else {
                setValidateErrror(true)
            }

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <div className="row">
                <div className="row" id="add">
                    <BoldTexts class="fw-bold p-4">My Address</BoldTexts>
                </div>
                <div className='p-5'>
                    <form>
                        {
                            validateErrror ?
                                (
                                    <div className="alert alert-danger" role="alert">
                                        Please Enter All Field Before Submit
                                    </div>

                                ) : (
                                    <></>
                                )
                        }
                        <div className="row my-1">
                            <div className="col">
                                <TextField
                                    inputProps={{ style: { fontSize: "0.875rem" } }}
                                    id="outlined-helperText"
                                    label="Address 1"
                                    value={address1}
                                    onChange={(e) => setAddress1(e.target.value)}
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="col">
                                <TextField
                                    inputProps={{ style: { fontSize: "0.875rem" } }}
                                    id="outlined-helperText"
                                    label="Address 2"
                                    value={address2}
                                    onChange={(e) => setAddress2(e.target.value)}
                                    type="text"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col">
                                <TextField
                                    inputProps={{ style: { fontSize: "0.875rem" } }}
                                    id="outlined-helperText"
                                    label="City"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="col">
                                <TextField
                                    inputProps={{ style: { fontSize: "0.875rem" } }}
                                    id="outlined-helperText"
                                    label="Land Mark"
                                    value={landMark}
                                    onChange={(e) => setLandMark(e.target.value)}
                                    type="text"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col">
                                <TextField
                                    inputProps={{ style: { fontSize: "0.875rem" } }}
                                    id="outlined-helperText"
                                    label="State"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="col">
                                <TextField
                                    inputProps={{ style: { fontSize: "0.875rem" } }}
                                    id="outlined-helperText"
                                    label="Address Type"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    type="text"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col">
                                <TextField
                                    inputProps={{ style: { fontSize: "0.875rem" } }}
                                    id="outlined-helperText"
                                    label="Zip Code"
                                    value={zip}
                                    onChange={(e) => setZip(e.target.value)}
                                    type="number"
                                    required
                                />
                            </div>
                            <div className="col"></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <SubmitButton
                                    variant="contained"
                                    disableElevation
                                    onClick={(e) => { onSubmitPress(e) }}
                                >
                                    Submit
                                </SubmitButton>
                            </div>
                            <div className="col">
                                <BackButton
                                    variant="contained"
                                    disableElevation
                                    onClick={props.onBackPress}
                                >
                                    Back
                                </BackButton>
                            </div>
                        </div>
                    </form>
                </div>

                {
                    allAddress?.map((address, index) => {
                        return (
                            <NewAddress address={address} key={index} />
                        )
                    })
                }
            </div>
        </div>

    );
}
