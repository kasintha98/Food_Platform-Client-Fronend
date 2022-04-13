import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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

export const DeliveryTypeModal = (props) => {
  const [show, setShow] = useState(false);
  const [type, setType] = React.useState("delivery");
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedStoreObj, setSelectedStoreObj] = useState(null);

  const stores = useSelector((state) => state.store.stores);

  /* const stores = [
    { name: "Store 1", address: "Sore 1 Add", time: "10 AM to 11 AM" },
    { name: "Store 2", address: "Sore 2 Add", time: "11 AM to 12 AM" },
  ]; */

  useEffect(() => {
    setTimeout(
      function () {
        console.log("Delivery type");
        if (!localStorage.getItem("deliveryType")) {
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

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const saveDeliveryType = () => {
    console.log(selectedStoreObj);
    const delObj = {
      ...selectedStoreObj,
      type,
    };
    localStorage.setItem("deliveryType", JSON.stringify(delObj));
    if (props.onChangeType) {
      props.onChangeType(delObj);
    }
    handleClose();
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "#d22630" }} closeButton>
          <Modal.Title>Select Delivery Type</Modal.Title>
        </Modal.Header>
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
                      <MenuItem
                        onClick={() => {
                          handleSelectedStore(store);
                        }}
                        value={store.resturantName}
                      >
                        {store.resturantName}
                      </MenuItem>
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
                      <MenuItem
                        onClick={() => {
                          handleSelectedStore(store);
                        }}
                        value={store.name}
                      >
                        {store.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <div className="mt-2">
                  {selectedStoreObj ? (
                    <>
                      <Typography variant="p" component="p">
                        <span style={{ fontWeight: "bold" }}>Store Name: </span>
                        {selectedStoreObj.name}
                      </Typography>
                      <Typography variant="p" component="p">
                        <span style={{ fontWeight: "bold" }}>
                          Store Address:{" "}
                        </span>
                        {selectedStoreObj.address}
                      </Typography>
                      <Typography variant="p" component="p">
                        <span style={{ fontWeight: "bold" }}>Timing: </span>
                        {selectedStoreObj.time}
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
