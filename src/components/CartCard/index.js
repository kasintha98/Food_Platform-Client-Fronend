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
import { useSelector, useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";
import { addToCartNew } from "../../actions";
import Delete from "@mui/icons-material/Delete";

export default function CartCard() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const onQuantityIncrement = (product_id) => {
    console.log({ product_id });
    dispatch(addToCartNew(cart.cartItems[product_id], 1));
  };

  const onQuantityDecrement = (product_id) => {
    dispatch(addToCartNew(cart.cartItems[product_id], -1));
  };

  return (
    <div>
      {Object.keys(cart?.cartItems).length > 0 ? (
        <>
          {Object.keys(cart?.cartItems).map((key, index) => (
            <Card key={index} sx={{ maxWidth: 345, marginBottom: "15px" }}>
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
                    <p
                      style={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {cart?.cartItems[key].dish_type}
                    </p>
                    <p>{cart?.cartItems[key].dish_description_id}</p>
                  </Typography>
                  <div>
                    <Row className="align-items-center">
                      <Col className="col-6">
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
                              fontSize: "1rem !important",
                              fontWeight: "600",
                            }}
                            onClick={() => {
                              onQuantityDecrement(
                                cart?.cartItems[key].product_id
                              );
                            }}
                          >
                            {cart?.cartItems[key].qty < 2 ? (
                              <Delete sx={{ fontSize: "0.9rem" }}></Delete>
                            ) : (
                              <Remove sx={{ fontSize: "0.9rem" }}></Remove>
                            )}
                          </Button>
                          <TextField
                            size="small"
                            id="numberofitems"
                            type="tel"
                            value={cart?.cartItems[key].qty}
                          />
                          <Button
                            sx={{
                              width: "25px !important",
                              height: "25px",
                              minWidth: "25px !important",
                              fontSize: "1rem",
                              fontWeight: "600",
                            }}
                            onClick={() => {
                              onQuantityIncrement(
                                cart?.cartItems[key].product_id
                              );
                            }}
                          >
                            <Add sx={{ fontSize: "0.9rem" }}></Add>
                          </Button>
                        </ButtonGroup>
                      </Col>
                      <Col className="col-6">
                        <div>
                          <p
                            style={{
                              fontSize: "1.1rem",
                              fontWeight: "600",
                              marginTop: "auto",
                              marginBottom: "auto",
                            }}
                          >
                            ₹{" "}
                            {cart?.cartItems[key].qty *
                              cart?.cartItems[key].price}
                            .00
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
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "#4285F4",
                      }}
                    >
                      Your Customisation
                    </p>
                    <p>
                      <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>
                        Size :
                      </span>
                      <span style={{ fontSize: "0.86rem" }}>
                        {" "}
                        {cart?.cartItems[key].size}
                      </span>
                    </p>
                  </Typography>
                </Col>
              </Row>
            </Card>
          ))}
        </>
      ) : (
        <Alert severity="info">Your Cart Is Empty!</Alert>
      )}
    </div>
  );
}
