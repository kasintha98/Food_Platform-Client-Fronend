import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CartCard from "../../components/CartCard";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Row, Col } from "react-bootstrap";

const CheckoutButton = styled(Button)`
  background-color: rgb(130, 187, 55);

  &:hover {
    background-color: rgb(130, 187, 55);
  }
`;

const SubTotalArea = styled.div`
display: flex;
justify-content: space-between;

}
`;

const SubTotal = styled(Typography)`
  margin: 8px;
`;

export const NewCart = () => {
  const [subTotal, setSubtotal] = useState(0);
  const [extraSubTotal, setExtraSubTotal] = useState(0);
  const [choiceTotal, setChoiceTotal] = useState(0);

  const handleSubTotal = (total) => {
    setSubtotal(total);
  };

  const handleExtraTotal = (total) => {
    setExtraSubTotal(total);
  };

  const handleChoiceTotal = (total) => {
    setChoiceTotal(total);
  };

  return (
    <div>
      <Card sx={{ width: "100%", marginTop: "60px" }}>
        <div
          style={{ height: "5px", backgroundColor: "rgb(130, 187, 55)" }}
        ></div>
        <CardContent
          sx={{
            height: "375px",
            overflowY: "auto",
            backgroundColor: "#fff",
          }}
        >
          <CartCard
            onChangeSubTotal={handleSubTotal}
            onChangeExtraSubTotal={handleExtraTotal}
            onChangeChoiceTotal={handleChoiceTotal}
          ></CartCard>
        </CardContent>
        <div
          style={{
            backgroundColor: "rgb(239, 245, 251)",
            boxShadow: "0px -4px 3px rgba(50, 50, 50, 0.3)",
          }}
        >
          <Typography>
            <Row className="ps-2">
              <Col className="col-8">Subtotal</Col>
              <Col className="col-4">
                ₹{" "}
                {subTotal +
                  (extraSubTotal ? extraSubTotal : 0) +
                  (choiceTotal ? choiceTotal : 0)}
              </Col>
            </Row>
            <Row className="ps-2">
              <Col className="col-8">Taxes (CGST)</Col>
              <Col className="col-4">₹ {0}</Col>
            </Row>
            <Row className="ps-2">
              <Col className="col-8">Taxes (SGST)</Col>
              <Col className="col-4">₹ {0}</Col>
            </Row>
            <Row className="ps-2">
              <Col className="col-8">Delivery Charges</Col>
              <Col className="col-4">₹ {0}</Col>
            </Row>
            <Row className="ps-2">
              <Col className="col-8">Grand Total</Col>
              <Col className="col-4">
                ₹{" "}
                {subTotal +
                  (extraSubTotal ? extraSubTotal : 0) +
                  (choiceTotal ? choiceTotal : 0)}
              </Col>
            </Row>
          </Typography>

          <CardActions>
            <Link
              style={{ color: "#fff", textDecoration: "none", width: "100%" }}
              to="/new-checkout"
            >
              <CheckoutButton variant="contained" className="w-100">
                Checkout
              </CheckoutButton>
            </Link>
          </CardActions>
        </div>
      </Card>
    </div>
  );
};
