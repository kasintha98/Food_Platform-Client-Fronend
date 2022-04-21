import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { Label } from "@mui/icons-material";
import loginImage from "../../img/loginim.JPG";
import Container from "@mui/material/Container";
import MyAddresses from "./myAddresses";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import { AddAddress, GetAddress } from "../../actions";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const stateList=[
" Andhra Pradesh",
"Arunachal Pradesh",
"Assam",
"Bihar",
"Chhattisgarh",
"Goa",
"Gujarat",
"Haryana",
"Himachal Pradesh",
"Jharkhand",
"Karnataka",
"Kerala",
"Madhya Pradesh",
"Maharashtra",
"Manipur",
"Meghalaya",
"Mizoram",
"Nagaland",
"Odisha",
"Punjab",
"Rajasthan",
"Sikkim",
"Tamil Nadu",
"Telangana",
"Tripura",
"Uttar Pradesh",
"Uttarakhand",
"West Bengal",
]

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
  border: none;
  font-size: 1rem;
  font-family: Arial;
  display: inline-block;
  &:hover {
    background-color: rgb(130, 187, 55);
  }
`;

const BackButton = styled(Button)`
  background-color: rgb(124, 105, 239);
  width: 100%;
  border: none;
  font-size: 1rem;
  font-family: Arial;
  display: inline-block;
  &:hover {
    background-color: rgb(124, 105, 239);
  }
`;

export default function AddNewAddress(props) {
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const [landMark, setLandMark] = useState("");
  const [state, setState] = useState("");

  const [city, setCity] = useState("");
  const [zip, setZip] = useState();

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
  };

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
        zip_code: parseInt(zip),
      };
      if (address1 != "" && city != "" && type != "" && state != "") {
        dispatch(AddAddress(addressObj));
        props.onBackPress();
      } else {
        setValidateErrror(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onEditPress = (address) => {
    console.log(address);
    setType(address.customerAddressType);
    setAddress1(address.address1);
    setAddress2(address.address2);
    setLandMark(address.landmark);
    setZip(address.zip);
    setCity(address.city);
    setState(address.state);

  }

  const NewAddress = ({ address }) => {
    return (
      <div style={{ width: "88%", margin: "auto" }} className="mb-2">
        <Card sx={{ display: "flex", maxWidth: 600, margin: "0px auto" }}>
          <IconButton aria-label="play/pause">
            <LocationOnIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <h6 className="text-center pt-3">
              <span className="fw-bold">
                {address.customerAddressType}
                {": "}
                <span />
              </span>
              <span className="font-weight-normal">
                {address.address1} {address.address2}
                {address.landmark} {address.state} {address.city} {address.zipCode}
                <span />
              </span>
            </h6>
          </Box>
          <IconButton aria-label="play/pause">
            <Button variant="text" onClick={(e) => { onEditPress(address) }}>Edit</Button>
          </IconButton>
        </Card>
      </div>
    );
  };

  return (
    <div>
      <div className="row m-0">
        <div>
          <div className="row" id="add">
            <BoldTexts class="fw-bold p-4">My Address</BoldTexts>
          </div>
          <form className="p-5">
            {validateErrror ? (
              <div className="alert alert-danger" role="alert">
                Please Enter All Field Before Submit
              </div>
            ) : (
              <></>
            )}
            <div className="row mb-3">
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
            <div className="row mb-3">
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
            <div className="row mb-3">
              <TextField
                inputProps={{ style: { fontSize: "0.875rem" } }}
                id="outlined-helperText"
                label="Address 2 (Optional)"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                type="text"
                required
              />
            </div>
            <div className="row mb-3">
              <TextField
                inputProps={{ style: { fontSize: "0.875rem" } }}
                id="outlined-helperText"
                label="Land Mark (Optional)"
                value={landMark}
                onChange={(e) => setLandMark(e.target.value)}
                type="text"
                required
              />
            </div>
            <div className="row mb-3">
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
            <div className="row mb-3">
              <div className="col-6 pl-0 ml-0" style={{ paddingLeft: 0 }}>
                <FormControl sx={{ minWidth: "100%" }}>
                  <TextField
                    inputProps={{ style: { fontSize: "0.875rem" } }}
                    id="outlined-helperText"
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    type="text"
                    required
                  />
                </FormControl>
              </div>
              <div className="col-6 pr-0 mr-0">
                <FormControl sx={{ minWidth: "100%" }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    State
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    autoWidth
                    label="State"
                  >
                    {
                      stateList.map((state,index)=>{
                        return(
                          <MenuItem value={state} key={index}>{state}</MenuItem>
                        )
                      })
                    }
                    {/* <MenuItem value={"State 1"}>State 1</MenuItem>
                    <MenuItem value={"State 2"}>State 2</MenuItem>
                    <MenuItem value={"State 3"}>State 3</MenuItem> */}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6 pl-0 ml-0" style={{ paddingLeft: 0 }}>
                <SubmitButton
                  variant="contained"
                  disableElevation
                  onClick={(e) => {
                    onSubmitPress(e);
                  }}
                >
                  Submit
                </SubmitButton>
              </div>
              <div className="col-6 pr-0 mr-0">
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

        {allAddress?.map((address, index) => {
          return <NewAddress address={address} key={index} />;
        })}
      </div>
    </div>
  );
}
