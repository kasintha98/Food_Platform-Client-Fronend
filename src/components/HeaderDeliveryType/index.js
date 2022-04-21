import React from "react";
import { Row, Col } from "react-bootstrap";
import CircleIcon from "@mui/icons-material/Circle";
import "./style.css";
import styled from "@emotion/styled";

const CusRow = styled(Row)`
  width: 500px;

  @media (max-width: 992px) {
    width: 100%;
  }
`;

export const HeaderDeliveryType = (props) => {
  return (
    <div style={{ fontSize: "0.7rem", fontWeight: "400" }}>
      <CusRow className="text-center">
        <Col
          className="col-6 hg50"
          style={{ borderRight: "2px solid #ED7D31" }}
        >
          <Row className="text-center align-items-center">
            <Col
              className="col-6 hg25 "
              style={{ borderRight: "2px solid black" }}
            >
              <p>
                Delivery
                {props.typeObj.type === "delivery" ? (
                  <CircleIcon
                    sx={{ height: "0.7rem", color: "#70AD47" }}
                  ></CircleIcon>
                ) : (
                  <CircleIcon sx={{ height: "0.7rem" }}></CircleIcon>
                )}
              </p>
            </Col>
            <Col className="col-6 hg25">
              <p>
                Self-Collect
                {props.typeObj.type === "collect" ? (
                  <CircleIcon
                    sx={{ height: "0.7rem", color: "#70AD47" }}
                  ></CircleIcon>
                ) : (
                  <CircleIcon sx={{ height: "0.7rem" }}></CircleIcon>
                )}
              </p>
            </Col>
          </Row>
          <Row className="text-center align-items-center">
            {/*  <span style={{ fontWeight: "bold" }}>Store</span> :{" "} */}
            <Col className="align-items-center">
              <p>
                <span style={{ fontWeight: "bold" }}>Store</span> :{" "}
                {props.typeObj.resturantName}
              </p>
            </Col>
          </Row>
        </Col>
        <Col className="col-6 hg50" style={{ overflowY: "clip" }}>
          {/*  <span style={{ fontWeight: "bold" }}>Address</span> :{" "} */}
          <Col className="align-items-center">
            <p>
              <span style={{ fontWeight: "bold" }}>Address</span> :{" "}
              {props.typeObj.address1}
              {props.typeObj.address2 ? <> ,{props.typeObj.address2}</> : null}
              {props.typeObj.address3 ? <> ,{props.typeObj.address3}</> : null}
            </p>
          </Col>
        </Col>
      </CusRow>
    </div>
  );
};
