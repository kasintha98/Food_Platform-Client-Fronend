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
  height: 125vh;
  @media (max-width: 992px) {
    height: 73vh;
    margin-top: 20px;
  }
`;

const CusFormControl = styled(FormControl)`
  margin-top: 67vh;
  width: 100%;
  height: 50px;

  & .MuiOutlinedInput-notchedOutline {
    /* background-color: red; */
    /* border-radius: 50px; */
    border: none;
  }

  & .MuiSelect-select {
    background-color: #fff;
    border-radius: 50px;
  }

  & .MuiSelect-select:focus {
    background-color: #fff;
    border-radius: 50px;
  }

  & .Mui-focused {
    color: #000;
  }

  @media (max-width: 992px) {
    width: 100%;
    margin-top: 39vh;
  }
`;

const Typography1 = styled(Typography)`
  font-size: 1.25rem;
  @media (max-width: 992px) {
    font-size: 1rem;
  }
`;

const Typography2 = styled(Typography)`
  font-size: 1rem;
  @media (max-width: 992px) {
    font-size: 0.875rem;
  }
`;

const CusAlert = styled(Alert)`
  margin-top: 45vh;
  @media (max-width: 992px) {
    margin-top: 27vh;
  }
`;

const CusSelect = styled(Select)`
  & .MuiOutlinedInput-notchedOutline legend {
    display: none;
  }
`;

const CusDiv = styled.div`
  background-color: #fff;
  margin-top: 65vh;
  margin-left: 20%;
  width: 50%;
  padding: 20px;
  border-top-left-radius: 20%;
  border-bottom-right-radius: 20%;
  max-height: 55vh;
  overflow-y: auto;
  @media (max-width: 992px) {
    margin-top: 10px;
    max-height: 18vh;
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
      <Row className="align-items-center" style={{ margin: 0, width: "100%" }}>
        <CusCol className="col-background" sm={12} md={12}>
          <Row>
            <Col md={12} lg={4}>
              {/* <Typography
            sx={{
              fontSize: "2rem",
              color: "#C00000",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Select Restaurant
          </Typography> */}
              <CusFormControl>
                {!selectedStoreObj ? (
                  <InputLabel shrink={false} id="demo-simple-select-label">
                    Please select the store
                  </InputLabel>
                ) : null}

                <CusSelect
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
                        {/* <br></br>
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
                        ) : null} */}
                      </span>
                    </CusMenuItem>
                  ))}
                </CusSelect>
              </CusFormControl>
            </Col>
            <Col md={12} lg={8}>
              {selectedStoreObj ? (
                <CusDiv>
                  <div>
                    <Typography1>
                      <span style={{ color: "#595959" }}>
                        {selectedStoreObj.resturantName}
                      </span>
                      <br></br>
                      <span style={{ color: "#595959" }}>
                        {selectedStoreObj.address1}
                      </span>
                      {selectedStoreObj.address2 ? (
                        <>
                          ,<br></br>
                          <span
                            style={{
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
                              color: "#595959",
                            }}
                          >
                            {selectedStoreObj.address3}
                          </span>
                        </>
                      ) : null}
                    </Typography1>
                  </div>
                  <br></br>
                  <div>
                    <Typography1>
                      <span
                        style={{
                          color: "#595959",
                          fontWeight: "bold",
                        }}
                      >
                        Delivery :{" "}
                        {selectedStoreObj.storeAvailableForDelivery === "Y" ? (
                          <span
                            style={{ fontWeight: "bold", color: "#00B050" }}
                          >
                            Open
                          </span>
                        ) : (
                          <span
                            style={{ fontWeight: "bold", color: "#C00000" }}
                          >
                            Close
                          </span>
                        )}
                      </span>
                      <br></br>
                      <span
                        style={{
                          color: "#595959",
                          fontWeight: "bold",
                        }}
                      >
                        Self-Collect :{" "}
                        {selectedStoreObj.storeAvailableForPickup === "Y" ? (
                          <span
                            style={{ fontWeight: "bold", color: "#00B050" }}
                          >
                            Open
                          </span>
                        ) : (
                          <span
                            style={{ fontWeight: "bold", color: "#C00000" }}
                          >
                            Close
                          </span>
                        )}
                      </span>
                    </Typography1>
                  </div>
                  <br></br>
                  <div>
                    <Typography2>
                      <span style={{ color: "#595959" }}>
                        <span style={{ fontWeight: "bold" }}>
                          Restaurant Timing
                        </span>{" "}
                        - {selectedStoreObj.storeStartTime} to{" "}
                        {selectedStoreObj.storeEndTime}
                      </span>
                      <br></br>
                    </Typography2>
                  </div>
                </CusDiv>
              ) : null}
            </Col>
          </Row>
        </CusCol>
      </Row>
    </div>
  );
};
