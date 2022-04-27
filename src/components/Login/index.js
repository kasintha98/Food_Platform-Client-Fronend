import React, { useEffect, useState, useRef } from "react";
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
import { Nav, Row, Col } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { Label } from "@mui/icons-material";
import loginImage from "../../img/loginim.JPG";
import FacebookIcon from "@mui/icons-material/Facebook";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import Container from "@mui/material/Container";
import GoogleIcon from "@mui/icons-material/Google";
import Typography from "@mui/material/Typography";
import firebase from "../../firebase/firebase";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import constants from "../../constants/constants";
import "./style.css";
import UserDetails from "./userDetails";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../../actions";
import { toast } from "react-toastify";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import CloseIcon from "@mui/icons-material/Close";
import { NavHashLink } from "react-router-hash-link";
import Countdown from "react-countdown";
import TimerButton from "./timerButton";
import validator from "validator";
import { useLocation } from "react-router-dom";
import AddNewAddress from "./addNewAddress";
import { Otp } from "react-otp-timer";
import OtpInput from "react-otp-input";

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

const CLButton = styled(Button)`
  /*   background-color: #a6a6a6;

  &:hover {
    background-color: #616161;
  } */
`;

const TermsTexts = styled(Typography)`
  font-size: 0.875rem;
  font-weight: 400;
  font-family: Arial;
  font-color:rgb(124, 105, 239),
  @media (max-width: 992px) {
    font-size: 0.7rem;
  }
`;

// background-color: rgb(233, 237, 239);
const CusSwipeableDrawer = styled(SwipeableDrawer)`
  & .MuiDrawer-paper {
    width: 500px !important;
    background-color: transparent;
    margin-top: 50px;
    box-shadow: none;
  }

  & .MuiBackdrop-root {
    top: 50px;
  }

  @media (max-width: 576px) {
    & .MuiDrawer-paper {
      width: 100% !important;
      top: 10px;
    }

    & .MuiBackdrop-root {
      top: 60px;
    }
  }
`;

const CusImg = styled.img`
  width: 100% !important;
`;

const SubmitButton = styled(Button)`
  background-color: rgb(130, 187, 55);
  font-size: 1rem;
  font-family: Arial;
  &:hover {
    background-color: rgb(130, 187, 55);
  }
`;

let style = {
  otpTimer: {
    margin: "10px",
    color: "blue",
  },
  resendBtn: {
    backgroundColor: "#5cb85c",
    color: "white",
    border: "1 px solid #ccc",
  },
};

