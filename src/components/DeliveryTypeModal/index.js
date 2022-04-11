import React, { useState, useEffect } from "react";
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

export const DeliveryTypeModal = (props) => {
  const [show, setShow] = useState(false);
  const [type, setType] = React.useState("delivery");
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedStoreObj, setSelectedStoreObj] = useState(null);

  const stores = [
    { name: "Store 1", address: "Sore 1 Add", time: "10 AM" },
    { name: "Store 2", address: "Sore 2 Add", time: "11 AM" },
  ];

  useEffect(() => {
    setTimeout(
      function () {
        console.log("Delivery type");
        if (!localStorage.getItem("deliveryType")) {
          handleShow();
        }
      },
      props.delay ? props.delay : 2000
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
    handleClose();
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Delivery Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={type}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChangeTab}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    sx={{ width: "50%" }}
                    label="Delivery"
                    value="delivery"
                  />
                  <Tab
                    sx={{ width: "50%" }}
                    label="Self-Collect"
                    value="collect"
                  />
                </TabList>
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
                        Store Name: {selectedStoreObj.name}
                      </Typography>
                      <Typography variant="p" component="p">
                        Store Address: {selectedStoreObj.address}
                      </Typography>
                      <Typography variant="p" component="p">
                        Open Time: {selectedStoreObj.time}
                      </Typography>
                    </>
                  ) : (
                    <Alert severity="warning">No store is selected!</Alert>
                  )}
                </div>
              </TabPanel>
              <TabPanel value="collect">Item Two</TabPanel>
            </TabContext>
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={saveDeliveryType}
            variant="contained"
            color="success"
            disabled={!selectedStoreObj}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
