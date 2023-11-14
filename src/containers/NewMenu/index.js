import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import "./style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Row, Col, Container, Modal } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { Tab, IconButton } from "@mui/material";
// import Box from "@mui/material/Box";
import CartCard from "../../components/CartCard";
import ProductCard from "../../components/ProductCard";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsNew,
  getAllSections,
  getDishesBySection,
  getAllStores2,
  getProductById,
  addToCartNew,
  getMenuIngredientsByProductId,
} from "../../actions";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import coverImg from "../../img/cover.jpg";
import tempImg from "../../img/2m.jpg";
import { BottomNav } from "../../components/BottomNav";
import { NewCart } from "../NewCart";
import { DeliveryTypeModal } from "../../components/DeliveryTypeModal";
import ReactGA from "react-ga4";

import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormGroup,
  Checkbox,
  TextField,
  Typography
} from "@mui/material";

import pizzaPic from "../../img/pizzaPic.jpg";
import thinImg from "../../img/thin.svg";
import panImg from "../../img/pan.svg";
import cheeseImg from "../../img/cheese.svg";
import ButtonGroup from "@mui/material/ButtonGroup";
import Delete from "@mui/icons-material/Delete";
import { Add, Remove } from "@mui/icons-material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { imagePathHome } from "../../urlConfig";

const CartIconArea = styled.div`
  display: none;
  & span {
    left: -11px;
    top: -24px;
  }

  @media (max-width: 992px) {
    display: none;
  }
`;

const CusTabList = styled(TabList)`
  position: relative;
  z-index: 6;
 

  & .MuiTabs-flexContainer {
    column-gap: 10px;
    /* justify-content: center; */
    overflow-x: auto;
  }
  }
  & .Mui-selected {
    background-color: #ffc107 !important;
    color: #e71b23;
  }

  /* & .MuiButtonBase-root {
    margin-bottom: 6px;
  } */
  
`;

const CusTabList2 = styled(TabList)`
  & .MuiTabs-flexContainer {
    overflow-x: auto !important;
  }
`;

const CusTab = styled(Tab)`
  font-size: 0.75rem;
  font-weight: 600;
  font-family: Arial;
  color: #595959;
  background-color: #fff;
  border-radius: 25px;
`;

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

const CusBox1 = styled(Box)`
  margin-top: 41px;

  @media (max-width: 992px) {
    margin-top: -6px;
  }
`;

const CusContainer = styled(Container)`
  margin-top: 65px;
  min-height: calc(100vh - 180px);

  @media (max-width: 992px) {
    margin-top: 80px;
  }
`;

const CusCol = styled(Col)`
  @media (max-width: 992px) {
    display: none;
  }
`;

const CustRow = styled(Row)`
  @media (max-width: 992px) {
    margin-top: 35px;
  }
`;

const HeadMod = styled.div`
  & .close {
    color: red;
  }
`;

