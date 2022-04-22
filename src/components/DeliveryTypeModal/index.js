import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAddress, setDeliveryType } from "../../actions";
import { Modal } from "react-bootstrap";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import Card from "@mui/material/Card";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { IconButton } from "@mui/material";
import "./style.css";

const ButtonSave = styled(Button)`
  background-color: rgb(130, 187, 55);

  &:hover {
    background-color: rgb(130, 187, 55);
  }
`;

const CusTabList = styled(TabList)`
  & .Mui-selected {
    background-color: transparent !important;
  }
`;

const CusMenuItem = styled(MenuItem)``;

export const DeliveryTypeModal = (props) => {
  const [show, setShow] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [type, setType] = React.useState("delivery");
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedStoreObj, setSelectedStoreObj] = useState(null);

  const dispatch = useDispatch();

  const stores = useSelector((state) => state.store.stores);
  const allAddress = useSelector((state) => state.user.allAddresses);

  /* const stores = [
    { name: "Store 1", address: "Sore 1 Add", time: "10 AM to 11 AM" },
    { name: "Store 2", address: "Sore 2 Add", time: "11 AM to 12 AM" },
  ]; */

  useEffect(() => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    let localUserMobileNumber = localStorage.getItem("userMobileNumber");

    if (localUserMobileNumber) {
      if (specialChars.test(localUserMobileNumber)) {
        encodeURIComponent(localUserMobileNumber);
      }
      dispatch(GetAddress(localUserMobileNumber));
      setisLoggedIn(true);
    }

    setTimeout(
      function () {
        console.log("Delivery type");
        if (!localStorage.getItem("deliveryType")) {
          handleShow();
        }
        if (props.forceOpen) {
          const del = localStorage.getItem("deliveryType");
          if (del) {
            const delObj = JSON.parse(del);
            setType(delObj.type);
            setSelectedStoreObj(delObj);
            setSelectedStore(delObj.resturantName);
          }

          handleShow();
        }
      },
      props.delay ? props.delay : 1
    );
  }, []);

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
    console.log(event.target.value);
  };

  const handleChangeTab = (event, newValue) => {
    setType(newValue);
    console.log(newValue);
  };

  const handleSelectedStore = (store) => {
    setSelectedStoreObj(store);
    console.log(store);
  };

  const handleClose = () => {
    setShow(false);
    if (props.onCloseDelModal) {
      props.onCloseDelModal(false);
    }
  };
  const handleShow = () => {
    setShow(true);
  };

  const saveDeliveryType = () => {
    console.log(selectedStoreObj);
    const delObj = {
      ...selectedStoreObj,
      type,
    };
    dispatch(setDeliveryType(delObj));
    localStorage.setItem("deliveryType", JSON.stringify(delObj));
    if (props.onChangeType) {
      props.onChangeType(delObj);
    }
    handleClose();
  };

  const NewAddress = ({ address }) => {
    console.log("address: " + address.city);
    return (
      <div style={{ width: "100%", margin: "auto" }} className="mb-2 mt-2">
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
                {address.landmark} {address.state} {address.city} {address.zip}
                <span />
              </span>
            </h6>
          </Box>
        </Card>
      </div>
    );
  };

  return (
    <div>
      <Modal show={show} onHide={props.forceOpen ? handleClose : handleShow}>
        {props.forceOpen ? (
          <Modal.Header style={{ backgroundColor: "#d22630" }} closeButton>
            <Modal.Title>Select Delivery Type</Modal.Title>
          </Modal.Header>
        ) : (
          <Modal.Header style={{ backgroundColor: "#d22630" }}>
            <Modal.Title>Select Delivery Type</Modal.Title>
          </Modal.Header>
        )}

        <Modal.Body style={{ backgroundColor: "rgb(233,237,239)" }}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={type}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <CusTabList
                  onChange={handleChangeTab}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    sx={{
                      width: "calc(50% - 25px)",
                      backgroundColor: "transparent",
                    }}
                    label="Delivery"
                    value="delivery"
                  />
                  <Tab
                    sx={{
                      width: "50px",
                      minWidth: "50px",
                      backgroundColor: "#ff6a14",
                      color: "#fff !important",
                      borderRadius: "50%",
                    }}
                    label="OR"
                    value="or"
                    disabled
                  />
                  <Tab
                    sx={{
                      width: "calc(50% - 25px)",
                      backgroundColor: "transparent",
                    }}
                    label="Self-Collect"
                    value="collect"
                  />
                </CusTabList>
              </Box>
              <TabPanel value="delivery">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Please select the store
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedStore}
                    label="Please select the store"
                    onChange={handleChangeStore}
                  >
                    {stores.map((store) => (
                      <CusMenuItem
                        onClick={() => {
                          handleSelectedStore(store);
                        }}
                        value={store.resturantName}
                      >
                        <span>
                          {store.resturantName}
                          <br></br>
                          <span
                            style={{ fontSize: "0.70rem", color: "#767171" }}
                          >
                            {store.address1}
                          </span>
                          {store.address2 ? (
                            <>
                              ,{" "}
                              <span
                                style={{
                                  fontSize: "0.70rem",
                                  color: "#767171",
                                }}
                              >
                                {store.address2}
                              </span>
                            </>
                          ) : null}
                          {store.address3 ? (
                            <>
                              ,{" "}
                              <span
                                style={{
                                  fontSize: "0.70rem",
                                  color: "#767171",
                                }}
                              >
                                {store.address3}
                              </span>
                            </>
                          ) : null}
                        </span>
                      </CusMenuItem>
                    ))}
                  </Select>
                </FormControl>
                <div className="mt-2">
                  {selectedStoreObj ? (
                    <>
                      <Typography variant="p" component="p">
                        <span style={{ fontWeight: "bold" }}>Store Name: </span>
                        {selectedStoreObj.resturantName}
                      </Typography>
                      <Typography variant="p" component="p">
                        <span style={{ fontWeight: "bold" }}>
                          Store Address:{" "}
                        </span>
                        {selectedStoreObj.address1}
                        {selectedStoreObj.address2 ? (
                          <>, {selectedStoreObj.address2}</>
                        ) : null}
                        {selectedStoreObj.address2 ? (
                          <>, {selectedStoreObj.address2}</>
                        ) : null}
                      </Typography>
                      <Typography variant="p" component="p">
                        <span style={{ fontWeight: "bold" }}>Timing: </span>
                        {selectedStoreObj.storeStartTime} to{" "}
                        {selectedStoreObj.storeEndTime}
                      </Typography>
                    </>
                  ) : (
                    <Alert severity="warning">No store is selected!</Alert>
                  )}
                </div>
                <div className="mt-2">
                  {isLoggedIn ? (
                    <>
                      <Typography variant="p" component="p">
                        <span style={{ fontWeight: "bold" }}>
                          Customer Address:{" "}
                        </span>
                      </Typography>
                      {allAddress ? (
                        <>
                          {allAddress?.map((address, index) => {
                            return <NewAddress address={address} key={index} />;
                          })}
                        </>
                      ) : (
                        <Alert severity="warning">
                          You have not added any addresses, Please add an
                          address to your profile!
                        </Alert>
                      )}
                    </>
                  ) : null}
                </div>
              </TabPanel>
              <TabPanel value="collect">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Please select the store
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedStore}
                    label="Please select the store"
                    onChange={handleChangeStore}
                  >
                    {stores.map((store) => (
                      <CusMenuItem
                        onClick={() => {
                          handleSelectedStore(store);
                        }}
                        value={store.resturantName}
                      >
                        <span>
                          {store.resturantName}
                          <br></br>
                          <span
                            style={{ fontSize: "0.70rem", color: "#767171" }}
                          >
                            {store.address1}
                          </span>
                          {store.address2 ? (
                            <>
                              ,{" "}
                              <span
                                style={{
                                  fontSize: "0.70rem",
                                  color: "#767171",
                                }}
                              >
                                {store.address2}
                              </span>
                            </>
                          ) : null}
                          {store.address3 ? (
                            <>
                              ,{" "}
                              <span
                                style={{
                                  fontSize: "0.70rem",
                                  color: "#767171",
                                }}
                              >
                                {store.address3}
                              </span>
                            </>
                          ) : null}
                        </span>
                      </CusMenuItem>
                    ))}
                  </Select>
                </FormControl>
                <div className="mt-2">
                  {selectedStoreObj ? (
                    <>
                      <Typography variant="p" component="p">
                        <span style={{ fontWeight: "bold" }}>Store Name: </span>
                        {selectedStoreObj.resturantName}
                      </Typography>
                      <Typography variant="p" component="p">
                        <span style={{ fontWeight: "bold" }}>
                          Store Address:{" "}
                        </span>
                        {selectedStoreObj.address1}
                        {selectedStoreObj.address2 ? (
                          <>, {selectedStoreObj.address2}</>
                        ) : null}
                        {selectedStoreObj.address2 ? (
                          <>, {selectedStoreObj.address2}</>
                        ) : null}
                      </Typography>
                      <Typography variant="p" component="p">
                        <span style={{ fontWeight: "bold" }}>Timing: </span>
                        {selectedStoreObj.storeStartTime} to{" "}
                        {selectedStoreObj.storeEndTime}
                      </Typography>
                    </>
                  ) : (
                    <Alert severity="warning">No store is selected!</Alert>
                  )}
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "rgb(233,237,239)" }}>
          <ButtonSave
            onClick={saveDeliveryType}
            variant="contained"
            color="success"
            disabled={!selectedStoreObj}
          >
            Save
          </ButtonSave>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
