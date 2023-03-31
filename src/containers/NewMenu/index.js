import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import "./style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Row, Col, Container, Modal } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CartCard from "../../components/CartCard";
import ProductCard from "../../components/ProductCard";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsNew,
  getAllSections,
  getDishesBySection,
  getAllStores,
} from "../../actions";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import coverImg from "../../img/cover.jpg";
import { Typography } from "@mui/material";
import { BottomNav } from "../../components/BottomNav";
import { NewCart } from "../NewCart";
import { DeliveryTypeModal } from "../../components/DeliveryTypeModal";

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

  const productList = useSelector((state) => state.product);
  console.log("aaa productList", productList);

  const dispatch = useDispatch();

  useEffect(() => {
    const delLoc = localStorage.getItem("deliveryType");
    if (delLoc && defDel) {
      dispatch(getAllStores());
      dispatch(getProductsNew());
      dispatch(getAllSections()).then((res) => {
        if (res) {
          setValue(res[0]);
          dispatch(getDishesBySection(res[0]));
        }
      });
    } else {
      setShowDeliveryTypeModal(true);
    }
  }, []);

  const handleSubTotal = (total) => {
    setSubtotal(total);
  };

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
    setValue(newValue);
  };

  const handleChange2 = (event, newValue) => {
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
                                {productList.products?.length > 0 ? (
                                  <>
                                    {productList.products?.map((product) =>
                                      product &&
                                      product.menuAvailableFlag === "Y" &&
                                      product.onlineApplicableFlag !== "N" &&
                                      product.section === section &&
                                      product.dish === dish ? (
                                        <>
                                          {product.dish === "Fries" ? (
                                            <Col xs={6} sm={6} md={6} lg={4}>
                                              <ProductCard
                                                product={product}
                                                products={productList.products}
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
                              </Row>
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
            {/* <Row>
              <img style={{ marginTop: "48px" }} src={coverImg} alt="banner" />
            </Row> */}
            <NewCart></NewCart>
          </CusCol>
        </Row>
      </CusContainer>

      <Footer></Footer>
      {renderCartModal()}
      {isMobile ? <BottomNav onChangeTab={handleNavTab}></BottomNav> : null}
      {showDeliveryTypeModal ? <DeliveryTypeModal></DeliveryTypeModal> : null}
    </div>
  );
}
