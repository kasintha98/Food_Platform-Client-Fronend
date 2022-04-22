import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import styled from "@emotion/styled";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./style.css";
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";

const CusCol = styled(Col)`
  height: 90vh;
  @media (max-width: 992px) {
    height: 50vh;
    margin-top: 20px;
  }
`;

const CusDiv = styled.div`
  background-color: #fff;
  margin-top: 40vh;
  margin-left: 6%;
  width: 60%;
  padding: 20px;
  border-top-left-radius: 20%;
  border-bottom-right-radius: 20%;
  @media (max-width: 992px) {
    margin-top: 22vh;
  }
`;
const CusMenuItem = styled(MenuItem)``;

export const Restaurants = () => {
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedStoreObj, setSelectedStoreObj] = useState(null);
  const stores = useSelector((state) => state.store.stores);

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
    console.log(event.target.value);
  };

  const handleSelectedStore = (store) => {
    setSelectedStoreObj(store);
    console.log(store);
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <Row className="align-items-center">
        <Col sm={12} md={5}>
          <Typography
            sx={{
              fontSize: "2rem",
              color: "#C00000",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Select Restaurant
          </Typography>
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
                    <span style={{ fontSize: "0.70rem", color: "#767171" }}>
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
        </Col>
        <CusCol className="col-background" sm={12} md={7}>
          {selectedStoreObj ? (
            <CusDiv>
              <div>
                <Typography>
                  <span style={{ fontSize: "1.5rem", color: "#595959" }}>
                    {selectedStoreObj.resturantName}
                  </span>
                  <br></br>
                  <span style={{ fontSize: "1.5rem", color: "#595959" }}>
                    {selectedStoreObj.address1}
                  </span>
                  {selectedStoreObj.address2 ? (
                    <>
                      ,<br></br>
                      <span
                        style={{
                          fontSize: "1.5rem",
                          color: "#595959",
                        }}
                      >
                        {selectedStoreObj.address2}
                      </span>
                    </>
                  ) : null}
                  {selectedStoreObj.address3 ? (
                    <>
                      ,<br></br>
                      <span
                        style={{
                          fontSize: "1.5rem",
                          color: "#595959",
                        }}
                      >
                        {selectedStoreObj.address3}
                      </span>
                    </>
                  ) : null}
                </Typography>
              </div>
              <br></br>
              <div>
                <Typography>
                  <span
                    style={{
                      fontSize: "1.5rem",
                      color: "#595959",
                      fontWeight: "bold",
                    }}
                  >
                    Delivery :{" "}
                    {selectedStoreObj.storeAvailableForDelivery === "Y" ? (
                      <span style={{ fontWeight: "bold", color: "#00B050" }}>
                        Open
                      </span>
                    ) : (
                      <span style={{ fontWeight: "bold", color: "#C00000" }}>
                        Close
                      </span>
                    )}
                  </span>
                  <br></br>
                  <span
                    style={{
                      fontSize: "1.5rem",
                      color: "#595959",
                      fontWeight: "bold",
                    }}
                  >
                    Self-Collect :{" "}
                    {selectedStoreObj.storeAvailableForPickup === "Y" ? (
                      <span style={{ fontWeight: "bold", color: "#00B050" }}>
                        Open
                      </span>
                    ) : (
                      <span style={{ fontWeight: "bold", color: "#C00000" }}>
                        Close
                      </span>
                    )}
                  </span>
                </Typography>
              </div>
              <br></br>
              <div>
                <Typography>
                  <span style={{ fontSize: "1.25rem", color: "#595959" }}>
                    <span style={{ fontWeight: "bold" }}>
                      Restaurant Timing
                    </span>{" "}
                    - {selectedStoreObj.storeStartTime}AM to{" "}
                    {selectedStoreObj.storeEndTime}PM
                  </span>
                  <br></br>
                </Typography>
              </div>
            </CusDiv>
          ) : (
            <Alert severity="warning">No store is selected!</Alert>
          )}
        </CusCol>
      </Row>
    </div>
  );
};
