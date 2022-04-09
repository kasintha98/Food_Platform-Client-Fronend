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

import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/material/Box';
import { IconButton } from "@mui/material";
import { AddAddress, GetAddress } from "../../actions";

const NewAddress = ({ address}) => {
    console.log("address: " + address.city)
    return (
        <div className="mt-3">
            <Card sx={{ display: 'flex', maxWidth: 600, margin: "0px auto" }}>
                <IconButton aria-label="play/pause">
                    <LocationOnIcon sx={{ height: 38, width: 38 }} />
                </IconButton>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <h5 className="p-3">{address.city} {address.address1}</h5>
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

    const allAddress = useSelector((state) => state.user.allAddresses);
    const dispatch = useDispatch();


    useEffect(() => {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        let localUserMobileNumber = localStorage.getItem("userMobileNumber");

        if (specialChars.test(localUserMobileNumber)) {
            encodeURIComponent(localUserMobileNumber);
        }
        dispatch(GetAddress(localUserMobileNumber));
        console.log("allAddress")
        console.log(allAddress)
    }, []);

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
            console.log(addressObj);
            dispatch(AddAddress(addressObj));
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <div className="row">
                <div className="row" id="add">
                    <h3 class="fw-bold p-4">My Address</h3>
                </div>
                <div className='p-5'>
                    <form>
                        <div className="row my-1">
                            <div className="col">
                                <TextField
                                    id="outlined-helperText"
                                    label="Address 1"
                                    value={address1}
                                    onChange={(e) => setAddress1(e.target.value)}
                                    type="text"
                                />
                            </div>
                            <div className="col">
                                <TextField
                                    id="outlined-helperText"
                                    label="Address 2"
                                    value={address2}
                                    onChange={(e) => setAddress2(e.target.value)}
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col">
                                <TextField
                                    id="outlined-helperText"
                                    label="City"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    type="text"
                                />
                            </div>
                            <div className="col">
                                <TextField
                                    id="outlined-helperText"
                                    label="Land Mark"
                                    value={landMark}
                                    onChange={(e) => setLandMark(e.target.value)}
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col">
                                <TextField
                                    id="outlined-helperText"
                                    label="Zip Code"
                                    value={zip}
                                    onChange={(e) => setZip(e.target.value)}
                                    type="number"
                                />
                            </div>
                            <div className="col">
                                <TextField
                                    id="outlined-helperText"
                                    label="Address Type"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col">
                                <TextField
                                    id="outlined-helperText"
                                    label="State"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    type="text"
                                />
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col">
                            </div>
                            <div className="col">
                                <Button variant="contained" disableElevation onClick={(e) => { onSubmitPress(e) }}>
                                    Submit
                                </Button>
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
                <div className="button-container">
                    <Button variant="contained" color="primary" onClick={props.onBackPress}>Back</Button>
                </div>
            </div>
        </div>

    );
}
