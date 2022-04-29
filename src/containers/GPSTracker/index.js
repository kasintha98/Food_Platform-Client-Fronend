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

  const renderDate = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("default", { month: "short" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return (
      <span>
        {day}/{month.toUpperCase()}/{year}
      </span>
    );
  };

  const renderTime = (date) => {
    const dateObj = new Date(date);
    const time = dateObj.toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
    });

    return <span>{time}</span>;
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
          {orderStatus && orderStatus.length < 1 && !id ? (
            <Col className="col-12">
              <Alert severity="error">Please Enter A Valid ID!</Alert>
            </Col>
          ) : null}
          {orderStatus ? (
            <>
              {orderStatus.map((status) => (
                <>
                  {status.orderStatus === "SUBMITTED" && (
                    <Col md={2} sm={12} className="mb-2">
                      <img
                        src={OrderSubmitted}
                        alt="SUBMITTED"
                        style={{ width: "100%" }}
                      />
                      <div className="text-center">
                        <Typography>SUBMITTED</Typography>
                        <Typography>
                          {renderDate(status.updatedDate)}{" "}
                          {renderTime(status.updatedDate)}
                        </Typography>
                      </div>
                    </Col>
                  )}
                  {status.orderStatus === "ACCEPTED" && (
                    <Col md={2} sm={12} className="mb-2">
                      <img
                        src={OrderAccepted}
                        alt="ACCEPTED"
                        style={{ width: "100%" }}
                      />
                      <div className="text-center">
                        <Typography>ACCEPTED</Typography>
                        <Typography>
                          {renderDate(status.updatedDate)}{" "}
                          {renderTime(status.updatedDate)}
                        </Typography>
                      </div>
                    </Col>
                  )}
                  {status.orderStatus === "PREPARING" && (
                    <Col md={2} sm={12} className="mb-2">
                      <img
                        src={FoodPreparing}
                        alt="PREPARING"
                        style={{ width: "100%" }}
                      />
                      <div className="text-center">
                        <Typography>PREPARING</Typography>
                        <Typography>
                          {renderDate(status.updatedDate)}{" "}
                          {renderTime(status.updatedDate)}
                        </Typography>
                      </div>
                    </Col>
                  )}
                  {status.orderStatus === "FOOD READY" && (
                    <Col md={2} sm={12} className="mb-2">
                      <img
                        src={FoodReady}
                        alt="FOOD READY"
                        style={{ width: "100%" }}
                      />
                      <div className="text-center">
                        <Typography>FOOD READY</Typography>
                        <Typography>
                          {renderDate(status.updatedDate)}{" "}
                          {renderTime(status.updatedDate)}
                        </Typography>
                      </div>
                    </Col>
                  )}
                  {status.orderStatus === "OUT FOR DELIVERY" && (
                    <Col md={2} sm={12} className="mb-2">
                      <img
                        src={OutforDelivery}
                        alt="OUT FOR DELIVERY"
                        style={{ width: "100%" }}
                      />
                      <div className="text-center">
                        <Typography>OUT FOR DELIVERY</Typography>
                        <Typography>
                          {renderDate(status.updatedDate)}{" "}
                          {renderTime(status.updatedDate)}
                        </Typography>
                      </div>
                    </Col>
                  )}
                  {status.orderStatus === "DELIVERED" && (
                    <Col md={2} sm={12} className="mb-2">
                      <img
                        src={Delivered}
                        alt="DELIVERED"
                        style={{ width: "100%" }}
                      />
                      <div className="text-center">
                        <Typography>DELIVERED</Typography>
                        <Typography>
                          {renderDate(status.updatedDate)}{" "}
                          {renderTime(status.updatedDate)}
                        </Typography>
                      </div>
                    </Col>
                  )}
                  {status.orderStatus === "CANCELLED" && (
                    <Col md={2} sm={12} className="mb-2">
                      <img
                        src={OrderCancelled}
                        alt="CANCELLED"
                        style={{ width: "100%" }}
                      />
                      <div className="text-center">
                        <Typography>CANCELLED</Typography>
                        <Typography>
                          {renderDate(status.updatedDate)}{" "}
                          {renderTime(status.updatedDate)}
                        </Typography>
                      </div>
                    </Col>
                  )}
                </>
              ))}
            </>
          ) : null}
        </Row>
      </Container>
      <Footer></Footer>
      {isMobile ? <BottomNav></BottomNav> : null}
    </div>
  );
};
