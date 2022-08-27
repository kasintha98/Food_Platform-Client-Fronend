import React, { useEffect, useRef, useState } from "react";
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
import emptyCartImg2 from "./../../img/empty-cart2.jpg";
import emptyCartImg3 from "./../../img/empty-cart3.jpg";
import { imagePath } from "../../urlConfig";
import noImage from "../../img/no-img.png";
import "./style.css";

const imageExt = ".jpg";

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

const CusRow = styled(Row)`
  & p {
    line-height: 1 !important;
    margin-bottom: 0.3rem;
  }
`;

export default function CartCard(props) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [divWidth, setDivWidth] = useState(0);

  useEffect(() => {
    calculateSubTotal();
    calculateExtraTotal();
    calculateChoiceTotal();
  });

  useEffect(() => {
    const width = ref.current ? ref.current.offsetWidth : 0;
    setDivWidth(width);
  }, [ref.current]);

  const onQuantityIncrement = (productId) => {
    dispatch(addToCartNew({ ...cart.cartItems[productId], key: productId }, 1));
    calculateSubTotal();
    props.onChangeSpecialOfferCheckBOGO &&
      props.onChangeSpecialOfferCheckBOGO();
    //props.onChangeSpecialOfferCheckCOMBO1 &&
    //  props.onChangeSpecialOfferCheckCOMBO1();
  };

  const onQuantityDecrement = (productId) => {
    dispatch(
      addToCartNew({ ...cart.cartItems[productId], key: productId }, -1)
    );
    calculateSubTotal();
    props.onChangeSpecialOfferCheckBOGO &&
      props.onChangeSpecialOfferCheckBOGO();
    //props.onChangeSpecialOfferCheckCOMBO1 &&
    //  props.onChangeSpecialOfferCheckCOMBO1();
  };

  const calculateSubTotal = () => {
    let total = 0;
    for (let key of Object.keys(cart?.cartItems)) {
      total = total + cart?.cartItems[key].qty * cart?.cartItems[key].price;
    }
    props.onChangeSubTotal(total);
  };

  const calculateExtraTotal = () => {
    let total = 0;
    for (let key of Object.keys(cart?.cartItems)) {
      total = total + cart?.cartItems[key].extraSubTotalWithQty;
    }
    props.onChangeExtraSubTotal(total);
  };

  const calculateChoiceTotal = () => {
    let total = 0;
    for (let key of Object.keys(cart?.cartItems)) {
      if (Object.keys(cart?.cartItems[key]?.choiceIng).length > 0) {
        total = total + cart?.cartItems[key]?.choiceIng.choiceTotal;
      }
    }
    props.onChangeChoiceTotal(total);
  };

  return (
    <div ref={ref}>
      {Object.keys(cart?.cartItems).length > 0 ? (
        <>
          {Object.keys(cart?.cartItems).map((key, index) => (
            <Card
              key={index}
              sx={{
                maxWidth: "100%",
                marginBottom: "15px",
                boxShadow: "none",
                backgroundColor: "#fff",
              }}
            >
              <CusRow>
                {/* <Col className="col-3">
                  {!cart?.cartItems[key].imagePath ||
                  cart?.cartItems[key].imagePath === "No_Image_Found" ? (
                    <CardMedia
                      component="img"
                      height="100px"
                      image={noImage}
                      alt="product"
                      style={{ borderRadius: "6px" }}
                    />
                  ) : (
                    <CardMedia
                      component="img"
                      height="100px"
                      image={`${imagePath}/${cart?.cartItems[key].imagePath}${imageExt}`}
                      alt="product"
                      style={{ borderRadius: "6px" }}
                    />
                  )}
                </Col> */}
                <Col className="col-12">
                  <div>
                    <Row className="align-items-center">
                      <div className="w375 mr-0 pr-0">
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
                            {cart?.cartItems[key].dishType}
                          </p>
                        </Typography>
                      </div>
                      <div className="w375 p-0 m-0 text-center">
                        <ButtonGroup
                          variant="contained"
                          aria-label="outlined primary button group"
                          sx={{ marginTop: "5px" }}
                        >
                          <IncButton
                            sx={{ border: "none !important" }}
                            onClick={() => {
                              onQuantityDecrement(key);
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
                              onQuantityIncrement(key);
                            }}
                          >
                            <Add sx={{ fontSize: "0.9rem" }}></Add>
                          </IncButton>
                        </ButtonGroup>
                      </div>
                      <Col className="col-3" style={{ paddingLeft: 0 }}>
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
                            {props.bOGOLowestPizzaKey?.some(
                              (el) => el.key === key
                            ) ? (
                              <>
                                {props.bOGOLowestPizzaKey.find(
                                  (x) => x.key === key
                                ).qty *
                                  (props.comboReduceKey &&
                                  props.comboReduceKey.key === key
                                    ? props.comboReduceKey.price
                                    : props.bOGOLowestPizzaKey.find(
                                        (x) => x.key === key
                                      ).price) +
                                  (props.bOGOLowestPizzaKey.find(
                                    (x) => x.key === key
                                  ).extraSubTotalWithQty
                                    ? props.bOGOLowestPizzaKey.find(
                                        (x) => x.key === key
                                      ).extraSubTotalWithQty
                                    : 0) +
                                  (Object.keys(
                                    props.bOGOLowestPizzaKey.find(
                                      (x) => x.key === key
                                    )?.choiceIng
                                  ).length > 0
                                    ? Number(
                                        props.bOGOLowestPizzaKey.find(
                                          (x) => x.key === key
                                        )?.choiceIng.choiceTotal
                                          ? props.bOGOLowestPizzaKey.find(
                                              (x) => x.key === key
                                            )?.choiceIng.choiceTotal
                                          : 0
                                      )
                                    : 0)}
                              </>
                            ) : (
                              <>
                                {cart?.cartItems[key].qty *
                                  (props.comboReduceKey &&
                                  props.comboReduceKey.key === key
                                    ? props.comboReduceKey.price
                                    : cart?.cartItems[key].price) +
                                  (cart?.cartItems[key].extraSubTotalWithQty
                                    ? cart?.cartItems[key].extraSubTotalWithQty
                                    : 0) +
                                  (Object.keys(cart?.cartItems[key]?.choiceIng)
                                    .length > 0
                                    ? cart?.cartItems[key]?.choiceIng
                                        .choiceTotal
                                    : 0)}
                              </>
                            )}
                            .00
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  {cart?.cartItems[key].ingredientExistsFalg === "Y" ? (
                    <Typography variant="body2" color="text.secondary">
                      {/* <p
                        style={{
                          marginBottom: "0.5rem",
                          marginTop: "1rem",
                          color: "#4285F4",
                          fontSize: "0.9rem",
                          fontWeight: "600",
                          fontFamily: "Arial",
                          lineHeight: "1",
                        }}
                      >
                        Your Customisation
                      </p> */}
                      <Typography className="mt-2">
                        <Row>
                          <div className="w75">
                            <span
                              style={{
                                fontSize: "0.8rem",
                                fontWeight: "600",
                                fontFamily: "Arial",
                                color: "#595959",
                                lineHeight: "1",
                              }}
                            >
                              Size :
                            </span>
                            <span
                              style={{
                                fontSize: "0.8rem",
                                fontWeight: "600",
                                fontFamily: "Arial",
                                color: "#595959",
                                lineHeight: "1",
                              }}
                            >
                              {" "}
                              {cart?.cartItems[key].productSize}
                            </span>
                          </div>
                          <div className="w25">
                            <span
                              style={{
                                fontSize: "0.8rem",
                                fontWeight: "600",
                                fontFamily: "Arial",
                                color: "rgb(46, 125, 50)",
                                lineHeight: "1",
                              }}
                            >
                              {"₹ "}
                              {props.bOGOLowestPizzaKey?.some(
                                (el) => el.key === key
                              ) ? (
                                <>
                                  {" "}
                                  {props.bOGOLowestPizzaKey.find(
                                    (x) => x.key === key
                                  ).price *
                                    props.bOGOLowestPizzaKey.find(
                                      (x) => x.key === key
                                    ).qty}
                                </>
                              ) : (
                                <>
                                  {cart?.cartItems[key].price *
                                    cart?.cartItems[key].qty}
                                </>
                              )}
                              .00
                            </span>
                          </div>
                        </Row>
                      </Typography>
                      <Typography>
                        <Row>
                          <Col className="pr-0 mr-0 col-12">
                            {cart?.cartItems[key]?.extra &&
                            Object.keys(cart?.cartItems[key]?.extra).length >
                              0 ? (
                              <span
                                style={{
                                  fontSize: "0.8rem",
                                  fontWeight: "600",
                                  fontFamily: "Arial",
                                  color: "#595959",
                                  lineHeight: "1",
                                }}
                              >
                                Extra Topping :{" "}
                              </span>
                            ) : null}
                          </Col>
                        </Row>
                        <Row>
                          <Col className="p-0 mr-0  col-12">
                            <Row className="m-0">
                              {cart?.cartItems[key]?.extra ? (
                                <>
                                  {Object.keys(cart?.cartItems[key]?.extra).map(
                                    (index) => (
                                      <>
                                        <div className="w75">
                                          <span
                                            style={{
                                              fontSize: "0.8rem",
                                              fontWeight: "400",
                                              fontFamily: "Arial",
                                              color: "#767171",
                                              lineHeight: "1",
                                            }}
                                          >
                                            {
                                              cart?.cartItems[key]?.extra[index]
                                                .ingredientType
                                            }
                                          </span>
                                        </div>
                                        <div className="w25">
                                          <span
                                            style={{
                                              fontSize: "0.8rem",
                                              fontWeight: "600",
                                              fontFamily: "Arial",
                                              color: "rgb(46, 125, 50)",
                                              lineHeight: "1",
                                            }}
                                          >
                                            {"₹ "}
                                            {props.bOGOLowestPizzaKey?.some(
                                              (el) => el.key === key
                                            ) ? (
                                              <>
                                                {props.bOGOLowestPizzaKey.find(
                                                  (x) => x.key === key
                                                )?.extra[index].price *
                                                  props.bOGOLowestPizzaKey.find(
                                                    (x) => x.key === key
                                                  ).qty}
                                              </>
                                            ) : (
                                              <>
                                                {cart?.cartItems[key]?.extra[
                                                  index
                                                ].price *
                                                  cart?.cartItems[key].qty}
                                              </>
                                            )}
                                            .00
                                          </span>
                                        </div>
                                      </>
                                    )
                                  )}
                                </>
                              ) : null}
                            </Row>
                          </Col>
                        </Row>
                      </Typography>
                      <Typography>
                        {cart?.cartItems[key]?.choiceIng &&
                        Object.keys(cart?.cartItems[key]?.choiceIng).length >
                          1 ? (
                          <>
                            <Row>
                              <Col className="pr-0 mr-0 col-9">
                                <span
                                  style={{
                                    fontSize: "0.8rem",
                                    fontWeight: "600",
                                    fontFamily: "Arial",
                                    color: "#595959",
                                    lineHeight: "1",
                                  }}
                                >
                                  Base:{" "}
                                </span>
                                <span
                                  style={{
                                    fontSize: "0.8rem",
                                    fontWeight: "600",
                                    fontFamily: "Arial",
                                    color: "#767171",
                                    lineHeight: "1",
                                  }}
                                >
                                  {
                                    cart?.cartItems[key]?.choiceIng
                                      .ingredientType
                                  }
                                </span>
                              </Col>
                              <div className="w25">
                                <span
                                  style={{
                                    fontSize: "0.8rem",
                                    fontWeight: "600",
                                    fontFamily: "Arial",
                                    color: "rgb(46, 125, 50)",
                                    lineHeight: "1",
                                  }}
                                >
                                  {"₹ "}
                                  {props.bOGOLowestPizzaKey?.some(
                                    (el) => el.key === key
                                  ) ? (
                                    <>
                                      {props.bOGOLowestPizzaKey.find(
                                        (x) => x.key === key
                                      )?.choiceIng.price *
                                        props.bOGOLowestPizzaKey.find(
                                          (x) => x.key === key
                                        ).qty}
                                    </>
                                  ) : (
                                    <>
                                      {cart?.cartItems[key]?.choiceIng.price *
                                        cart?.cartItems[key].qty}
                                    </>
                                  )}
                                  .00
                                </span>
                              </div>
                            </Row>
                          </>
                        ) : null}
                      </Typography>

                      {cart?.cartItems[key].specialText ? (
                        <p>
                          <span
                            style={{
                              fontSize: "0.8rem",
                              fontWeight: "600",
                              fontFamily: "Arial",
                              color: "#595959",
                              lineHeight: "1",
                            }}
                          >
                            Special Request:
                          </span>
                          <span
                            style={{
                              fontSize: "0.8rem",
                              fontWeight: "400",
                              fontFamily: "Arial",
                              color: "#767171",
                              lineHeight: "1",
                            }}
                          >
                            {" "}
                            {cart?.cartItems[key].specialText}
                          </span>
                        </p>
                      ) : null}
                    </Typography>
                  ) : null}
                </Col>
              </CusRow>
              <hr></hr>
            </Card>
          ))}
        </>
      ) : (
        <img
          style={{ width: "100%" }}
          height={"393px"}
          src={emptyCartImg3}
          alt="Empty Cart"
        />
      )}
    </div>
  );
}
