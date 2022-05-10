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
import { OrderStatus } from "../../components/OrderStatus";
import styled from "@emotion/styled";

const POButton = styled(Button)`
  background-color: #00b050;
  height: 56px;

  &:hover {
    background-color: #357a38;
  }
`;

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
    <div style={{ backgroundColor: "#F2F2F2" }}>
      <Header></Header>
      <Container
        style={{
          marginTop: "50px",
          paddingTop: "20px",
          minHeight: "calc(100vh - 488px)",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#C00000",
            fontWeight: "bold",
          }}
          variant="h4"
          component="h4"
        >
          MY ORDER TRACKER
        </Typography>
        <div>
          <Typography
            sx={{
              color: "#595959",
              fontWeight: "bold",
            }}
            variant="h5"
            component="h5"
          >
            Want to find out where your Order is?
          </Typography>
          <Typography
            sx={{
              color: "#595959",
              marginBottom: "20px",
            }}
            variant="h6"
            component="h6"
          >
            At Hangries, we take pride in providing our customers the ability to
            track their food orders at “Real time” starting from the moment when
            you place the order to the moment your order is delivered.
          </Typography>
        </div>
        <Row>
          <Col lg={3} md={12}>
            <Typography
              sx={{
                color: "#595959",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Enter your Order No.
            </Typography>
          </Col>
          <Col lg={6} md={12}>
            <TextField
              id="outlined-name"
              label="ID"
              value={id}
              onChange={handleChangeId}
              fullWidth
              sx={{
                marginBottom: "20px",
              }}
            />
          </Col>
          <Col lg={3} md={12}>
            <POButton
              onClick={getStatus}
              variant="contained"
              color="success"
              className="w-100"
              disabled={!id ? true : false}
            >
              Track
            </POButton>
          </Col>
        </Row>
        <Row
          className="mt-2"
          style={{
            backgroundColor: "#fff",
            overflowX: "auto",
            minHeight: "500px",
          }}
        >
          {orderStatus && orderStatus.length > 0 ? (
            <OrderStatus orderItems={orderStatus}></OrderStatus>
          ) : null}
        </Row>
      </Container>
      <Footer></Footer>
      {isMobile ? <BottomNav></BottomNav> : null}
    </div>
  );
};
