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
  const [defaultIngrdients, setDefaultIngrdients] = React.useState([]);
  const [extraIngrdients, setExtraIngrdients] = React.useState([]);
  const [dishSize, setDishSize] = React.useState(props.product.productSize);
  const [currentProduct, setCurrentProduct] = React.useState(props.product);
  const [extraCustomization, setExtraCustomization] = React.useState({});
  const [extraSubTotal, setExtraSubTotal] = React.useState(0);
  const [extra, setExtra] = React.useState({});
  const [specialText, setSpecialText] = React.useState("");

  const cart = useSelector((state) => state.cart);
  const ingredients = useSelector((state) => state.product.ingredients);

  let { check } = extraCustomization;

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

    prevProduct.current = currentProduct;
    console.log(currentProduct);

    let filteredArrayDefault = [];
    for (let i = 0; i < ingredients.length; i++) {
      if (ingredients[i].category === "Default") {
        filteredArrayDefault.push(ingredients[i]);
      }
    }
    setDefaultIngrdients(filteredArrayDefault);

    let filteredArrayExtra = [];
    for (let i = 0; i < ingredients.length; i++) {
      if (ingredients[i].category === "Extra") {
        filteredArrayExtra.push(ingredients[i]);
      }
    }
    setExtraIngrdients(filteredArrayExtra);
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
          extra,
          extraSubTotal,
          specialText
        )
      );
    } else {
      dispatch(
        addToCartNew(currentProduct, 1, extra, extraSubTotal, specialText)
      );
    }
    calculateSubTotal();
  };

  const onQuantityDecrement = (productId) => {
    dispatch(
      addToCartNew(
        cart.cartItems[productId],
        -1,
        extra,
        extraSubTotal,
        specialText
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
    setExtraCustomization({
      ...extraCustomization,
      [event.target.name]: event.target.checked,
    });
    console.log(extraCustomization);
  };

  const handleClearCheckBox = () => {
    setExtra({});
    calculateExtraTotal();
  };

  const handleExtra = (ing) => {
    const existing = extra[ing.subProductId];
    if (existing) {
      delete extra[ing.subProductId];
    } else {
      extra[ing.subProductId] = { ...ing };
    }
    calculateExtraTotal();
    console.log(extra);
  };

  const calculateExtraTotal = () => {
    let extraTotal = 0;
    for (let key of Object.keys(extra)) {
      extraTotal = extraTotal + extra[key].price;
    }
    console.log(extraTotal);
    setExtraSubTotal(extraTotal);
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
          <div>
            <Carousel>
              <Carousel.Item style={{ height: "150px", width: "100%" }}>
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
          </div>
          <Modal.Body>
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
              {currentProduct?.dishType}{" "}
              {currentProduct.dishSpiceIndicatory === "Less Spicy" && (
                <>
                  <img style={{ width: "15px" }} src={chili} alt="less-spicy" />
                </>
              )}
              {currentProduct.dishSpiceIndicatory === "Medium Spicy" && (
                <>
                  <img style={{ width: "15px" }} src={chili} alt="less-spicy" />
                  <img style={{ width: "15px" }} src={chili} alt="less-spicy" />
                </>
              )}
              {currentProduct.dishSpiceIndicatory === "Extra Hot" && (
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
                fontSize: "0.75rem",
                fontWeight: "400",
                fontFamily: "Arial",
                color: "#767171",
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
            <div>
              <div>
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
                      {/* <FormControlLabel
                        value="2"
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
                            Paradise Veg, Pizza (Baby Corn, Olives)
                            <span style={{ fontWeight: "600" }}> + ₹ 100</span>
                          </Typography>
                        }
                        className="borderRound"
                        sx={{ marginLeft: "0px" }}
                      /> */}
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
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
                          {props.products.map((dupProduct) =>
                            dupProduct.dishType === currentProduct.dishType ? (
                              <FormControlLabel
                                value={dupProduct.productSize}
                                control={
                                  <Radio
                                    onClick={() => {
                                      handleCurrentProduct(dupProduct);
                                      if (
                                        !cart?.cartItems[dupProduct.productId]
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
                                      fontWeight: "400",
                                      fontFamily: "Arial",
                                      color: "#595959",
                                    }}
                                  >
                                    {dupProduct.productSize}
                                    <span style={{ fontWeight: "600" }}>
                                      {" "}
                                      + ₹ {dupProduct.price}
                                    </span>
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
                  </>
                ) : null}
              </div>
              <div>
                {extraIngrdients.length > 0 ? (
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
                      Extra toppings, Paneer & Cheese
                    </Typography>
                    <div>
                      <FormGroup>
                        {extraIngrdients.map((ing) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={extra[ing.subProductId] ? true : false}
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
                                }}
                              >
                                {ing.ingredientType}
                                <span style={{ fontWeight: "600" }}>
                                  {" "}
                                  + ₹ {ing.price}
                                </span>
                              </Typography>
                            }
                            sx={{
                              width: "100%",
                              marginRight: "0px",
                              marginLeft: "0px",
                            }}
                            className="borderRound"
                          />
                        ))}
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
                  <Button
                    sx={{ width: "100%" }}
                    variant="contained"
                    color="success"
                    onClick={() => {
                      let qty = cart?.cartItems[currentProduct?.productId]?.qty
                        ? 0
                        : 0;
                      dispatch(
                        addToCartNew(
                          currentProduct,
                          qty,
                          extra,
                          extraSubTotal,
                          specialText
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
                        extraSubTotal
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
                    extra,
                    extraSubTotal,
                    specialText
                  )
                );
                calculateSubTotal();
              }
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
                  dispatch(
                    addToCartNew(
                      currentProduct,
                      1,
                      extra,
                      extraSubTotal,
                      specialText
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
