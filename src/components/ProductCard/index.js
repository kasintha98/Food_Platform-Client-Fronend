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
import pizzaPic from "../../img/pizzaPic.jpg";
import thinImg from "../../img/thin.svg";
import panImg from "../../img/pan.svg";
import cheeseImg from "../../img/cheese.svg";
import noImage from "../../img/no-img.png";
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
import {
  addToCartNew,
  replaceCartItemNew,
  getMenuIngredientsByProductId,
} from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import LinesEllipsis from "react-lines-ellipsis";
import { imagePath } from "../../urlConfig";
import "./style.css";

const imageExt = ".jpg";

const CheckoutButton = styled(Button)`
  background-color: rgb(130, 187, 55);

  &:hover {
    background-color: rgb(130, 187, 55);
  }
`;

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

const Parent = styled.div`
  font-size: 0.75rem !important;
  font-weight: 400;
  font-family: Arial;
  color: #595959;
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-evenly !important;
`;

const ImgContainer = styled.div`
  height: 6vw;
  @media (max-width: 992px) {
    height: 10vw;
  }
`;

const CusRadio = styled(Radio)`
  & .Mui-checked {
    color: #343a40;
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

const CusCardMedia = styled(CardMedia)`
  &:hover {
    cursor: pointer;
  }
`;

const CusTypography = styled(Typography)`
  @media (max-width: 600px) {
    min-height: 38px;
  }
