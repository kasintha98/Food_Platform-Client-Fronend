import React, { useState, useEffect } from "react";
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
import { getProductsNew } from "../../actions";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import coverImg from "../../img/cover.jpg";
import { Typography } from "@mui/material";

const CartIconArea = styled.div`
  display: none;
  & span {
    left: -11px;
    top: -24px;
  }

  @media (max-width: 992px) {
    display: block;
  }
`;

const CusTabList = styled(TabList)`
  position: relative;
  z-index: 6;

  & .MuiTabs-flexContainer {
    column-gap: 10px;
    justify-content: center;
  }
  & .Mui-selected {
    background-color: #ffc107 !important;
    color: #e71b23;
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

const HeadMod = styled.div`
  & .close {
    color: red;
  }
`;

export default function NewMenu() {
  const sections = ["FAST FOOD", "PIZZA"];
  const dishes = [
    { "FAST FOOD": ["Burger", "Fries"] },
    { PIZZA: ["Simply Veg"] },
  ];

  const cart = useSelector((state) => state.cart);
  const [dishesOfSection, setDishesOfSection] = useState(["Burger", "Fries"]);
  const [value, setValue] = useState(sections[0]);
  const [subTotal, setSubtotal] = useState(0);
  const [value2, setValue2] = useState(dishesOfSection[0]);

  const [showCartModal, setShowCartModal] = useState(false);

  const productList = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsNew());
  }, []);

  const handleSubTotal = (total) => {
    setSubtotal(total);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
  };

  const getDishesOfSection = (section) => {
    for (let i = 0; i < dishes.length; i++) {
      if (section === Object.keys(dishes[i])[0]) {
        setDishesOfSection(Object.values(dishes[i])[0]);
        setValue2(Object.values(dishes[i])[0][0]);
      }
    }
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
                <CartCard></CartCard>
                <CartCard></CartCard>
                <CartCard></CartCard>
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
            <Row>
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
            </Row>
            <div>
              <Box sx={{ width: "100%" }}>
                <TabContext value={value}>
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
                    <TabList
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
                    </TabList>
                  </Box>
                  {sections.map((section) => (
                    <TabPanel sx={{ padding: "0px" }} value={section}>
                      <Box sx={{ width: "100%" }}>
                        <TabContext value={value2}>
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
                                <CusTab label={dish} value={dish} />
                              ))}
                            </CusTabList>
                            <hr
                              style={{
                                zIndex: 1,
                                position: "relative",
                                marginTop: "-25px",
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
                                {productList?.products.length > 0 ? (
                                  <>
                                    {productList?.products.map((product) =>
                                      product.menu_available_flag === "Y" &&
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
                                              {product.size === "Regular" ||
                                              product.size === "Small" ? (
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
                                  <h4>No Products Available</h4>
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
            <Row>
              <img style={{ marginTop: "48px" }} src={coverImg} alt="banner" />
            </Row>
            <Card sx={{ width: "100%", marginTop: "15px" }}>
              <div
                style={{ height: "5px", backgroundColor: "rgb(130, 187, 55)" }}
              ></div>
              <CardContent
                sx={{
                  height: "300px",
                  overflowY: "auto",
                  backgroundColor: "#F7F7F7",
                }}
              >
                <CartCard onChangeSubTotal={handleSubTotal}></CartCard>
              </CardContent>
              <div
                style={{
                  backgroundColor: "rgb(239, 245, 251)",
                  boxShadow: "0px -4px 3px rgba(50, 50, 50, 0.3)",
                }}
              >
                <SubTotalArea>
                  <SubTotal>Subtotal</SubTotal>
                  <SubTotal>₹ {subTotal}</SubTotal>
                </SubTotalArea>
                <CardActions>
                  <CheckoutButton variant="contained" className="w-100">
                    Checkout
                  </CheckoutButton>
                </CardActions>
              </div>
            </Card>
          </CusCol>
        </Row>
      </CusContainer>
      <Footer></Footer>
      {renderCartModal()}
    </div>
  );
}