export default function LoginDrawer(props) {
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
  const inputRef = React.useRef(null);

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    var localUserId = localStorage.getItem("userId");
    if (localUserId) {
      setOtpSuccess(false);
      setViewUserDetails(true);
    }
  }, []);

  const Completionist = () => (
    <Button
      variant="text"
      onClick={(e) => {
        setOtp("");
        localStorage.setItem("otpTime", 60);
        onSignInSubmit(e);
      }}
    >
      Resend OTP
    </Button>
  );

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const configureCaptcha = (sendButton) => {
    console.log(sendButton);
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(sendButton, {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        //onSignInSubmit();
        console.log("reCAPTCHA verified");
      },
    });
  };

  const validatePhoneNumber = (number) => {
    const isValidPhoneNumber = validator.isMobilePhone(number);
    return isValidPhoneNumber;
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
    if (!validatePhoneNumber(mobileNumber)) {
      return toast.error("Invalid Phone Number");
    }

    try {
      setLoginDetails({
        loginCode: 0,
        mobileNumber: -1,
      });

      e.preventDefault();
      if (!otpSuccess) {
        configureCaptcha("sign-in-button");
      }
      const phoneNumber = "+" + mobileNumber;
      const appVerifier = window.recaptchaVerifier;
      console.log(phoneNumber);
      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          console.log("OTP Sent....!!");
          //setOtpError("OTP Sent! Please check you mobile phone!");
          toast.success("OTP Sent! Please check you mobile phone!");
          setOtpSuccess(true);
        })
        .catch((error) => {
          console.log(error);
          console.log("SMS not sent error....!!");
          toast.error("SMS not sent error....!!");
        });
    } catch (ex) {
      console.log("error: " + ex);
      setOtpSuccess(false);
    }
  };
  //calling action to login the user
  const userLogin = async () => {
    try {
      await dispatch(signup(mobileNumber));
      setOtpSuccess(false);
      setViewUserDetails(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onOTPSubmit = async (e) => {
    e.preventDefault();
    const code = otp;
    //userLogin();

    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));

        console.log(JSON.stringify(user.phoneNumber));
        console.log(user.phoneNumber);
        toast.success("User Verified Sucessfully!!");
        localStorage.removeItem("otpTime");
        setOtp("");
        //setOtpError("User Verified Sucessfully!!");
        userLogin();
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
        toast.error("OTP is wrong or expired.");
        //setOtpError("OTP is wrong or expired.");
      });
  };

  const handleForceClose = () => {
    inputRef.current.click();
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : "auto" }}
      role="presentation"
      alignItems="center"
      justify="center"
    >
      {!props.forceAddAddress ? (
        <>
          {!viewUserDetails ? (
            <div>
              {/* <CusImg className="img-fluid" src={loginImage} alt="banner" /> */}
              {otpSuccess ? getMobileOTP() : getMobileNumber()}
            </div>
          ) : (
            <UserDetails
              fname="loopase"
              onCloseDrawer={() => {
                toggleDrawer("right", false);
              }}
            />
          )}
        </>
      ) : (
        <AddNewAddress
          onBackPress={handleForceClose}
          forceAddAddress={true}
        ></AddNewAddress>
      )}
    </Box>
  );

  const getMobileNumber = () => {
    return (
      <div style={{ marginTop: "60%" }}>
        <div className="jumbotron align-middle m-4">
          <Card sx={{ maxWidth: 500, margin: "0px auto" }}>
            <CardContent>
              <form className="p-3">
                <div className="row">
                  <BoldTexts>Login with your valid mobile number</BoldTexts>
                </div>
                <div className="row">
                  <p class="fw-bold">{otpError}</p>
                </div>
                <div className="row">
                  <div id="sign-in-button"></div>
                  <PhoneInput
                    defaultCountry="IN"
                    style={{ fontSize: "0.875rem" }}
                    placeholder="Mobile Number"
                    value={mobileNumber}
                    onChange={setMobileNumber}
                  />
                  {/* <TextField
                  id="outlined-helperText"
                  inputProps={{ style: { fontSize: "0.875rem" } }}
                  label="Mobile Number"
                  onChange={(e) => setMobileNumber(e.target.value)}
                  type="tel"
                /> */}
                </div>
                <div className="row mt-4">
                  <div class="text-end">
                    <SubmitButton
                      variant="contained"
                      disableElevation
                      onClick={(e) => {
                        onSignInSubmit(e);
                      }}
                    >
                      Submit
                    </SubmitButton>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          {/* <div className="mt-5">
            <Card sx={{ maxWidth: 600, margin: "0px auto" }}>
              <CardContent>
                <form className="p-2">
                  <div className="row mb-2">
                    <BoldTexts>Login with social accounts</BoldTexts>
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
                        textButton="&nbsp;&nbsp;Facebook"
                      />
                    </div>
                    <div className="col">
                      <GoogleLogin
                        clientId={constants.google_clientId}
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseErrorGoogle}
                        className="btnGoogle"
                      >
                        <i className="fa fa-google-plus" />
                        <span>&nbsp;&nbsp;Google</span>
                      </GoogleLogin>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div> */}
          {/* <div className="text-center mt-5">
            <p class="fw-bold text-primary">TERMS OF USE</p>
          </div> */}
        </div>
      </div>
    );
  };

  const getMobileOTP = () => {
    return (
      <div style={{ marginTop: "60%" }}>
        <div className="jumbotron vertical-center m-4">
          <Card sx={{ maxWidth: 600, margin: "0px auto" }}>
            <CardContent>
              <form className="p-3">
                <div className="row">
                  <BoldTexts>Please enter the OTP sent to your phone</BoldTexts>
                </div>
                <div className="row">
                  <p class="font-weight-bold">{otpError}</p>
                </div>
                <div className="row">
                  <div id="resend-button"></div>
                  {/* <TextField
                    id="outlined-helperText"
                    label="OTP"
                    onChange={(e) => setOtp(e.target.value)}
                    type="number"
                    InputProps={{ inputProps: { maxLength: 6 } }}
                    inputProps={{ maxLength: 6 }}
                  /> */}
                  <OtpInput
                    value={otp}
                    onChange={(otp) => setOtp(otp)}
                    numInputs={6}
                    separator={<span>&nbsp;-&nbsp;</span>}
                    inputStyle={{ width: "2rem" }}
                  />
                </div>
                <div className="row mt-4">
                  <Col>
                    {/* <TimerButton /> */}
                    <Countdown
                      date={
                        localStorage.getItem("otpTime")
                          ? Date.now() +
                            Number(localStorage.getItem("otpTime") * 1000)
                          : Date.now() + 60000
                      }
                      renderer={rendererTime}
                    />
                  </Col>
                  <Col>
                    <div class="text-end">
                      <SubmitButton
                        variant="contained"
                        disableElevation
                        onClick={onOTPSubmit}
                      >
                        Confirm
                      </SubmitButton>
                    </div>
                  </Col>
                </div>
              </form>
            </CardContent>
          </Card>
          {/* <div className="text-center mt-5">
            <TermsTexts>TERMS OF USE</TermsTexts>
          </div> */}
        </div>
      </div>
    );
  };

  const rendererTime = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      //setOtpSuccess(false);
      if (seconds === 0) {
        localStorage.removeItem("otpTime");
      }
      return <Completionist />;
    } else {
      // Render a countdown
      if (seconds !== 0) {
        localStorage.setItem("otpTime", seconds);
        return (
          <div>
            <Button variant="contained" disabled>
              {seconds}S
            </Button>
            <Button variant="text" disabled>
              Resend OTP
            </Button>
          </div>
        );
      } else {
        return (
          <>
            <Button
              variant="text"
              onClick={(e) => {
                setOtp("");
                localStorage.setItem("otpTime", 60);
                onSignInSubmit(e);
              }}
            >
              Resend OTP
            </Button>
          </>
        );
      }
    }
  };

  return (
    <div>
      {/* <Nav.Link onClick={toggleDrawer("right", true)}>Login</Nav.Link> */}
      {props.forceAddAddress ? (
        <CLButton
          onClick={toggleDrawer("right", true)}
          variant="contained"
          className="w-100"
          color="warning"
        >
          ADD NEW ADDRESS
        </CLButton>
      ) : (
        <NavHashLink
          className="nav-link"
          to={`${location.pathname}#login`}
          activeClassName="selected"
          activeStyle={{
            /* color: "red", */ borderBottom: "3px red solid",
            paddingBottom: "15px",
          }}
          onClick={toggleDrawer("right", true)}
        >
          {auth.user?.mobileNumber ? (
            <div style={{ color: "#2E75B6" }}>
              {auth.user?.firstName ? (
                <div style={{ fontSize: "13px", marginBottom: "-14px" }}>
                  {auth.user?.firstName} <br></br> {auth.user?.mobileNumber}
                </div>
              ) : (
                <>{auth.user?.mobileNumber}</>
              )}
            </div>
          ) : (
            <div>Login</div>
          )}
        </NavHashLink>
      )}

      <CusSwipeableDrawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        <Row style={{ height: "100%" }}>
          <Col
            style={{ backgroundColor: "transparent", margin: 0, padding: 0 }}
            className="col-1"
          >
            <button
              onClick={toggleDrawer("right", false)}
              className="esc-btn w-100 text-end"
              ref={inputRef}
            >
              esc
            </button>
          </Col>
          <Col
            className={
              viewUserDetails === false ? "drawer-background col-11" : "col-11"
            }
            style={{
              backgroundColor: "rgb(233, 237, 239)",
              boxShadow:
                "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
              margin: 0,
              padding: 0,
            }}
          >
            <div>{list("right")}</div>
          </Col>
        </Row>
      </CusSwipeableDrawer>
    </div>
  );
}