export default function NewMenu() {
  /* const sections = [
    "Fast Food",
    "Pizza",
    "Sandwiches",
    "Pasta",
    "Wraps",
    "Sides",
    "Mania Range",
    "Desserts",
    "Shakes & Drinks",
    "Chinese",
  ]; */
  /* const dishes = [
    { "Fast Food": ["Burger", "Fries"] },
    {
      Pizza: [
        "Simply Veg",
        "Simply Veg 1",
        "Taste of India",
        "Simply Veg 2",
        "Simply Veg 3",
        "Combo",
      ],
    },
    { Sandwiches: ["Sandwiches"] },
    { Pasta: ["Pasta"] },
    { Wraps: ["Wraps"] },
    { Sides: ["Sides"] },
    { "Mania Range": ["Mania Range"] },
    { Desserts: ["Desserts"] },
    { "Shakes & Drinks": ["Shake"] },
    {
      Chinese: [
        "Vegetable",
        "Paneer",
        "Mushroom",
        "Chaap",
        "Combo Meal",
        "Noodles",
        "Rice",
        "Soup",
        "Main Course",
        "Momo's",
      ],
    },
  ]; */
  const sections = useSelector((state) => state.product.sections);
  const dishesOfSection = useSelector((state) => state.product.dishesOfSection);

  const cart = useSelector((state) => state.cart);
  //const [dishesOfSection, setDishesOfSection] = useState(["Burger", "Fries"]);
  const [value, setValue] = useState(sections[0]);
  const [subTotal, setSubtotal] = useState(0);
  const [extraSubTotal, setExtraSubTotal] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [choiceTotal, setChoiceTotal] = useState(0);
  const [value2, setValue2] = useState(dishesOfSection[0]);
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });
  const defDel = useSelector((state) => state.auth.deliveryType);

  const [showCartModal, setShowCartModal] = useState(false);
  const [showDeliveryTypeModal, setShowDeliveryTypeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const productList = useSelector((state) => state.product);
  // console.log("aaa productList", productList);
  console.log("aaa isLoading", isLoading);

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [productObj, setProductObj] = useState(null);
  const productDetails = useSelector((state) => state.product.productById);

  const [toppings, setToppings] = React.useState({});
  const [toppingSubTotal, setToppingSubTotal] = React.useState(0);
  const [specialText, setSpecialText] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [dishSize, setDishSize] = React.useState(""); ///CHECK IT
  const [choice, setChoice] = React.useState("");
  const [choiceObj, setChoiceObj] = React.useState({});
  const [choiseIngrdients, setChoiseIngrdients] = React.useState([]);
  const [toppingIngrdients, setToppingIngrdients] = React.useState([]);
  const [qty, setQty] = React.useState(1);
  const [toppingCustomization, setToppingCustomization] = React.useState({});
  // const [currentProduct, setCurrentProduct] = React.useState(productObj); productList.products
  const [currentProduct, setCurrentProduct] = React.useState(productList.products[0]);
  let ingredients = useSelector((state) => state.product.ingredients);

  const prevProduct = useRef();




  const[prdFlag, setPrdFlag] = useState(window.isPrd); 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if(window.restId === "R001"){
      ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "Menu Screen" });
    }else if (window.restId == "R002"){
      ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "Menu Screen Hungry Point" });
    }

    const delLoc = localStorage.getItem("deliveryType");
    if (delLoc && defDel) {
      // dispatch(getAllStores());
      console.log("THis is loop 1");
      dispatch(getAllStores2(window.restId));
      dispatch(getProductsNew());
      dispatch(getAllSections()).then((res) => {
        if (res) {
          setValue(res[0]);
          dispatch(getDishesBySection(res[0]));
        }
      });
      setIsLoading(false);
    } else {
      setShowDeliveryTypeModal(true);
      setIsLoading(false);
    }

    if(window.isPrd){
      console.log("THis is loop 2");
      console.log("window.restaurantId, window.storeId, window.productId", window.restaurantId, window.storeId, window.productId);
      togglePopup();
      dispatch(getAllStores2(window.restId));
      dispatch(getProductsNew());
      
      dispatch(getProductById(window.restaurantId, window.storeId, window.productId)).then((resp) => {
        setProductObj(resp);
        setCurrentProduct(resp);
      });

      // callProductApi();
      
      dispatch(getAllSections()).then((res) => {
        if (res) {
          setValue(res[0]);
          dispatch(getDishesBySection(res[0]));
        }
      });
      setIsLoading(false);
    }
  }, []);

  const callProductApi = (PrdId) => {
    console.log("PrdId...",PrdId);

    if(PrdId){
      dispatch(getProductById(window.restId, 'ALL', PrdId)).then((resp) => {
        console.log("RESSSSSSSSSPONSE...",productObj);
        if(resp){
        console.log("R222222222222222...",resp);
        setProductObj(resp);
        setCurrentProduct(resp);
        setPrdFlag("yes");
        }
      });
    }else{
       dispatch(getProductById(window.restaurantId, 'ALL', window.productId)).then((resp) => {
        console.log("RESSSSSSSSSPONSE...",productObj);
        if(resp){
        console.log("R222222222222222...",resp);
        setProductObj(resp);
        setCurrentProduct(resp);
        setPrdFlag("yes");
        }
      });
    }
  };

  // useEffect(() => {
  //   if(window.isPrd){
  //     dispatch(getProductById(window.restaurantId, window.storeId, window.productId)).then((resp) => {
  //       setProductObj(resp);
  //     });
  //   } 
  // },[productObj]);


  const handleSubTotal = (total) => {
    setSubtotal(total);
  };

  const callDetailScreen = (productId) => {
    console.log("Here in Parent",productId);
    callProductApi(productId);
    // setPrdFlag("yes");
    console.log("Mehtod from Child is called");
  }

  const calculateSubTotal = () => {
    let total = 0;
    for (let key of Object.keys(cart?.cartItems)) {
      total = total + cart?.cartItems[key].qty * cart?.cartItems[key].price;
    }

    handleSubTotal(total);
  };

  const handleOpen = () => {
    console.log("HANDLE OPEN CALLED")
    setOpen(true);
    dispatch(getMenuIngredientsByProductId(productObj.productId));
    //extra topings api comes here(replace ingredients with toppings)
  };

  function addToCartFromDetails () {
    console.log("ADD TO CART CALLED.", productObj.ingredientExistFlag, productObj);

    if (productObj.ingredientExistFlag === "Y") {
      console.log("TOPPINGS.........");
      if (!cart?.cartItems[productObj.productId]) {
        calculateSubTotal();
      }
      handleOpen();
    } else {
      dispatch(
        addToCartNew(
          productObj,
          1,
          toppings,
          toppingSubTotal,
          specialText,
          choiceObj,
          true
        )
      );
      calculateSubTotal();
    }

    // dispatch(
    //   addToCartNew(
    //     currentProduct,
    //     1,
    //     toppings,
    //     toppingSubTotal,
    //     specialText,
    //     choiceObj,
    //     true
    //   )
    // ).then((res) => {
    //   if (res) {
    //     setChoice("");
    //     setChoiceObj({});
    //     setToppingSubTotal(0);
    //     setToppings({});
    //     setQty(1);
    //   }
    // });
    // calculateSubTotal();
    // setSpecialText("");
    // handleClose();
  }

  const handleExtraTotal = (total) => {
    setExtraSubTotal(total);
  };

  const handleChoiceTotal = (total) => {
    setChoiceTotal(total);
  };

  const handleNavTab = (val) => {
    console.log(val);
    setTabValue(val);
  };

  const handleChange = (event, newValue) => {
    setPrdFlag("no");
    setValue(newValue);
  };

  const handleChange2 = (event, newValue) => {
    setPrdFlag("no");
    setValue2(newValue);
    console.log("newValue");
    console.log(newValue);
  };

  const getDishesOfSection = (section) => {
    dispatch(getDishesBySection(section)).then((res) => {
      if (res) {
        console.log("dishesOfSection");
        console.log(res);
        setValue2(res[0]);
      }
    });
  };

  const handleCartModalClose = () => setShowCartModal(false);
  const handleCartModalShow = () => setShowCartModal(true);

  const renderCartModal = () => {
    return (
      <>
        <Modal size="lg" show={showCartModal} onHide={handleCartModalClose}>
          <HeadMod>
            <Modal.Header closeButton>
              <Modal.Title>My Cart</Modal.Title>
            </Modal.Header>
          </HeadMod>

          <Modal.Body style={{ padding: "0px" }}>
            <Card sx={{ width: "100%" }}>
              <CardContent sx={{ height: "500px", overflowY: "auto" }}>
                <CartCard
                  onChangeSubTotal={handleSubTotal}
                  onChangeExtraSubTotal={handleExtraTotal}
                ></CartCard>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="success" className="w-100">
                  Checkout
                </Button>
              </CardActions>
            </Card>
          </Modal.Body>
        </Modal>
      </>
    );
  };

  //======= Topping Model added ==========
  const CusModal = styled(Modal)`
  & .modal-dialog {
    max-width: 600px;
  }

  @media (max-width: 600px) {
    & .modal-dialog {
      max-width: 100%;
    }
  }
`;

