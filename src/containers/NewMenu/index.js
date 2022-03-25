import React, { useState, useEffect } from "react";
import "./style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Row, Col, Container, Modal } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CartCard from "../../components/CartCard";
import ProductCard from "../../components/ProductCard";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { getProductsNew } from "../../actions";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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
  const [value, setValue] = useState(0);
  const [showCartModal, setShowCartModal] = useState(false);

  const cart = useSelector((state) => state.cart);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsNew());
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
    <div>
      <Header></Header>
      <CusContainer>
        <Row>
          <Col sm={12} md={12} lg={8} xl={8}>
            <Row>
              <Col className="col-9">
                <h2>Our Menu</h2>
              </Col>
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
                            fontSize: "10px",
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
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Pizza" {...a11yProps(0)} />
                    <Tab label="Burger" {...a11yProps(1)} />
                    <Tab label="Other" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <div>
                    <Row>
                      {product?.products.length > 0 ? (
                        <>
                          {product?.products.map((product) => (
                            <Col xs={6} sm={6} md={6} lg={4}>
                              <ProductCard product={product}></ProductCard>
                            </Col>
                          ))}
                        </>
                      ) : (
                        <h4>No Products Available</h4>
                      )}
                    </Row>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                  Item Three
                </TabPanel>
              </Box>
            </div>
          </Col>
          <CusCol sm={12} md={12} lg={4} xl={4}>
            <Card sx={{ width: "100%", marginTop: 12 }}>
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
          </CusCol>
        </Row>
      </CusContainer>
      <Footer></Footer>
      {renderCartModal()}
    </div>
  );
}
