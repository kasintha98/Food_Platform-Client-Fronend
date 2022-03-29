import React, { useRef, useEffect } from "react";
import { Row, Col, Carousel, Modal } from "react-bootstrap";
import styled from "@emotion/styled";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import pizzaImg from "../../img/pizza.jpg";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Add, Remove } from "@mui/icons-material";
import vegSvg from "../../img/veg.svg";
import chili from "../../img/chili.svg";
import nonvegSvg from "../../img/non-veg.svg";
import Delete from "@mui/icons-material/Delete";
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormGroup,
  Checkbox,
  TextField,
} from "@mui/material";
import { addToCartNew, replaceCartItemNew } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import LinesEllipsis from "react-lines-ellipsis";

const CusomizeBtn = styled(Button)`
  position: absolute;
  right: 5px;
  top: 65px;
  background-color: rgba(255, 255, 255);
  font-size: 0.875rem;
  font-weight: 400;
  font-family: Arial;
  color: #767171;

  &:hover {
    background-color: rgba(255, 255, 255);
  }
`;

const VegImg = styled.img`
  position: absolute;
  left: 5px;
  top: 5px;
`;

const CusFormControlLable = styled(FormControlLabel)`
  & span {
    width: 100%;
    marginright: 0px;
    marginleft: 0px;
    fontsize: 1rem !important;
    fontweight: 400;
    fontfamily: Arial;
    color: #595959;
  }
`;

