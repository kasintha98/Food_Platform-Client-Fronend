import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetOrderProcessStatus } from "../../actions";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Alert from "@mui/material/Alert";
import { Container, Row, Col } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { BottomNav } from "../../components/BottomNav";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Delivered from "../../img/Delivered.jpg";
import FoodPreparing from "../../img/FoodPreparing.jpg";
import FoodReady from "../../img/FoodReady.jpg";
import OrderAccepted from "../../img/OrderAccepted.jpg";
import OrderCancelled from "../../img/OrderCancelled.jpg";
import OrderSubmitted from "../../img/OrderSubmitted.jpg";
import OutforDelivery from "../../img/OutforDelivery.jpg";

export const GPSTracker = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });
  const [id, setId] = React.useState("");

  const orderStatus = useSelector((state) => state.user.orderStatus);

  const handleChangeId = (event) => {
    setId(event.target.value);
  };

  const dispatch = useDispatch();

  const getStatus = () => {
    dispatch(GetOrderProcessStatus(id));
  };

  return (
    <div>
      <Header></Header>
      <Container
        style={{
          marginTop: "50px",
          paddingTop: "20px",
          minHeight: "calc(100vh - 488px)",
        }}
      >
        <Typography
          sx={{ textAlign: "center", marginBottom: "20px" }}
          variant="h4"
          component="h4"
        >
          My GPSTracker
        </Typography>
        <Row>
          <Col lg={3} md={12}>
            <Typography>Enter Order ID</Typography>
          </Col>
          <Col lg={6} md={12}>
            <TextField
              id="outlined-name"
              label="ID"
              value={id}
              onChange={handleChangeId}
              fullWidth
            />
          </Col>
          <Col lg={3} md={12}>
            <Button
              onClick={getStatus}
              variant="contained"
              color="success"
              className="w-100"
              disabled={!id ? true : false}
            >
              Track
            </Button>
          </Col>
        </Row>
        <Row className="mt-2">
          {!orderStatus && !id ? (
            <Col className="col-12">
              <Alert severity="error">Please Enter A Valid ID!</Alert>
            </Col>
          ) : null}
          {orderStatus ? (
            <>
              {orderStatus.orderStatus === "SUBMITTED" && (
                <Col className="col-2">
                  <img
                    src={OrderSubmitted}
                    alt="SUBMITTED"
                    style={{ width: "100%" }}
                  />
                </Col>
              )}
              {orderStatus.orderStatus === "ACCEPTED" && (
                <Col className="col-2">
                  <img
                    src={OrderAccepted}
                    alt="ACCEPTED"
                    style={{ width: "100%" }}
                  />
                </Col>
              )}
              {orderStatus.orderStatus === "PREPARING" && (
                <Col className="col-2">
                  <img
                    src={FoodPreparing}
                    alt="PREPARING"
                    style={{ width: "100%" }}
                  />
                </Col>
              )}
              {orderStatus.orderStatus === "FOOD READY" && (
                <Col className="col-2">
                  <img
                    src={FoodReady}
                    alt="FOOD READY"
                    style={{ width: "100%" }}
                  />
                </Col>
              )}
              {orderStatus.orderStatus === "OUT FOR DELIVERY" && (
                <Col className="col-2">
                  <img
                    src={OutforDelivery}
                    alt="OUT FOR DELIVERY"
                    style={{ width: "100%" }}
                  />
                </Col>
              )}
              {orderStatus.orderStatus === "DELIVERED" && (
                <Col className="col-2">
                  <img
                    src={Delivered}
                    alt="DELIVERED"
                    style={{ width: "100%" }}
                  />
                </Col>
              )}
              {orderStatus.orderStatus === "CANCELLED" && (
                <Col className="col-12">
                  <img
                    src={OrderCancelled}
                    alt="CANCELLED"
                    style={{ width: "100%" }}
                  />
                </Col>
              )}
            </>
          ) : null}
        </Row>
      </Container>
      <Footer></Footer>
      {isMobile ? <BottomNav></BottomNav> : null}
    </div>
  );
};
