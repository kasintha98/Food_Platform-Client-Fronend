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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { Label } from "@mui/icons-material";
import loginImage from "../../img/loginim.JPG";
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import Container from '@mui/material/Container';
import GoogleIcon from '@mui/icons-material/Google';
import firebase from "../../firebase/firebase";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import constants from "../../constants/constants";
import "./style.css";
import UserDetails from "./userDetails";

import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../../actions";

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
    const [viewUserDetails, setViewUserDetails] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        var localUserId=localStorage.getItem("userId");
        if (localUserId){
            setOtpSuccess(false);
            setViewUserDetails(true);
        }
    }, [])

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

    const responseFacebook = (res) => {
        try {
            const data = {
                accessToken: res.accessToken,
                userID: res.userID,
                email: res.email,
                name: res.name,
                picture: res.picture.data.url,
            };
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    const responseSuccessGoogle = (res) => {
        try {
            const data = { tokenId: res.tokenId };
            console.log("responseSuccessGoogle");
            console.log(res.profileObj);
        } catch (err) {
            console.log(err);
        }
    };

    const responseErrorGoogle = (res) => {
        console.log(res);
    };

    const onSignInSubmit = (e) => {
        //setOtpSuccess(true);

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
    //calling action to login the user
    const userLogin = async () => {
        try {
            dispatch(signup(mobileNumber));
        } catch (error) {
            console.log(error);
        }
    };

    const onOTPSubmit = (e) => {
        e.preventDefault();
        const code = otp;
        // userLogin();
        // setOtpSuccess(false);
        // setViewUserDetails(true);

        console.log(code);
        window.confirmationResult
            .confirm(code)
            .then((result) => {
                // User signed in successfully.
                const user = result.user;
                console.log(JSON.stringify(user));

                console.log(JSON.stringify(user.phoneNumber));
                console.log(user.phoneNumber);
                setOtpError("User Verified Sucessfully!!");
                userLogin();
                setOtpSuccess(false);
                setViewUserDetails(true);
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
            {!viewUserDetails ?

                (
                    <div>
                        <img className="img-fluid" src={loginImage} style={{ width: "700px" }} />
                        {
                            otpSuccess ? (
                                getMobileOTP()
                            ) : (
                                getMobileNumber()
                            )
                        }
                    </div>
                ) :

                (

                    <UserDetails fname="loopase" />

                )


            }

        </Box>
    );

    const getMobileNumber = () => {
        return (
            <div className='jumbotron align-middle mt-4'>
                <Card sx={{ maxWidth: 600, margin: "0px auto" }}>
                    <CardContent>
                        <form className='p-3'>
                            <div className="row">
                                <p class="fw-bold">Login with your valid mobile number</p>
                            </div>
                            <div className="row">
                                <p class="fw-bold">{otpError}</p>
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
                    <Card sx={{ maxWidth: 600, margin: "0px auto" }}>
                        <CardContent>
                            <form className='p-2'>
                                <div className="row">
                                    <p class="fw-bold">Login with social accounts</p>
                                </div>
                                <div className="row margin-auto">
                                    <div className="col text-right">
                                        <FacebookLogin
                                            appId="210639471070044"
                                            autoLoad={false}
                                            fields="name,email,picture"
                                            callback={responseFacebook}
                                            cssClass="btnFacebook"
                                            icon="fa fa-facebook"
                                            textButton="&nbsp;&nbsp;Sign In with Facebook"
                                        />
                                        {/* <Button variant="contained" color="primary" startIcon={<FacebookIcon />}>
                                            Facebook
                                        </Button> */}
                                    </div>
                                    <div className="col">
                                        <GoogleLogin
                                            clientId={constants.google_clientId}
                                            onSuccess={responseSuccessGoogle}
                                            onFailure={responseErrorGoogle}
                                            className="btnGoogle"
                                        >
                                            <i className="fa fa-google-plus" />
                                            <span>&nbsp;&nbsp;Sign In with Google</span>
                                        </GoogleLogin>
                                        {/* <Button variant="contained" color="success" startIcon={<GoogleIcon />}>
                                            Google
                                        </Button> */}
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                <div className="text-center mt-5">
                    <p class="fw-bold text-primary">TERMS OF USE</p>
                </div>
            </div>
        )
    }

    const getMobileOTP = () => {
        return (
            <div className='jumbotron vertical-center mt-5'>
                <Card sx={{ maxWidth: 600, margin: "0px auto" }}>
                    <CardContent>
                        <form className='p-3'>
                            <div className="row">
                                <p class="fw-bold">Login with your valid mobile number</p>
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
