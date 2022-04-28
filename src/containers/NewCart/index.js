import React, { useState } from "react";
import { useSelector } from "react-redux";
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
  const [delCharge, setDelCharge] = useState(0);

  const taxDetails = useSelector((state) => state.auth.taxDetails);
  const deliveryPrice = useSelector((state) => state.auth.deliveryPrice);

  const handleSubTotal = (total) => {
    setSubtotal(total);
    calcDeliveryPrice();
  };

  const handleExtraTotal = (total) => {
    setExtraSubTotal(total);
    calcDeliveryPrice();
  };

  const handleChoiceTotal = (total) => {
    setChoiceTotal(total);
    calcDeliveryPrice();
  };

  const renderAllSub = () => {
    const all =
      subTotal +
      (extraSubTotal ? extraSubTotal : 0) +
      (choiceTotal ? choiceTotal : 0);
    return <span>₹ {all.toFixed(2)}</span>;
  };

  const calcDeliveryPrice = () => {
    const allSub =
      subTotal +
      (extraSubTotal ? extraSubTotal : 0) +
      (choiceTotal ? choiceTotal : 0);

    let deliveryCharge = 0;

    if (deliveryPrice) {
      deliveryPrice.forEach((delivery) => {
        if (allSub >= delivery.minAmount && allSub <= delivery.maxAmount) {
          deliveryCharge = delivery.deliveryFee;
        }
      });
    }

    setDelCharge(deliveryCharge.toFixed(2));
  };

  const renderTax = (tax) => {
    const all = (
      (subTotal +
        (extraSubTotal ? extraSubTotal : 0) +
        (choiceTotal ? choiceTotal : 0)) *
      (tax.taxPercentage / 100)
    ).toFixed(2);
    return <span>₹ {all}</span>;
  };

  const renderGrandTot = () => {
    const allSub =
      subTotal +
      (extraSubTotal ? extraSubTotal : 0) +
      (choiceTotal ? choiceTotal : 0);

    let allTax = 0;

    if (taxDetails) {
      taxDetails.forEach((tax) => {
        allTax = allTax + allSub * (tax.taxPercentage / 100);
      });
    }

    const grantTot = allSub + allTax + Number(delCharge);

    return <span>₹ {grantTot.toFixed(2)}</span>;
  };

  return (
    <div>
      <Card sx={{ width: "100%", marginTop: "60px" }}>
        <div
          style={{ height: "5px", backgroundColor: "rgb(130, 187, 55)" }}
        ></div>
        <CardContent
          sx={{
            height: "425px",
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
            backgroundColor: "#fff",
            boxShadow: "0px -4px 3px rgba(50, 50, 50, 0.3)",
          }}
        >
          <Typography>
            <Row className="ps-2">
              <Col className="col-9 pr-0">Subtotal</Col>
              <Col className="col-3 ps-0">{renderAllSub()}</Col>
            </Row>
            <Row className="ps-2">
              {taxDetails ? (
                <>
                  {taxDetails.map((tax) => (
                    <>
                      <Col className="col-9 pr-0">
                        <span
                          style={{ fontSize: "0.85rem", fontStyle: "italic" }}
                        >
                          Taxes ({tax.taxCategory} {tax.taxPercentage}%)
                        </span>
                      </Col>
                      <Col className="col-3 ps-0">
                        <span
                          style={{ fontSize: "0.85rem", fontStyle: "italic" }}
                        >
                          {renderTax(tax)}
                        </span>
                      </Col>
                    </>
                  ))}
                </>
              ) : null}
            </Row>

            <Row className="ps-2">
              <Col className="col-9 pr-0">
                <span style={{ fontSize: "0.85rem", fontStyle: "italic" }}>
                  Delivery Charges
                </span>
              </Col>
              <Col className="col-3 ps-0">
                <span style={{ fontSize: "0.85rem", fontStyle: "italic" }}>
                  ₹ {delCharge}
                </span>
              </Col>
            </Row>
            <Row className="ps-2">
              <Col className="col-9 pr-0">Grand Total</Col>
              <Col className="col-3 ps-0">{renderGrandTot()}</Col>
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
