import React from "react";
import { Row, Col } from "react-bootstrap";
import CircleIcon from "@mui/icons-material/Circle";
import "./style.css";

export const HeaderDeliveryType = (props) => {
  return (
    <div style={{ fontSize: "0.7rem", fontWeight: "400" }}>
      <Row className="text-center">
        <Col className="col-6" style={{ borderRight: "2px solid #ED7D31" }}>
          <Row className="text-center">
            <Col className="col-6" style={{ borderRight: "2px solid black" }}>
              Delivery
              <CircleIcon></CircleIcon>
            </Col>
            <Col className="col-6">
              Self Collect
              <CircleIcon></CircleIcon>
            </Col>
          </Row>
          <Row className="text-center">
            {/*  <span style={{ fontWeight: "bold" }}>Store</span> :{" "} */}
            Store : {props.typeObj.resturantName}
          </Row>
        </Col>
        <Col className="col-6">
          {/*  <span style={{ fontWeight: "bold" }}>Address</span> :{" "} */}
          Address : {props.typeObj.address1}
        </Col>
      </Row>
    </div>
  );
};
