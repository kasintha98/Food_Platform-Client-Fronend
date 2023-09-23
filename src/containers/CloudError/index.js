import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
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
                PLease be patient, your favourite Menu will be
                displayed shortly!
                <br></br>
                Please try again after few minutes!
                <br></br>
                Thank You!
              </Typography>
              <div className="w-100 mt-4 ">
                <NavLink
                  className="btn btn-success"
                  to={"/"}
                  style={{ minWidth: "200px" }}
                >
                  <i className="fa fa-home"></i>
                  &nbsp; Home
                </NavLink>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
