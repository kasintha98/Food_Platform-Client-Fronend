import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Typography } from "@mui/material";
import "./style.css";

export const CloudError = () => {
  return (
    <Container>
      <Row>
        <Col className="bk404"></Col>
        <Col>
          <Row
            className="align-items-center pl-4"
            style={{ minHeight: "100vh" }}
          >
            <Col>
              {/*  <Typography sx={{ fontSize: "72px" }}>ERROR</Typography> */}
              <Typography sx={{ fontSize: "36px" }}>ERROR</Typography>
              <Typography sx={{ fontSize: "22px" }}>
                Our Google Cloud System is facing some issues, please try again
                after few minutes!
                <br></br>
                Thank You!
              </Typography>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