export default function ProductCard(props) {
  const [open, setOpen] = React.useState(false);
  const [dishAddOn, setDishAddOn] = React.useState("1");
  const [dishSize, setDishSize] = React.useState(props.product.size);
  const [currentProduct, setCurrentProduct] = React.useState(props.product);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const prevProduct = useRef();

  useEffect(() => {
    if (cart?.cartItems && !cart?.cartItems[props.product.product_id]) {
      for (const cartItem in cart?.cartItems) {
        if (cart?.cartItems[cartItem].dish_type === props.product.dish_type) {
          setCurrentProduct(cart?.cartItems[cartItem]);
          setDishSize(cart?.cartItems[cartItem].size);
        }
      }
    }

    prevProduct.current = currentProduct;
    console.log(currentProduct);
  }, [
    currentProduct,
    cart?.cartItems,
    props.product.dish_type,
    props.product.product_id,
  ]);

  const onQuantityIncrement = (product_id) => {
    if (cart.cartItems[product_id]) {
      dispatch(addToCartNew(cart.cartItems[product_id], 1));
    } else {
      dispatch(addToCartNew(currentProduct, 1));
    }
    calculateSubTotal();
  };

  const onQuantityDecrement = (product_id) => {
    dispatch(addToCartNew(cart.cartItems[product_id], -1));
    calculateSubTotal();
  };

  const handleDishAddOn = (event) => {
    setDishAddOn(event.target.value);
  };
  const handleDishSize = (event) => {
    setDishSize(event.target.value);
  };

  const handleCurrentProduct = (curProduct) => {
    setCurrentProduct(curProduct);
  };

  const replaceCartItem = (dupProduct, oldId) => {
    dispatch(replaceCartItemNew(dupProduct, prevProduct.current.product_id));
    calculateSubTotal();
  };

  const calculateSubTotal = () => {
    let total = 0;
    for (let key of Object.keys(cart?.cartItems)) {
      total = total + cart?.cartItems[key].qty * cart?.cartItems[key].price;
    }
    props.onChangeSubTotal(total);
  };

  const renderCustomizeModal = () => {
    return (
      <Modal
        show={open}
        onHide={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ padding: "0px" }}
      >
        <Modal.Header closeButton>Customise Order</Modal.Header>
        <Box>
          <div>
            <Carousel>
              <Carousel.Item style={{ height: "200px" }}>
                <img
                  className="d-block w-100"
                  src={pizzaImg}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item style={{ height: "200px" }}>
                <img
                  className="d-block w-100"
                  src={pizzaImg}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item style={{ height: "200px" }}>
                <img
                  className="d-block w-100"
                  src={pizzaImg}
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>
          <Modal.Body>
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: "600",
                fontFamily: "Arial",
                color: "#595959",
              }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              {currentProduct?.dish_type}{" "}
              {currentProduct.dish_spice_indicater === "Less Spicy" && (
                <>
                  <img style={{ width: "15px" }} src={chili} alt="less-spicy" />
                </>
              )}
              {currentProduct.dish_spice_indicater === "Medium Spicy" && (
                <>
                  <img style={{ width: "15px" }} src={chili} alt="less-spicy" />
                  <img style={{ width: "15px" }} src={chili} alt="less-spicy" />
                </>
              )}
              {currentProduct.dish_spice_indicater === "Extra Hot" && (
                <>
                  <img style={{ width: "15px" }} src={chili} alt="less-spicy" />
                  <img style={{ width: "15px" }} src={chili} alt="less-spicy" />
                  <img style={{ width: "15px" }} src={chili} alt="less-spicy" />
                </>
              )}
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{
                mt: 2,
                fontSize: "0.875rem",
                fontWeight: "400",
                fontFamily: "Arial",
                color: "#767171",
              }}
            >
              <LinesEllipsis
                text={`${currentProduct?.dish_description_id} The real dish discription can
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
            </Typography>
            <div>
              <div>
                <Typography
                  id="modal-modal-description"
                  sx={{
                    mt: 2,
                    fontSize: "1rem",
                    fontWeight: "600",
                    fontFamily: "Arial",
                    color: "#595959",
                  }}
                >
                  Pizza type
                </Typography>
                <div>
                  <FormControl
                    sx={{
                      width: "100%",
                      fontSize: "1rem !important",
                      fontWeight: "400",
                      fontFamily: "Arial",
                      color: "#595959",
                    }}
                  >
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={dishAddOn}
                      onChange={handleDishAddOn}
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label={
                          <Typography
                            sx={{
                              fontSize: "1rem !important",
                              fontWeight: "400",
                              fontFamily: "Arial",
                              color: "#595959",
                            }}
                          >
                            Mix Veg, Pizza (Onion, Tomato)
                          </Typography>
                        }
                        className="borderRound"
                        sx={{
                          marginLeft: "0px",
                        }}
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label={
                          <Typography
                            sx={{
                              fontSize: "1rem !important",
                              fontWeight: "400",
                              fontFamily: "Arial",
                              color: "#595959",
                            }}
                          >
                            Paradise Veg, Pizza (Baby Corn, Olives)
                          </Typography>
                        }
                        className="borderRound"
                        sx={{ marginLeft: "0px" }}
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
              <div>
                <Typography
                  id="modal-modal-description"
                  sx={{
                    mt: 2,
                    fontSize: "1rem",
                    fontWeight: "600",
                    fontFamily: "Arial",
                    color: "#595959",
                  }}
                >
                  Pizza size
                </Typography>
                <div>
                  <FormControl
                    sx={{
                      width: "100%",
                    }}
                  >
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={dishSize}
                      onChange={handleDishSize}
                      defaultValue={currentProduct.size}
                    >
                      {props.products.map((dupProduct) =>
                        dupProduct.dish_type === currentProduct.dish_type ? (
                          <FormControlLabel
                            value={dupProduct.size}
                            control={
                              <Radio
                                onClick={() => {
                                  handleCurrentProduct(dupProduct);
                                  replaceCartItem(
                                    dupProduct,
                                    currentProduct.product_id
                                  );
                                }}
                              />
                            }
                            label={
                              <Typography
                                sx={{
                                  fontSize: "1rem !important",
                                  fontWeight: "400",
                                  fontFamily: "Arial",
                                  color: "#595959",
                                }}
                              >
                                {dupProduct.size}
                              </Typography>
                            }
                            className="borderRound"
                            sx={{ marginLeft: "0px" }}
                          />
                        ) : null
                      )}
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
              <div>
                <Typography
                  id="modal-modal-description"
                  sx={{
                    mt: 2,
                    fontSize: "1rem !important",
                    fontWeight: "600",
                    fontFamily: "Arial",
                    color: "#595959",
                  }}
                >
                  Extra toppings
                </Typography>
                <div>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label={
                        <Typography
                          sx={{
                            fontSize: "1rem !important",
                            fontWeight: "400",
                            fontFamily: "Arial",
                            color: "#595959",
                          }}
                        >
                          Extra Toppings (Regular)
                        </Typography>
                      }
                      sx={{
                        width: "100%",
                        marginRight: "0px",
                        marginLeft: "0px",
                      }}
                      className="borderRound"
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label={
                        <Typography
                          sx={{
                            fontSize: "1rem !important",
                            fontWeight: "400",
                            fontFamily: "Arial",
                            color: "#595959",
                          }}
                        >
                          Extra Toppings (Middle)
                        </Typography>
                      }
                      sx={{
                        width: "100%",
                        marginRight: "0px",
                        marginLeft: "0px",
                      }}
                      className="borderRound"
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label={
                        <Typography
                          sx={{
                            fontSize: "1rem !important",
                            fontWeight: "400",
                            fontFamily: "Arial",
                            color: "#595959",
                          }}
                        >
                          Extra Toppings (Large)
                        </Typography>
                      }
                      sx={{
                        width: "100%",
                        marginRight: "0px",
                        marginLeft: "0px",
                      }}
                      className="borderRound"
                    />
                  </FormGroup>
                </div>
              </div>
              <div>
                <Typography
                  id="modal-modal-description"
                  sx={{
                    mt: 2,
                    fontWeight: "600",
                    fontSize: "1rem !important",
                    fontFamily: "Arial",
                    color: "#595959",
                  }}
                >
                  Paneer & Cheese
                </Typography>
                <div>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label={
                        <Typography
                          sx={{
                            fontSize: "1rem !important",
                            fontWeight: "400",
                            fontFamily: "Arial",
                            color: "#595959",
                          }}
                        >
                          Paneer & Cheese (Regular)
                        </Typography>
                      }
                      sx={{
                        width: "100%",
                        marginRight: "0px",
                        marginLeft: "0px",
                      }}
                      className="borderRound"
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label={
                        <Typography
                          sx={{
                            fontSize: "1rem !important",
                            fontWeight: "400",
                            fontFamily: "Arial",
                            color: "#595959",
                          }}
                        >
                          Paneer & Cheese (Middle)
                        </Typography>
                      }
                      sx={{
                        width: "100%",
                        marginRight: "0px",
                        marginLeft: "0px",
                      }}
                      className="borderRound"
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label={
                        <Typography
                          sx={{
                            fontSize: "1rem !important",
                            fontWeight: "400",
                            fontFamily: "Arial",
                            color: "#595959",
                          }}
                        >
                          Paneer & Cheese (Large)
                        </Typography>
                      }
                      sx={{
                        width: "100%",
                        marginRight: "0px",
                        marginLeft: "0px",
                      }}
                      className="borderRound"
                    />
                  </FormGroup>
                </div>
              </div>
              <div>
                <br></br>
                <TextField
                  id="outlined-multiline-static"
                  label={
                    <Typography
                      sx={{
                        fontSize: "12px !important",
                        fontWeight: "400",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      Special Requests
                    </Typography>
                  }
                  multiline
                  rows={3}
                  sx={{ width: "100%" }}
                  InputProps={{
                    style: {
                      fontSize: "1rem",
                      fontWeight: "400",
                      fontFamily: "Arial",
                      color: "#595959",
                    },
                  }}
                />
              </div>
            </div>
            <div>
              <br></br>
              <Row className="align-items-center">
                <Col className="col-4">
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
                      onClick={() => {
                        onQuantityDecrement(currentProduct?.product_id);
                      }}
                    >
                      {cart?.cartItems[currentProduct?.product_id]?.qty < 2 ? (
                        <Delete sx={{ fontSize: "0.9rem" }}></Delete>
                      ) : (
                        <Remove sx={{ fontSize: "0.9rem" }}></Remove>
                      )}
                    </Button>
                    <TextField
                      size="small"
                      id="numberofitems"
                      type="tel"
                      value={
                        cart?.cartItems[currentProduct?.product_id]?.qty
                          ? cart?.cartItems[currentProduct?.product_id]?.qty
                          : 0
                      }
                      defaultValue={0}
                      InputProps={{ inputProps: { min: 0 } }}
                    />
                    <Button
                      sx={{
                        width: "25px !important",
                        height: "25px",
                        minWidth: "25px !important",
                      }}
                      onClick={() => {
                        onQuantityIncrement(currentProduct?.product_id);
                      }}
                    >
                      <Add sx={{ fontSize: "0.9rem" }}></Add>
                    </Button>
                  </ButtonGroup>
                </Col>
                <Col className="col-8">
                  <Button
                    sx={{ width: "100%" }}
                    variant="contained"
                    color="success"
                    onClick={() => {
                      let qty = cart?.cartItems[currentProduct?.product_id]?.qty
                        ? 0
                        : 0;
                      dispatch(addToCartNew(currentProduct, qty));
                      calculateSubTotal();
                      handleClose();
                    }}
                  >
                    Add to my order ₹{" "}
                    {cart?.cartItems[currentProduct?.product_id]?.qty *
                    cart?.cartItems[currentProduct?.product_id]?.price
                      ? cart?.cartItems[currentProduct?.product_id]?.qty *
                        cart?.cartItems[currentProduct?.product_id]?.price
                      : 0}
                    .00
                  </Button>
                </Col>
              </Row>
            </div>
          </Modal.Body>
        </Box>
      </Modal>
    );
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345, marginTop: 5, position: "relative" }}>
        <CardMedia
          component="img"
          height="100px"
          image={pizzaImg}
          alt="product"
        />
        {props.product.ingredient_exists_flag === "Y" ? (
          <CusomizeBtn onClick={handleOpen} size="small" variant="outlined">
            CUSTOMISE
          </CusomizeBtn>
        ) : null}

        {props.product?.dish_category === "Veg" ? (
          <VegImg src={vegSvg} alt="veg" />
        ) : (
          <VegImg src={nonvegSvg} alt="non-veg" />
        )}
        <VegImg src={vegSvg} alt="veg" />

        <CardContent sx={{ padding: "5px" }}>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "600",
              fontFamily: "Arial",
              color: "#595959",
            }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {props.product?.dish_type === "Fries" ? (
              <>
                {props.product?.dish_type} ({props.product?.size})
              </>
            ) : (
              <>{props.product?.dish_type}</>
            )}

            {currentProduct.dish_spice_indicater === "Less Spicy" && (
              <>
                <img
                  style={{ width: "14px", marginLeft: "5px" }}
                  src={chili}
                  alt="less-spicy"
                />
              </>
            )}
            {currentProduct.dish_spice_indicater === "Medium Spicy" && (
              <>
                <img
                  style={{ width: "14px", marginLeft: "5px" }}
                  src={chili}
                  alt="less-spicy"
                />
                <img
                  style={{ width: "14px", marginLeft: "5px" }}
                  src={chili}
                  alt="less-spicy"
                />
              </>
            )}
            {currentProduct.dish_spice_indicater === "Extra Hot" && (
              <>
                <img
                  style={{ width: "14px", marginLeft: "5px" }}
                  src={chili}
                  alt="less-spicy"
                />
                <img
                  style={{ width: "14px", marginLeft: "5px" }}
                  src={chili}
                  alt="less-spicy"
                />
                <img
                  style={{ width: "14px", marginLeft: "5px" }}
                  src={chili}
                  alt="less-spicy"
                />
              </>
            )}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.875rem",
              fontWeight: "400",
              fontFamily: "Arial",
              color: "#767171",
            }}
            variant="body2"
            color="text.secondary"
          >
            <LinesEllipsis
              text={`${props.product?.dish_description_id} The real dish discription can
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
          </Typography>
        </CardContent>
        <CardActions>
          <Row className="w-100 align-items-center">
            <Col className="col-10">
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  fontFamily: "Arial",
                  color: "#595959",
                }}
              >
                ₹ {props.product?.price}
              </Typography>
            </Col>
            <Col className="col-2">
              <IconButton
                size="small"
                color="success"
                aria-label="add to shopping cart"
                onClick={() => {
                  dispatch(addToCartNew(currentProduct, 1));
                  calculateSubTotal();
                }}
                sx={{ fontSize: "20px" }}
              >
                <AddShoppingCart sx={{ fontSize: "18px" }} />
              </IconButton>
            </Col>
          </Row>
        </CardActions>
      </Card>
      {renderCustomizeModal()}
    </div>
  );
}
