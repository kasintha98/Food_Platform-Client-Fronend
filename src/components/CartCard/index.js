import React, { useEffect } from "react";
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
import styled from "@emotion/styled";
import LinesEllipsis from "react-lines-ellipsis";
import emptyCartImg from "./../../img/empty-cart.jpg";

const IncButton = styled(Button)`
  width: 25px !important;
  height: 25px;
  min-width: 25px !important;
  font-size: 1rem !important;
  font-weight: 600;
  background-color: #fff;
  color: #595959;
  border: none;

  &:hover {
    background-color: #f2f3f4;
  }
`;

export default function CartCard(props) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    calculateSubTotal();
  });

  const onQuantityIncrement = (product_id) => {
    console.log({ product_id });
    dispatch(addToCartNew(cart.cartItems[product_id], 1));
    calculateSubTotal();
  };

  const onQuantityDecrement = (product_id) => {
    dispatch(addToCartNew(cart.cartItems[product_id], -1));
    calculateSubTotal();
  };

  const calculateSubTotal = () => {
    let total = 0;
    for (let key of Object.keys(cart?.cartItems)) {
      total = total + cart?.cartItems[key].qty * cart?.cartItems[key].price;
    }
    props.onChangeSubTotal(total);
  };

  return (
    <div>
      {Object.keys(cart?.cartItems).length > 0 ? (
        <>
          {Object.keys(cart?.cartItems).map((key, index) => (
            <Card
              key={index}
              sx={{
                maxWidth: 345,
                marginBottom: "15px",
                boxShadow: "none",
                backgroundColor: "#F7F7F7",
              }}
            >
              <Row>
                <Col className="col-3">
                  <CardMedia
                    component="img"
                    height="50"
                    sx={{ borderRadius: "5px" }}
                    image={pizzaImg}
                    alt="green iguana"
                  />
                </Col>
                <Col className="col-9">
                  <Typography variant="body2" color="text.secondary">
                    <p
                      style={{
                        marginBottom: "0.5rem",
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      {cart?.cartItems[key].dish_type}
                    </p>
                    {/* <p
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: "400",
                        fontFamily: "Arial",
                        color: "#767171",
                      }}
                    >
                      <LinesEllipsis
                        text={`${cart?.cartItems[key].dish_description_id} The real dish discription can
  be added when have the get discription by product_id API. The real dish discription can
  be added when have the get discription by product_id API.The real dish discription can
  be added when have the get discription by product_id API.The real dish discription can
  be added when have the get discription by product_id API.The real dish discription can
  be added when have the get discription by product_id API.
  ea commodo consequat.`}
                        maxLine="3"
                        ellipsis="..."
                        trimRight
                        basedOn="letters"
                      />
                    </p> */}
                  </Typography>
                  <div>
                    <Row className="align-items-center">
                      <Col className="col-6">
                        <ButtonGroup
                          variant="contained"
                          aria-label="outlined primary button group"
                          sx={{ marginTop: "5px" }}
                        >
                          <IncButton
                            sx={{ border: "none !important" }}
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
                          </IncButton>
                          {/* <TextField
                            size="small"
                            id="numberofitems"
                            type="tel"
                            value={cart?.cartItems[key].qty}
                            sx={{ borderRadius: "0px" }}
                            InputProps={{ readOnly: true }}
                          /> */}
                          <IncButton
                            sx={{
                              borderLeft: "1px solid #bdbdbd !important",
                              borderRight: "1px solid #bdbdbd !important",
                            }}
                            InputProps={{ disabled: true }}
                          >
                            <Typography
                              sx={{
                                fontSize: "0.9rem",
                              }}
                            >
                              {cart?.cartItems[key].qty}
                            </Typography>{" "}
                          </IncButton>
                          <IncButton
                            onClick={() => {
                              onQuantityIncrement(
                                cart?.cartItems[key].product_id
                              );
                            }}
                          >
                            <Add sx={{ fontSize: "0.9rem" }}></Add>
                          </IncButton>
                        </ButtonGroup>
                      </Col>
                      <Col className="col-6">
                        <div>
                          <p
                            style={{
                              fontSize: "0.9rem",
                              fontWeight: "600",
                              marginTop: "auto",
                              marginBottom: "auto",
                              color: "#2e7d32",
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
                  {cart?.cartItems[key].ingredient_exists_flag === "Y" ? (
                    <Typography variant="body2" color="text.secondary">
                      <p
                        style={{
                          marginBottom: "0.5rem",
                          marginTop: "1rem",
                          color: "#4285F4",
                          fontSize: "1rem",
                          fontWeight: "600",
                          fontFamily: "Arial",
                        }}
                      >
                        Your Customisation
                      </p>
                      <p>
                        <span
                          style={{
                            fontSize: "1rem",
                            fontWeight: "600",
                            fontFamily: "Arial",
                            color: "#595959",
                          }}
                        >
                          Size :
                        </span>
                        <span
                          style={{
                            fontSize: "1rem",
                            fontWeight: "400",
                            fontFamily: "Arial",
                            color: "#767171",
                          }}
                        >
                          {" "}
                          {cart?.cartItems[key].size}
                        </span>
                      </p>
                    </Typography>
                  ) : null}
                </Col>
              </Row>
              <hr></hr>
            </Card>
          ))}
        </>
      ) : (
        <div>
          <img style={{ width: "100%" }} src={emptyCartImg} alt="Empty Cart" />
        </div>
      )}
    </div>
  );
}