const CusBox = styled(Box)`
  max-height: 800px;
  overflow-y: auto;

  @media (max-width: 992px) {
    max-height: 90vh;
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

useEffect(() => {
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
  // currentProduct.dishType,
  // currentProduct.productId,
  ingredients,
]);


const handleClose = () => setOpen(false);
const handleCurrentProduct = (curProduct) => {
  setCurrentProduct(curProduct);

  const cartProd = cart?.cartItems[curProduct.productId];

  console.log("cartprod");
  console.log(cartProd);

  if (cartProd) {
    setChoice("");
    setChoiceObj({});
    setToppingSubTotal(0);
    setToppings({});
    setQty(1);
  } else {
    setChoice("");
    setChoiceObj({});
    setToppingSubTotal(0);
    setToppings({});
    setQty(1);
  }
};

const handleChoice = (event) => {
  setChoice(event.target.value);
};

const handleCustomization = (event) => {
  setToppingCustomization({
    ...toppingCustomization,
    [event.target.name]: event.target.checked,
  });
  console.log(toppingCustomization);
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

const handleDishSize = (event) => {
  setDishSize(event.target.value);
};

const handleSpecialText = (event) => {
  setSpecialText(event.target.value);
};

const onQuantityDecrement = (productId) => {
  if (qty !== 0) {
    let newQty = qty - 1;
    setQty(newQty);
  }

  calculateSubTotal();
};

const onQuantityIncrement = (productId) => {
  let newQty = qty + 1;
  setQty(newQty);
  calculateSubTotal();
};

const showCustPrice = () => {
  const choicePrice = choiceObj && choiceObj.price ? choiceObj.price : 0;
  const toppingAllPrice = toppingSubTotal ? toppingSubTotal : 0;
  const prodTotal =
  currentProduct && currentProduct.price ? qty * currentProduct.price : 0;

  const total = prodTotal + choicePrice * qty + toppingAllPrice * qty;
  return <span>{total}</span>;
};

  const renderCustomizeModal = () => {
    return (
      <CusModal
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
        <CusBox>
          <Modal.Body
            style={{
              backgroundColor: "#f7f7f7",
              paddingTop: 0,
              paddingLeft: 0,
              paddingBottom: 0,
            }}
          >
            <Row className="p-0 m-0">
              <Col className="col-3 p-0 cus-side-back"></Col>
              <Col className="col-9 ps-1 pe-0 pt-0 pb-0 m-0">
                <div>
                  <div>
                    {productObj.productSize !== "Regular" ? (
                      <>
                        <div>
                          <div
                            className="text-center"
                            style={{
                              backgroundColor: "#FFC000",
                              color: "#fff",
                            }}
                          >
                            <Typography sx={{ fontWeight: "bold" }}>
                              Size
                            </Typography>
                          </div>
                          <FormControl
                            sx={{
                              width: "100%",
                              marginTop: "-22px",
                            }}
                          >
                            <RadioGroup
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="controlled-radio-buttons-group"
                              value={dishSize}
                              onChange={handleDishSize}
                              defaultValue={currentProduct.productId}
                            >
                              <Row className="align-items-center">
                                {productList.products.map((dupProduct) =>
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
                                              }
                                              dispatch(
                                                getMenuIngredientsByProductId(
                                                  dupProduct.productId
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
                                            }}
                                          >
                                            <CustRow className="justify-content-center align-items-end">
                                              {dupProduct.productSize ===
                                              "Small" ? (
                                                <img
                                                  style={{ width: "80%" }}
                                                  src={pizzaPic}
                                                  alt="pizza"
                                                ></img>
                                              ) : dupProduct.productSize ===
                                                "Medium" ? (
                                                <img
                                                  style={{ width: "90%" }}
                                                  src={pizzaPic}
                                                  alt="pizza"
                                                ></img>
                                              ) : dupProduct.productSize ===
                                                "Large" ? (
                                                <img
                                                  style={{ width: "100%" }}
                                                  src={pizzaPic}
                                                  alt="pizza"
                                                ></img>
                                              ) : (
                                                <img
                                                  style={{ width: "50%" }}
                                                  src={pizzaPic}
                                                  alt="pizza"
                                                ></img>
                                              )}
                                            </CustRow>
                                            <Row
                                              className="justify-content-center"
                                              style={{ marginTop: "3px" }}
                                            >
                                              {dupProduct.productSize}
                                              <br></br>
                                              <div style={{ marginTop: "5px" }}>
                                                {currentProduct.productId ===
                                                dupProduct.productId ? (
                                                  <span
                                                    style={{
                                                      fontWeight: "600",
                                                      backgroundColor:
                                                        "#548235",
                                                      color: "#fff",
                                                      padding: "6px",
                                                      borderRadius: "5px",
                                                      width: "100%",
                                                      display: "block",
                                                    }}
                                                  >
                                                    +=== ₹ {dupProduct.price}
                                                  </span>
                                                ) : (
                                                  <span
                                                    style={{
                                                      fontWeight: "600",
                                                      backgroundColor:
                                                        "#696969",
                                                      color: "#fff",
                                                      padding: "6px",
                                                      borderRadius: "5px",
                                                      width: "100%",
                                                      display: "block",
                                                    }}
                                                  >
                                                    +--- ₹ {dupProduct.price}
                                                  </span>
                                                )}
                                              </div>
                                            </Row>
                                            <br></br>
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
                        <div>
                          <div
                            className="text-center"
                            style={{
                              backgroundColor: "#FFC000",
                              color: "#fff",
                            }}
                          >
                            <Typography sx={{ fontWeight: "bold" }}>
                              Choice of Base
                            </Typography>
                          </div>
                          <FormControl
                            sx={{
                              width: "100%",
                              marginTop: "-20px",
                            }}
                          >
                            <RadioGroup
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="controlled-radio-buttons-group"
                              value={choice}
                              onChange={handleChoice}
                            >
                              <Row className="align-items-center">
                                {choiseIngrdients?.map((choiceIng) => (
                                  <Col className="col-4">
                                    <FormControlLabel
                                      value={choiceIng.ingredientType}
                                      control={
                                        <Radio
                                          onClick={() => {
                                            /* dispatch(
                                              addToCartNew(
                                                productObj,
                                                0,
                                                toppings,
                                                toppingSubTotal,
                                                specialText,
                                                choiceIng
                                              )
                                            ); */
                                            setChoiceObj(choiceIng);
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
                                          <Row className="justify-content-center align-items-end">
                                            {choiceIng.ingredientType ===
                                            "Thincrust" ? (
                                              <img
                                                style={{ width: "95%" }}
                                                src={thinImg}
                                                alt="thin"
                                              ></img>
                                            ) : choiceIng.ingredientType ===
                                              "Cheese Burst" ? (
                                              <img
                                                style={{ width: "95%" }}
                                                src={cheeseImg}
                                                alt="cheese"
                                              ></img>
                                            ) : choiceIng.ingredientType ===
                                              "Pan" ? (
                                              <img
                                                style={{ width: "95%" }}
                                                src={panImg}
                                                alt="pan"
                                              ></img>
                                            ) : (
                                              <img
                                                style={{ width: "95%" }}
                                                src={panImg}
                                                alt="pan"
                                              ></img>
                                            )}
                                          </Row>

                                          <Row className="justify-content-center ">
                                            {choiceIng.ingredientType}
                                            <br></br>
                                            <div style={{ marginTop: "5px" }}>
                                              {choice ===
                                              choiceIng.ingredientType ? (
                                                <span
                                                  style={{
                                                    fontWeight: "600",
                                                    backgroundColor: "#548235",
                                                    color: "#fff",
                                                    padding: "6px",
                                                    borderRadius: "5px",
                                                    width: "100%",
                                                    display: "block",
                                                  }}
                                                >
                                                  + ₹ {choiceIng.price}
                                                </span>
                                              ) : (
                                                <span
                                                  style={{
                                                    fontWeight: "600",
                                                    backgroundColor: "#696969",
                                                    color: "#fff",
                                                    padding: "6px",
                                                    borderRadius: "5px",
                                                    width: "100%",
                                                    display: "block",
                                                  }}
                                                >
                                                  + ₹ {choiceIng.price}
                                                </span>
                                              )}
                                            </div>
                                          </Row>
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
                  <div style={{ marginTop: "0px" }}>
                    {toppingIngrdients.length > 0 ? (
                      <>
                        <div>
                          <div
                            className="text-center"
                            style={{
                              backgroundColor: "#FFC000",
                              color: "#fff",
                            }}
                          >
                            <Typography sx={{ fontWeight: "bold" }}>
                              Toppings
                            </Typography>
                          </div>
                          <FormGroup>
                            <Row
                              className="align-items-center"
                              style={{ width: "103%" }}
                            >
                              {toppingIngrdients.map((ing) => (
                                <Col className="col-6 pr-0">
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={
                                          toppings[ing.subProductId]
                                            ? true
                                            : false
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
                                        <Row className="align-items-center">
                                          <Col className="col-6">
                                            {ing.ingredientType}
                                          </Col>
                                          <Col className="col-6 ">
                                            <Row className="m-0 p-0 justify-content-end">
                                              {toppings[ing.subProductId] ? (
                                                <span
                                                  style={{
                                                    fontWeight: "600",
                                                    backgroundColor: "#548235",
                                                    color: "#fff",
                                                    padding: "6px",
                                                    textAlign: "center",
                                                  }}
                                                >
                                                  + ₹ {ing.price}
                                                </span>
                                              ) : (
                                                <span
                                                  style={{
                                                    fontWeight: "600",
                                                    backgroundColor: "#696969",
                                                    color: "#fff",
                                                    padding: "6px",
                                                    textAlign: "center",
                                                  }}
                                                >
                                                  {" "}
                                                  + ₹ {ing.price}{" "}
                                                </span>
                                              )}
                                            </Row>
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
                    <Row>
                      <Col className="col-12">
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
                              Special Instructions
                            </Typography>
                          }
                          multiline
                          rows={1}
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
                      </Col>
                    </Row>
                  </div>
                </div>
                <div>
                  <br></br>
                  <Row className="align-items-center pb-2">
                    <Col className="col-4">
                      <ButtonGroup
                        variant="contained"
                        aria-label="outlined primary button group"
                      >
                        <IncButton
                          sx={{ border: "none !important" }}
                          onClick={() => {
                            onQuantityDecrement(productObj?.productId);
                          }}
                        >
                          {qty < 2 ? (
                            <Delete sx={{ fontSize: "0.9rem" }}></Delete>
                          ) : (
                            <Remove sx={{ fontSize: "0.9rem" }}></Remove>
                          )}
                        </IncButton>
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
                            {qty}
                          </Typography>{" "}
                        </IncButton>

                        <IncButton
                          onClick={() => {
                            onQuantityIncrement(productObj?.productId);
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
                          /* let qty = cart?.cartItems[productObj?.productId]
                            ?.qty
                            ? 0
                            : 1; */
                          dispatch(
                            addToCartNew(
                              currentProduct,
                              qty,
                              toppings,
                              toppingSubTotal,
                              specialText,
                              choiceObj,
                              true
                            )
                          ).then((res) => {
                            if (res) {
                              setChoice("");
                              setChoiceObj({});
                              setToppingSubTotal(0);
                              setToppings({});
                              //new qty = 1
                              setQty(1);
                            }
                          });
                          calculateSubTotal();
                          setSpecialText("");
                          handleClose();
                        }}
                      >
                        Add to my order ₹ {showCustPrice()}
                        .00
                      </CheckoutButton>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Modal.Body>
        </CusBox>
      </CusModal>
    );
  };

  return (
    <div style={{ backgroundColor: "#f7f7f7" }}>
      <Header></Header>
      <CusContainer>
        <Row>
          <Col sm={12} md={12} lg={8} xl={8}>
            <CustRow>
              <Col className="col-9"></Col>
              <Col className="col-3">
                <CartIconArea>
                  <Button sx={{ color: "black" }} onClick={handleCartModalShow}>
                    {Object.keys(cart.cartItems) ? (
                      <div style={{ position: "relative" }}>
                        <span
                          style={{
                            position: "absolute",
                            background: "red",
                            width: "15px",
                            height: "15px",
                            borderRadius: "5px",
                            fontSize: "1rem",
                            textAlign: "center",
                            alignSelf: "center",
                            color: "#fff",
                            left: "-11px",
                            top: "-25px",
                          }}
                        >
                          {Object.keys(cart.cartItems).length}
                        </span>
                      </div>
                    ) : null}

                    <i
                      style={{ fontSize: "25px" }}
                      className="fa fa-cart-plus"
                    ></i>
                  </Button>
                </CartIconArea>
              </Col>
            </CustRow>
            <div>
              <Box sx={{ width: "100%" }}>
                <TabContext value={value ? value : sections[0]}>
                  <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    position: "absolute",
                    top: "52px",
                    left: "0px",
                    width: "100%",
                    backgroundColor: "#ffc423",
                  }}
                >
                  <CusTabList2
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    {sections.map((section) => (
                      <Tab
                        onClick={() => {
                          getDishesOfSection(section);
                        }}
                        label={section}
                        value={section}
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          fontFamily: "Arial",
                          color: "#e71b23",
                        }}
                      />
                    ))}
                  </CusTabList2>
                </Box>
                  {/* {isOpen && <Popup
                    content={<>
                      <b>Design your Popup</b>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                      <button>Test button</button>
                    </>}
                    handleClose={togglePopup}
                  />} */}

                  {sections.map((section) => (
                    <TabPanel sx={{ padding: "0px" }} value={section}>
                      <Box sx={{ width: "100%" }}>
                        <TabContext
                          value={value2 ? value2 : dishesOfSection[0]}
                        >
                          <CusBox1
                            sx={{
                              backgroundColor: "transparent",
                            }}
                          >
                            <CusTabList
                              onChange={handleChange2}
                              aria-label="lab API tabs example"
                              TabIndicatorProps={{
                                style: { background: "transparent" },
                              }}
                            >
                              {dishesOfSection.map((dish) => (
                                <CusTab
                                  style={{ marginBottom: "6px" }}
                                  label={dish}
                                  value={dish}
                                />
                              ))}
                            </CusTabList>
                            <hr
                              style={{
                                zIndex: 1,
                                position: "relative",
                                marginTop: "-31px",
                              }}
                            ></hr>
                          </CusBox1>
                          {dishesOfSection.map((dish) => (
                            <TabPanel
                              sx={{
                                backgroundColor: "#f7f7f7",
                                marginTop: "-45px",
                              }}
                              value={dish}
                            >
                  
                              <Row>
                                {isLoading ? (
                                  <h4
                                    style={{
                                      marginTop: "50px",
                                      textAlign: "center",
                                    }}
                                  >
                                    <CircularProgress />
                                  </h4>
                                ) : (
                                  <>
                                  {prdFlag == "yes" ? (
                                    <> {productObj ? (
                                  <div style={{height:'350px', marginTop:'10%', backgroundColor:'white', maxWidth: '100%', borderWidth:"1px",borderColor:"GrayText"}}>
                                          <Row>
                                            <Col className="" style={{minHeight:'350px',display: 'flex',justifyContent:'center',alignItems:'center', maxWidth: '40%', backgroundColor: '' }}>
                                              <div>
                                              {!isMobile ?
                                              <img style={{height:"350px",width:"250px",position:'relative'}}src={imagePathHome+"/"+window.restId+"/"+productObj.imagePath+".jpg"}></img> :
                                              <img style={{height:"200px",width:"100px",position:'relative'}}src={imagePathHome+"/"+window.restId+"/"+productObj.imagePath+".jpg"}></img>}
                                              </div>
                                            </Col>
                                            <Col className="" style={{minHeight:'100%', maxWidth: '60%', backgroundColor: '' }}>
                                              <div>
                                                <div style={{display: 'flex',justifyContent: 'right',alignItems: 'center',backgroundColor:"",marginTop:"1px"}}>
                                                <IconButton sx={{ marginTop:"5px",marginLeft:"20px",marginRight:"1px",height:"20px", width:"20px"}} onClick={()=>{setPrdFlag("no")}}><CloseRoundedIcon/></IconButton>
                                                </div>
                                                <Row style={{display: 'flex',justifyContent: 'center',alignItems: 'center',backgroundColor:"",marginTop:"2%"}}>
                                                <label className="detailsHeaderStyle" >{productObj.dishType}</label>
                                                </Row>
                                                <div style={{width:"100%", height:"2px", backgroundColor:"GrayText"}}></div>
                                                <Row style={{marginTop:"2%"}}>
                                                <label className="priceLabelStyle">Price: {productObj.price}</label>
                                                </Row>
                                                <Row style={{marginTop:"2%"}}>
                                                <label className="descLabelStyle" style={{height:"190px"}}>{productObj.dishLongDescription}</label>
                                                </Row>
                                                <Row style={{marginBottom:"20px",display: 'flex',justifyContent: 'center',marginTop:"2%"}}>
                                                  {isMobile ? <button className="detilsMobAddCartBtn" onClick={addToCartFromDetails}>ADD TO CART</button>:
                                                  <button className="detilsAddCartBtn" onClick={addToCartFromDetails}>ADD TO CART</button>}
                                                
                                                </Row>
                                              </div>
                                            </Col>
                                          </Row>
                                  </div> 
                                  ):<div>THis is second condition</div>}
                                  </>
                                  ):(
                                  <>
                                    {productList.products?.length > 0 ? (
                                      <>
                                        {productList.products?.map((product) =>
                                          product &&
                                          product.menuAvailableFlag === "Y" &&
                                          product.onlineApplicableFlag !==
                                            "N" &&
                                          product.section === section &&
                                          product.dish === dish ? (
                                            <>
                                              {product.dish === "Fries" ? (
                                                <Col
                                                  xs={6}
                                                  sm={6}
                                                  md={6}
                                                  lg={4}
                                                >
                                                  <ProductCard
                                                    product={product}
                                                    products={
                                                      productList.products
                                                    }
                                                    onChangeSubTotal={
                                                      handleSubTotal
                                                    }
                                                    showDetailScreen={callDetailScreen}
                                                  ></ProductCard>
                                                </Col>
                                              ) : (
                                                <>
                                                  {product.productSize ===
                                                    "Regular" ||
                                                  product.productSize ===
                                                    "Small" ? (
                                                    <Col
                                                      xs={6}
                                                      sm={6}
                                                      md={6}
                                                      lg={4}
                                                    >
                                                      <ProductCard
                                                        product={product}
                                                        products={
                                                          productList.products
                                                        }
                                                        onChangeSubTotal={
                                                          handleSubTotal
                                                        }
                                                        showDetailScreen={callDetailScreen}
                                                        // showDetailScreen={()=>{console.log("+++++++++++++++++++=")}}
                                                      ></ProductCard>
                                                    </Col>
                                                  ) : null}
                                                </>
                                              )}
                                            </>
                                          ) : null
                                        )}
                                      </>
                                    ) : (
                                      <h4 style={{ marginTop: "50px" }}>
                                        No Products Available
                                      </h4>
                                    )}
                                  </>
                                )}
                                </>
                                )}
                              </Row>




                              {/* <Row>
                                {isLoading ? (
                                  <h4
                                    style={{
                                      marginTop: "50px",
                                      textAlign: "center",
                                    }}
                                  >
                                    <CircularProgress />
                                  </h4>
                                ) : (
                                  <>
                                    {productList.products?.length > 0 ? (
                                      <>
                                        {productList.products?.map((product) =>
                                          product &&
                                          product.menuAvailableFlag === "Y" &&
                                          product.onlineApplicableFlag !==
                                            "N" &&
                                          product.section === section &&
                                          product.dish === dish ? (
                                            <>
                                              {product.dish === "Fries" ? (
                                                <Col
                                                  xs={6}
                                                  sm={6}
                                                  md={6}
                                                  lg={4}
                                                >
                                                  <ProductCard
                                                    product={product}
                                                    products={
                                                      productList.products
                                                    }
                                                    onChangeSubTotal={
                                                      handleSubTotal
                                                    }
                                                  ></ProductCard>
                                                </Col>
                                              ) : (
                                                <>
                                                  {product.productSize ===
                                                    "Regular" ||
                                                  product.productSize ===
                                                    "Small" ? (
                                                    <Col
                                                      xs={6}
                                                      sm={6}
                                                      md={6}
                                                      lg={4}
                                                    >
                                                      <ProductCard
                                                        product={product}
                                                        products={
                                                          productList.products
                                                        }
                                                        onChangeSubTotal={
                                                          handleSubTotal
                                                        }
                                                      ></ProductCard>
                                                    </Col>
                                                  ) : null}
                                                </>
                                              )}
                                            </>
                                          ) : null
                                        )}
                                      </>
                                    ) : (
                                      <h4 style={{ marginTop: "50px" }}>
                                        No Products Available
                                      </h4>
                                    )}
                                  </>
                                )}
                              </Row> */}
                            </TabPanel>
                          ))}
                        </TabContext>
                      </Box>
                    </TabPanel>
                  ))}
                </TabContext>
              </Box>
            </div>
          </Col>
          <CusCol sm={12} md={12} lg={4} xl={4}>
            <NewCart></NewCart>
          </CusCol>
        </Row>
      </CusContainer>

      <Footer></Footer>
      {renderCartModal()}
      {productObj ? (renderCustomizeModal()):null}
      {isMobile ? <BottomNav onChangeTab={handleNavTab}></BottomNav> : null}
      {showDeliveryTypeModal ? <DeliveryTypeModal></DeliveryTypeModal> : null}
    </div>
  );
}
