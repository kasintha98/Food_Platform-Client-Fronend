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
    <div className="col-12">
      <Card sx={{ maxWidth: "500", marginBottom: "15px" }}>
        <Row>
          <Col className="col-3">
            <CardMedia
              sx={{ mx: 2, my: 3 }}
              component="img"
              height="100"
              display="flex"
              justify="center"
              alignItems="center"
              justifyContent="center"
              image={pizzaImg}
              alt="green iguana"
            />
          </Col>
          <Col sx={{ ml: 5 }} className="col-6">
            <Typography variant="body2" color="text.secondary">
              <p style={{ fontSize: "20px", marginBottom: "0.5rem" }}>
                Sausages Pizza
              </p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </Typography>

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
          <Col className="col-3 align-items-right">
            <Col className="col-12">
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
            <Col className="col-12 mt-3">
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
                sx={{ marginTop: "5px" }}
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
          </Col>
        </Row>
      </Card>
    </div>
  );
}