`;

export default function ProductCard(props) {
  const [open, setOpen] = React.useState(false);
  const [showPictureModal, setshowPictureModal] = React.useState(false);
  const [dishCusType, setDishCusType] = React.useState("1");
  const [image, setImage] = React.useState("");
  const [imageName, setImageName] = React.useState("");
  const [choiseIngrdients, setChoiseIngrdients] = React.useState([]);
  const [toppingIngrdients, setToppingIngrdients] = React.useState([]);
  const [dishSize, setDishSize] = React.useState(props.product.productSize);
  const [currentProduct, setCurrentProduct] = React.useState(props.product);
  const [toppingCustomization, setToppingCustomization] = React.useState({});
  const [toppingSubTotal, setToppingSubTotal] = React.useState(0);
  const [choice, setChoice] = React.useState("");
  const [toppings, setToppings] = React.useState({});
  const [specialText, setSpecialText] = React.useState("");

  const cart = useSelector((state) => state.cart);
  let ingredients = useSelector((state) => state.product.ingredients);

  let { check } = toppingCustomization;

  const dispatch = useDispatch();
  const prevProduct = useRef();

  const handleSpecialText = (event) => {
    setSpecialText(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
    dispatch(getMenuIngredientsByProductId(currentProduct.productId));
    //extra topings api comes here(replace ingredients with toppings)
  };
  const handleClose = () => setOpen(false);

  const handleClosePictureModal = () => setshowPictureModal(false);
  const handleShowPictureModal = () => setshowPictureModal(true);

  useEffect(() => {
    if (cart?.cartItems && !cart?.cartItems[props.product.productId]) {
      for (const cartItem in cart?.cartItems) {
        if (cart?.cartItems[cartItem].dishType === props.product.dishType) {
          setCurrentProduct(cart?.cartItems[cartItem]);
          setDishSize(cart?.cartItems[cartItem].productSize);
        }
      }
    }

    //dispatch(getMenuIngredientsByProductId(currentProduct.productId));

    prevProduct.current = currentProduct;
    console.log(currentProduct);
    let filteredArrayTopping = [];
    for (let i = 0; i < ingredients.length; i++) {
      if (ingredients[i].category === "Topping") {
        filteredArrayTopping.push(ingredients[i]);
      }
    }
    setToppingIngrdients(filteredArrayTopping);

    let filteredArrayChoise = [];
    for (let i = 0; i < ingredients.length; i++) {
      if (ingredients[i].category === "Choise of Base") {
        filteredArrayChoise.push(ingredients[i]);
      }
    }
    setChoiseIngrdients(filteredArrayChoise);
  }, [
    currentProduct,
    cart?.cartItems,
    props.product.dishType,
    props.product.productId,
    ingredients,
  ]);

  const onQuantityIncrement = (productId) => {
    if (cart.cartItems[productId]) {
      dispatch(
        addToCartNew(
          cart.cartItems[productId],
          1,
          toppings,
          toppingSubTotal,
          specialText,
          null
        )
      );
    } else {
      dispatch(
        addToCartNew(
          currentProduct,
          1,
          toppings,
          toppingSubTotal,
          specialText,
          null
        )
      );
    }
    calculateSubTotal();
  };

  const onQuantityDecrement = (productId) => {
    dispatch(
      addToCartNew(
        cart.cartItems[productId],
        -1,
        toppings,
        toppingSubTotal,
        specialText,
        null
      )
    );
    calculateSubTotal();
  };

  const handleDishCusType = (event) => {
    setDishCusType(event.target.value);
  };
  const handleDishSize = (event) => {
    setDishSize(event.target.value);
  };

  const handleChoice = (event) => {
    setChoice(event.target.value);
    console.log(event.target.value);
  };

  const handleCurrentProduct = (curProduct) => {
    setCurrentProduct(curProduct);
  };

  const replaceCartItem = (dupProduct, oldId) => {
    dispatch(replaceCartItemNew(dupProduct, prevProduct.current.productId));
    calculateSubTotal();
  };

  const calculateSubTotal = () => {
    let total = 0;
    for (let key of Object.keys(cart?.cartItems)) {
      console.log(total);
      total = total + cart?.cartItems[key].qty * cart?.cartItems[key].price;
      console.log(cart?.cartItems[key].qty);
      console.log(cart?.cartItems[key].price);
    }
    console.log(total);
    props.onChangeSubTotal(total);
  };

  const handleCustomization = (event) => {
    setToppingCustomization({
      ...toppingCustomization,
      [event.target.name]: event.target.checked,
    });
    console.log(toppingCustomization);
  };

  const handleClearCheckBox = () => {
    setToppings({});
    calculateToppingTotal();
  };

  const handleExtra = (ing) => {
    const existing = toppings[ing.subProductId];
    if (existing) {
      delete toppings[ing.subProductId];
    } else {
      toppings[ing.subProductId] = { ...ing };
    }
    calculateToppingTotal();
    console.log(toppings);
  };

  const calculateToppingTotal = () => {
    let extraTotal = 0;
    for (let key of Object.keys(toppings)) {
      extraTotal = extraTotal + toppings[key].price;
    }
    console.log(extraTotal);
    setToppingSubTotal(extraTotal);
  };

  const renderPictureModal = () => {
    return (
      <Modal show={showPictureModal} onHide={handleClosePictureModal}>
        <Modal.Header closeButton>
          <Modal.Title>{imageName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img style={{ width: "100%" }} src={image} alt="Product" />
        </Modal.Body>
      </Modal>
    );
  };

  const renderCustomizeModal = () => {
    return (
      <Modal
        show={open}
        onHide={() => {
          handleClose();
          //calculateSubTotal();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ padding: "0px" }}
      >
        <Modal.Header closeButton>Customise Order</Modal.Header>
        <Box style={{ maxHeight: "550px", overflowY: "auto" }}>
          <Modal.Body>
            <div>
              <Row>
                <Col className="col-3">
                  <Carousel>
                    <Carousel.Item style={{ width: "100%" }}>
                      {!currentProduct?.imagePath ||
                      currentProduct?.imagePath === "No_Image_Found" ? (
                        <img
                          className="d-block w-100"
                          src={noImage}
                          alt="First slide"
                          height="150px"
                          width="100%"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <img
                          className="d-block w-100"
                          src={`${imagePath}/${currentProduct?.imagePath}${imageExt}`}
                          alt="First slide"
                          height="150px"
                          width="100%"
                          style={{ objectFit: "cover" }}
                        />
                      )}
                    </Carousel.Item>
                  </Carousel>
                </Col>
                <Col className="col-9">
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      fontFamily: "Arial",
                      color: "#595959",
                    }}
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    <Row>
                      <Col className="col-11">
                        {currentProduct?.dishType}{" "}
                        {currentProduct.dishSpiceIndicatory ===
                          "Less Spicy" && (
                          <>
                            <img
                              style={{ width: "15px" }}
                              src={chili}
                              alt="less-spicy"
                            />
                          </>
                        )}
                        {currentProduct.dishSpiceIndicatory ===
                          "Medium Spicy" && (
                          <>
                            <img
                              style={{ width: "15px" }}
                              src={chili}
                              alt="less-spicy"
                            />
                            <img
                              style={{ width: "15px" }}
                              src={chili}
                              alt="less-spicy"
                            />
                          </>
                        )}
                        {currentProduct.dishSpiceIndicatory === "Extra Hot" && (
                          <>
                            <img
                              style={{ width: "15px" }}
                              src={chili}
                              alt="less-spicy"
                            />
                            <img
                              style={{ width: "15px" }}
                              src={chili}
                              alt="less-spicy"
                            />
                            <img
                              style={{ width: "15px" }}
                              src={chili}
                              alt="less-spicy"
                            />
                          </>
                        )}
                      </Col>
                      <Col className="col-1">
                        {currentProduct.dishCategory === "Veg" ? (
                          <img src={vegSvg} alt="veg" />
                        ) : (
                          <img src={nonvegSvg} alt="veg" />
                        )}
                      </Col>
                    </Row>
                  </Typography>
                  <Typography
                    id="modal-modal-description"
                    sx={{
                      mt: 2,
                      fontSize: "0.75rem",
                      fontWeight: "400",
                      fontFamily: "Arial",
                      color: "#AB3C19",
                    }}
                  >
                    <LinesEllipsis
                      text={`${currentProduct?.dishDescriptionId}`}
                      maxLine="3"
                      ellipsis="..."
                      trimRight
                      basedOn="letters"
                    />
                  </Typography>
                </Col>
              </Row>
            </div>
            <div>
              {/* <div>
                <Typography
                  id="modal-modal-description"
                  sx={{
                    mt: 2,
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    fontFamily: "Arial",
                    color: "#595959",
                  }}
                >
                  Type
                </Typography>
                <div>
                  <FormControl
                    sx={{
                      width: "100%",
                      fontSize: "0.75rem !important",
                      fontWeight: "400",
                      fontFamily: "Arial",
                      color: "#595959",
                    }}
                  >
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={dishCusType}
                      onChange={handleDishCusType}
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label={
                          <Typography
                            sx={{
                              fontSize: "0.75rem !important",
                              fontWeight: "400",
                              fontFamily: "Arial",
                              color: "#595959",
                            }}
                          >
                            {currentProduct?.dishType} ({" "}
                            {defaultIngrdients.map((ing) => (
                              <span>{ing.ingredientType}, </span>
                            ))}{" "}
                            )<span style={{ fontWeight: "600" }}></span>
                          </Typography>
                        }
                        className="borderRound"
                        sx={{
                          marginLeft: "0px",
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div> */}
              <div>
                {currentProduct.productSize !== "Regular" ? (
                  <>
                    <Typography
                      id="modal-modal-description"
                      sx={{
                        mt: 2,
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      Size
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
                          defaultValue={currentProduct.productSize}
                        >
                          <Row>
                            {props.products.map((dupProduct) =>
                              dupProduct.dishType ===
                              currentProduct.dishType ? (
                                <Col className="col-4">
                                  <FormControlLabel
                                    value={dupProduct.productSize}
                                    control={
                                      <Radio
                                        onClick={() => {
                                          handleCurrentProduct(dupProduct);
                                          if (
                                            !cart?.cartItems[
                                              dupProduct.productId
                                            ]
                                          ) {
                                            replaceCartItem(
                                              dupProduct,
                                              currentProduct.productId
                                            );
                                          }
                                          dispatch(
                                            getMenuIngredientsByProductId(
                                              dupProduct.productId
                                            )
                                          );
                                          handleClearCheckBox();
                                        }}
                                      />
                                    }
                                    label={
                                      <Typography
                                        sx={{
                                          fontSize: "0.75rem !important",
                                          fontWeight: "600",
                                          fontFamily: "Arial",
                                          color: "#FF0000",
                                          textAlign: "center",
                                          paddingBottom: "15px",
                                        }}
                                      >
                                        {dupProduct.productSize === "Small" ? (
                                          <ImgContainer>
                                            <img
                                              style={{ width: "40%" }}
                                              src={pizzaPic}
                                              alt="pizza"
                                            ></img>
                                          </ImgContainer>
                                        ) : dupProduct.productSize ===
                                          "Medium" ? (
                                          <ImgContainer>
                                            <img
                                              style={{ width: "50%" }}
                                              src={pizzaPic}
                                              alt="pizza"
                                            ></img>
                                          </ImgContainer>
                                        ) : dupProduct.productSize ===
                                          "Large" ? (
                                          <ImgContainer>
                                            <img
                                              style={{ width: "60%" }}
                                              src={pizzaPic}
                                              alt="pizza"
                                            ></img>
                                          </ImgContainer>
                                        ) : (
                                          <ImgContainer>
                                            <img
                                              style={{ width: "50%" }}
                                              src={pizzaPic}
                                              alt="pizza"
                                            ></img>
                                          </ImgContainer>
                                        )}

                                        <br></br>
                                        {dupProduct.productSize}
                                        <br></br>
                                        <div style={{ marginTop: "5px" }}>
                                          {cart?.cartItems[
                                            dupProduct.productId
                                          ] ? (
                                            <span
                                              style={{
                                                fontWeight: "600",
                                                backgroundColor: "#C29401",
                                                color: "#fff",
                                                padding: "6px",
                                                borderRadius: "5px",
                                              }}
                                            >
                                              + ₹ {dupProduct.price}
                                            </span>
                                          ) : (
                                            <span
                                              style={{
                                                fontWeight: "600",
                                                backgroundColor: "#BFBFBF",
                                                color: "#fff",
                                                padding: "6px",
                                                borderRadius: "5px",
                                              }}
                                            >
                                              + ₹ {dupProduct.price}
                                            </span>
                                          )}
                                        </div>
                                      </Typography>
                                    }
                                    className="pizzaRound"
                                    sx={{ marginLeft: "0px" }}
                                    labelPlacement="bottom"
                                  />
                                </Col>
                              ) : null
                            )}
                          </Row>
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </>
                ) : null}
              </div>
              <div>
                {choiseIngrdients.length > 0 ? (
                  <>
                    <Typography
                      id="modal-modal-description"
                      sx={{
                        mt: 2,
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      Choice of Base
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
                          value={choice}
                          onChange={handleChoice}
                          //defaultValue={choiseIngrdients[0].ingredientType}
                        >
                          <Row>
                            {choiseIngrdients?.map((choiceIng) => (
                              <Col className="col-4">
                                <FormControlLabel
                                  value={choiceIng.ingredientType}
                                  control={
                                    <Radio
                                      onClick={() => {
                                        dispatch(
                                          addToCartNew(
                                            currentProduct,
                                            0,
                                            toppings,
                                            toppingSubTotal,
                                            specialText,
                                            choiceIng
                                          )
                                        );
                                      }}
                                    />
                                  }
                                  label={
                                    <Typography
                                      sx={{
                                        fontSize: "0.75rem !important",
                                        fontWeight: "600",
                                        fontFamily: "Arial",
                                        color: "#FF0000",
                                        textAlign: "center",
                                        paddingBottom: "15px",
                                      }}
                                    >
                                      {choiceIng.ingredientType ===
                                      "Thincrust" ? (
                                        <ImgContainer>
                                          <img
                                            style={{ width: "50%" }}
                                            src={thinImg}
                                            alt="thin"
                                          ></img>
                                        </ImgContainer>
                                      ) : choiceIng.ingredientType ===
                                        "Cheese Burst" ? (
                                        <ImgContainer>
                                          <img
                                            style={{ width: "50%" }}
                                            src={cheeseImg}
                                            alt="cheese"
                                          ></img>
                                        </ImgContainer>
                                      ) : choiceIng.ingredientType === "Pan" ? (
                                        <ImgContainer>
                                          <img
                                            style={{ width: "50%" }}
                                            src={panImg}
                                            alt="pan"
                                          ></img>
                                        </ImgContainer>
                                      ) : (
                                        <ImgContainer>
                                          <img
                                            style={{ width: "50%" }}
                                            src={panImg}
                                            alt="pan"
                                          ></img>
                                        </ImgContainer>
                                      )}

                                      <br></br>
                                      {choiceIng.ingredientType}
                                      <br></br>
                                      <div style={{ marginTop: "5px" }}>
                                        {choice === choiceIng.ingredientType ? (
                                          <span
                                            style={{
                                              fontWeight: "600",
                                              backgroundColor: "#C29401",
                                              color: "#fff",
                                              padding: "6px",
                                              borderRadius: "5px",
                                            }}
                                          >
                                            + ₹ {choiceIng.price}
                                          </span>
                                        ) : (
                                          <span
                                            style={{
                                              fontWeight: "600",
                                              backgroundColor: "#BFBFBF",
                                              color: "#fff",
                                              padding: "6px",
                                              borderRadius: "5px",
                                            }}
                                          >
                                            + ₹ {choiceIng.price}
                                          </span>
                                        )}
                                      </div>
                                    </Typography>
                                  }
                                  className="pizzaRound"
                                  sx={{ marginLeft: "0px" }}
                                  labelPlacement="bottom"
                                />
                              </Col>
                            ))}
                          </Row>
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </>
                ) : null}
              </div>
              <div>
                {toppingIngrdients.length > 0 ? (
                  <>
                    <Typography
                      id="modal-modal-description"
                      sx={{
                        mt: 2,
                        fontSize: "0.9rem !important",
                        fontWeight: "600",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      Topping
                    </Typography>
                    <div>
                      <FormGroup>
                        <Row>
                          {toppingIngrdients.map((ing) => (
                            <Col className="col-6">
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      toppings[ing.subProductId] ? true : false
                                    }
                                    onChange={(e) => {
                                      handleCustomization(e);
                                      handleExtra(ing);
                                    }}
                                    name={ing.ingredientType}
                                  />
                                }
                                label={
                                  <Typography
                                    sx={{
                                      fontSize: "0.75rem !important",
                                      fontWeight: "400",
                                      fontFamily: "Arial",
                                      color: "#595959",
                                      width: "100%",
                                    }}
                                  >
                                    <Row>
                                      <Col className="col-xs-12 col-sm-12 col-md-12 col-lg-7">
                                        {ing.ingredientType}
                                      </Col>
                                      <Col className="col-xs-12 col-sm-12 col-md-12 col-lg-5 ">
                                        {toppings[ing.subProductId] ? (
                                          <span
                                            style={{
                                              fontWeight: "600",
                                              backgroundColor: "#C29401",
                                              color: "#fff",
                                              padding: "6px",
                                            }}
                                          >
                                            + ₹ {ing.price}
                                          </span>
                                        ) : (
                                          <span
                                            style={{
                                              fontWeight: "600",
                                              backgroundColor: "#BFBFBF",
                                              color: "#fff",
                                              padding: "6px",
                                            }}
                                          >
                                            {" "}
                                            + ₹ {ing.price}{" "}
                                          </span>
                                        )}
                                      </Col>
                                    </Row>
                                  </Typography>
                                }
                                sx={{
                                  width: "100%",
                                  marginRight: "0px",
                                  marginLeft: "0px",
                                }}
                                className="borderRound"
                              />
                            </Col>
                          ))}
                        </Row>
                      </FormGroup>
                    </div>
                  </>
                ) : null}
              </div>

              <div>
                <br></br>
                <TextField
                  id="outlined-multiline-static"
                  label={
                    <Typography
                      sx={{
                        fontSize: "0.75rem !important",
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
                  value={specialText}
                  onChange={handleSpecialText}
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
                    <IncButton
                      sx={{ border: "none !important" }}
                      onClick={() => {
                        onQuantityDecrement(currentProduct?.productId);
                      }}
                    >
                      {cart?.cartItems[currentProduct?.productId]?.qty < 2 ? (
                        <Delete sx={{ fontSize: "0.9rem" }}></Delete>
                      ) : (
                        <Remove sx={{ fontSize: "0.9rem" }}></Remove>
                      )}
                    </IncButton>
                    {/* <TextField
                      size="small"
                      id="numberofitems"
                      type="tel"
                      value={
                        cart?.cartItems[currentProduct?.productId]?.qty
                          ? cart?.cartItems[currentProduct?.productId]?.qty
                          : 0
                      }
                      defaultValue={0}
                      InputProps={{ inputProps: { min: 0 } }}
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
                        {cart?.cartItems[currentProduct?.productId]?.qty
                          ? cart?.cartItems[currentProduct?.productId]?.qty
                          : 0}
                      </Typography>{" "}
                    </IncButton>

                    <IncButton
                      onClick={() => {
                        onQuantityIncrement(currentProduct?.productId);
                      }}
                    >
                      <Add sx={{ fontSize: "0.9rem" }}></Add>
                    </IncButton>
                  </ButtonGroup>
                </Col>
                <Col className="col-8">
                  <CheckoutButton
                    className="w-100"
                    variant="contained"
                    onClick={() => {
                      let qty = cart?.cartItems[currentProduct?.productId]?.qty
                        ? 0
                        : 0;
                      dispatch(
                        addToCartNew(
                          currentProduct,
                          qty,
                          toppings,
                          toppingSubTotal,
                          specialText,
                          null
                        )
                      );
                      calculateSubTotal();
                      setSpecialText("");
                      handleClose();
                    }}
                  >
                    Add to my order ₹{" "}
                    {cart?.cartItems[currentProduct?.productId]?.qty *
                    cart?.cartItems[currentProduct?.productId]?.price
                      ? cart?.cartItems[currentProduct?.productId]?.qty *
                          cart?.cartItems[currentProduct?.productId]?.price +
                        toppingSubTotal +
                        (cart?.cartItems[currentProduct?.productId]?.choiceIng
                          .price
                          ? cart?.cartItems[currentProduct?.productId]
                              ?.choiceIng.price
                          : 0)
                      : 0}
                    .00
                  </CheckoutButton>
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
        {!currentProduct?.imagePath ||
        currentProduct?.imagePath === "No_Image_Found" ? (
          <CusCardMedia
            component="img"
            height="100px"
            image={noImage}
            alt="product"
            onClick={() => {
              handleShowPictureModal();
              setImage(noImage);
              setImageName(props.product?.dishType);
            }}
          />
        ) : (
          <CusCardMedia
            component="img"
            height="100px"
            image={`${imagePath}/${currentProduct?.imagePath}${imageExt}`}
            alt="product"
            onClick={() => {
              handleShowPictureModal();
              setImage(`${imagePath}/${currentProduct?.imagePath}${imageExt}`);
              setImageName(props.product?.dishType);
            }}
          />
        )}

        {props.product.ingredientExistsFalg === "Y" ? (
          <CusomizeBtn
            onClick={() => {
              if (!cart?.cartItems[currentProduct.productId]) {
                dispatch(
                  addToCartNew(
                    currentProduct,
                    1,
                    toppings,
                    toppingSubTotal,
                    specialText,
                    //choiseIngrdients[0]
                    null
                  )
                );
                calculateSubTotal();
              }
              setChoice(
                cart?.cartItems[currentProduct.productId]?.choiceIng
                  ? cart?.cartItems[currentProduct.productId]?.choiceIng
                      ?.ingredientType
                  : choiseIngrdients[0]?.ingredientType
              );
              setSpecialText(
                cart?.cartItems[currentProduct?.productId]?.specialText
                  ? cart?.cartItems[currentProduct?.productId]?.specialText
                  : ""
              );

              handleOpen();
            }}
            size="small"
            variant="outlined"
          >
            CUSTOMISE
          </CusomizeBtn>
        ) : null}

        {props.product?.dishCategory === "Veg" ? (
          <VegImg src={vegSvg} alt="veg" />
        ) : (
          <VegImg src={nonvegSvg} alt="non-veg" />
        )}
        <VegImg src={vegSvg} alt="veg" />

        <CardContent sx={{ padding: "5px" }}>
          <CusTypography
            sx={{
              fontSize: "0.9rem",
              fontWeight: "600",
              fontFamily: "Arial",
              color: "#595959",
            }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {props.product?.dishType === "Fries" ? (
              <>
                {props.product?.dishType} ({props.product?.productSize})
              </>
            ) : (
              <>{props.product?.dishType}</>
            )}

            {currentProduct.dishSpiceIndicatory === "Less Spicy" && (
              <>
                <img
                  style={{ width: "14px", marginLeft: "5px" }}
                  src={chili}
                  alt="less-spicy"
                />
              </>
            )}
            {currentProduct.dishSpiceIndicatory === "Medium Spicy" && (
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
            {currentProduct.dishSpiceIndicatory === "Extra Hot" && (
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
          </CusTypography>
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: "400",
              fontFamily: "Arial",
              color: "#767171",
            }}
            variant="body2"
            color="text.secondary"
          >
            <LinesEllipsis
              text={`${props.product?.dishDescriptionId}`}
              maxLine="3"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </Typography>
        </CardContent>
        <CardActions>
          <Row className="w-100 align-items-center" style={{ margin: "0px" }}>
            <Col className=" col-xl-6">
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  fontFamily: "Arial",
                  color: "#2e7d32",
                }}
              >
                ₹ {props.product?.price}
              </Typography>
            </Col>
            <Col className=" col-xl-6">
              <Button
                onClick={() => {
                  /* dispatch(
                    getMenuIngredientsByProductId(currentProduct.productId)
                  ).then((res) => {
                    ingredients = res;
                  }); */
                  dispatch(
                    addToCartNew(
                      currentProduct,
                      1,
                      toppings,
                      toppingSubTotal,
                      specialText,
                      //choiseIngrdients[0]
                      null
                    )
                  );
                  calculateSubTotal();
                }}
                variant="contained"
                color="error"
                sx={{ width: "100%" }}
              >
                Add
              </Button>
            </Col>
          </Row>
        </CardActions>
      </Card>
      {renderCustomizeModal()}
      {renderPictureModal()}
    </div>
  );
}
