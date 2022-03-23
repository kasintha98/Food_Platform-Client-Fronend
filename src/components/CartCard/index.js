import React from "react";
import { Row, Col } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import pizzaImg from "../../img/pizza.jpg";
import TextField from "@mui/material/TextField";
import { Add, Remove } from "@mui/icons-material";

export default function CartCard() {
  return (
    <div>
      <Card sx={{ maxWidth: 345, marginBottom: "15px" }}>
        <Row>
          <Col className="col-3">
            <CardMedia
              component="img"
              height="50"
              image={pizzaImg}
              alt="green iguana"
            />
          </Col>
          <Col className="col-9">
            <Typography variant="body2" color="text.secondary">
              <p style={{ fontSize: "20px", marginBottom: "0.5rem" }}>
                Sausages Pizza
              </p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </Typography>
            <div>
              <Row className="align-items-center">
                <Col className="col-6">
                  <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                  >
                    <Button
                      sx={{
                        width: "25px !important",
                        height: "25px",
                        minWidth: "25px !important",
                      }}
                    >
                      <Remove></Remove>
                    </Button>
                    <TextField size="small" id="numberofitems" type="tel" />
                    <Button
                      sx={{
                        width: "25px !important",
                        height: "25px",
                        minWidth: "25px !important",
                      }}
                    >
                      <Add></Add>
                    </Button>
                  </ButtonGroup>
                </Col>
                <Col className="col-6">
                  <div>
                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: "500",
                        marginTop: "auto",
                        marginBottom: "auto",
                      }}
                    >
                      ₹ 150.00
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
            <Typography variant="body2" color="text.secondary">
              <p
                style={{
                  marginBottom: "0.5rem",
                  marginTop: "1rem",
                  fontSize: "16px",
                  color: "#4285F4",
                }}
              >
                Your Customisation
              </p>
              <p>
                <span style={{ fontWeight: "500" }}>Added Toppings :</span>
                <span> Extra Cheese</span>
              </p>
            </Typography>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
