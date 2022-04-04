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
import { Nav } from "react-bootstrap";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Label } from '@mui/icons-material';
import loginImage from "../../img/loginim.JPG";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import firebase from "../../firebase/firebase";

export default function LoginDrawer() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const [loginDetails, setLoginDetails] = useState({
        loginCode: 0,
        mobileNumber: -1,
    });

    const [mobileNumber, setMobileNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSuccess, setOtpSuccess] = useState(false);
    const [loginCode, setLoginCode] = useState(0);
    const [otpError, setOtpError] = useState("");

    const toggleDrawer = (anchor, open) => (event) => {
        setState({ ...state, [anchor]: open });
    };

    const configureCaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "sign-in-button",
            {
                size: "invisible",
                callback: (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    onSignInSubmit();
                    console.log("reCAPTCHA verified");
                },
            }
        );
    };

    const onSignInSubmit = (e) => {
        try {
            setLoginDetails({
                loginCode: 0,
                mobileNumber: -1,
            });

            e.preventDefault();
            configureCaptcha();
            const phoneNumber = "+" + mobileNumber;
            const appVerifier = window.recaptchaVerifier;
            firebase
                .auth()
                .signInWithPhoneNumber(phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;
                    console.log("OTP Sent....!!");
                    setOtpError("OTP Sent! Please check you mobile phone!");
                    setOtpSuccess(true);
                })
                .catch((error) => {
                    setOtpSuccess(false);
                    console.log("SMS NOT SENT ERROR....!!");
                    setOtpError("Error!!! OTP Not Sent! Please add countery code as well!");
                });
        } catch (ex) {
            console.log("error: " + ex);
            setOtpSuccess(false);
        }
    };

    const onOTPSubmit = (e) => {
        e.preventDefault();
        const code = otp;
        console.log(code);
        window.confirmationResult
            .confirm(code)
            .then((result) => {
                // User signed in successfully.
                const user = result.user;
                console.log(JSON.stringify(user));

                console.log(JSON.stringify(user.phoneNumber));
                console.log(user.phoneNumber);
                //alert("User Verified Sucessfully!!");

                //setIsLoginCode(1);

                setLoginDetails({
                    loginCode: 1,
                    mobileNumber: user.phoneNumber,
                });
                //handleClose();
                // ...
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                //setIsLoginCode(0);

                setLoginDetails({
                    loginCode: 0,
                    mobileNumber: -1,
                });

                setOtpError("OTP is wrong or expired.");
            });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 700 }}
            role="presentation"
            alignItems="center"
            justify="center"
        >
            <img className="img-fluid" src={loginImage} style={{ width: "700px" }} />
            {
                otpSuccess ? (
                    getMobileOTP()
                ) : (
                    getMobileNumber()
                )
            }

        </Box>
    );

    const getMobileOTP = () => {
        return (
            <div className='jumbotron vertical-center'>
                <Card sx={{ maxWidth: 600 }}>
                    <CardContent>
                        <form className='p-3'>
                            <div className="row">
                                <p class="font-weight-bold">Login with your valid mobile number</p>
                            </div>
                            <div className="row">
                                <p class="font-weight-bold">{otpError}</p>
                            </div>
                            <div className="row">
                                <div id="sign-in-button"></div>
                                <TextField
                                    id="outlined-helperText"
                                    label="OTP"
                                    onChange={(e) => setOtp(e.target.value)}
                                    type="number"
                                />
                            </div>
                            <div className="row mt-4">
                                <div class="text-right">
                                    <Button variant="contained" disableElevation onClick={onOTPSubmit}>
                                        Confirm
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <div className="text-center mt-5">
                    <p class="font-weight-bold text-primary">TERMS OF USE</p>
                </div>
            </div>
        )
    }


    const getMobileNumber = () => {
        return (
            <div className='jumbotron vertical-center'>
                <Card sx={{ maxWidth: 600 }}>
                    <CardContent>
                        <form className='p-3'>
                            <div className="row">
                                <p class="font-weight-bold">Login with your valid mobile number</p>
                            </div>
                            <div className="row">
                                <p class="font-weight-bold">{otpError}</p>
                            </div>
                            <div className="row">
                                <div id="sign-in-button"></div>
                                <TextField
                                    id="outlined-helperText"
                                    label="Mobile Number"
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                    type="tel"
                                />
                            </div>
                            <div className="row mt-4">
                                <div class="text-right">
                                    <Button variant="contained" disableElevation onClick={onSignInSubmit}>
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <div className='mt-5'>
                    <Card sx={{ maxWidth: 600 }}>
                        <CardContent>
                            <form className='p-2'>
                                <div className="row">
                                    <p class="font-weight-bold">Login with social accounts</p>
                                </div>
                                <div className="row margin-auto">
                                    <div className="col text-right">
                                        <Button variant="contained" color="primary" startIcon={<FacebookIcon />}>
                                            Facebook
                                        </Button>
                                    </div>
                                    <div className="col">
                                        <Button variant="contained" color="success" startIcon={<GoogleIcon />}>
                                            Google
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                <div className="text-center mt-5">
                    <p class="font-weight-bold text-primary">TERMS OF USE</p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Nav.Link onClick={toggleDrawer('right', true)}>
                Login
            </Nav.Link>
            <SwipeableDrawer
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
                onOpen={toggleDrawer('right', true)}
            >
                {list('right')}
            </SwipeableDrawer>
        </div>
    );
}