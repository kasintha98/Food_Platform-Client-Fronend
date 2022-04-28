import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
import Alert from "@mui/material/Alert";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CheckoutCard from "../../components/CheckoutCard/index";
import ProductCard from "../../components/ProductCard";
import styled from "@emotion/styled";
import CartNum from "../../components/UI/CartNum";
import { useSelector, useDispatch } from "react-redux";
import { Paper } from "@mui/material";
import { Grid } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { CardMedia, TextField } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Divider from "@mui/material/Divider";
import LoginIcon from "@mui/icons-material/Login";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import CartCard from "../../components/CartCard";
import { DeliveryTypeModal } from "../../components/DeliveryTypeModal";
import GooglePayButton from "@google-pay/button-react";
import { SettingsApplicationsRounded } from "@mui/icons-material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { GetAddress, saveNewOrder, setDeliveryType } from "../../actions";
import LoginDrawer from "../../components/Login";
import { useMediaQuery } from "react-responsive";
import { BottomNav } from "../../components/BottomNav";
import { Paytm } from "../../components/Paytm";
import { PayU } from "../../components/PayU";
import { InvoiceTable } from "../../components/InvoiceTable";
import Pdf from "react-to-pdf";
import { PayUTest } from "../../components/PayUTest";

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

  @media (max-width: 992px) {
    display: block;
  }
`;

const CusContainer = styled(Container)`
  margin-top: 50px;
  min-height: calc(100vh - 180px);
  margin-bottom: -40px;
  @media (max-width: 992px) {
    margin-top: 60px;
  }
`;

const CusCol = styled(Col)`
  @media (max-width: 992px) {
    display: none;
  }
`;

const POButton = styled(Button)`
  background-color: #00b050;
  height: 50px;
  width: 250px;

  &:hover {
    background-color: #357a38;
  }

  @media (max-width: 992px) {
    width: 100%;
  }
`;

const CLButton = styled(Button)`
  /* background-color: #a6a6a6;

  &:hover {
    background-color: #616161;
  } */
`;

const ACButton = styled(Button)`
  background-color: #92d050;
  height: 40px;
  &:hover {
    background-color: #548235;
  }
`;

const DTButton = styled(Button)`
  background-color: #92d050;
  height: 40px;
  &:hover {
    background-color: #548235;
  }
`;

const SPMButton = styled(Button)`
  background-color: #92d050;
  height: 40px;
  &:hover {
    background-color: #548235;
  }
`;

const CusTextField = styled(TextField)`
  border: 1px solid #a5a5a5;
  height: 40px;

  & .MuiOutlinedInput-notchedOutline {
    border-style: hidden;
  }

  & .MuiOutlinedInput-root {
    height: 40px;
  }
`;

export default function NewCheckout() {
  const defDel = useSelector((state) => state.auth.deliveryType);
  const deliveryPrice = useSelector((state) => state.auth.deliveryPrice);

  const [value, setValue] = useState(0);
  const cart = useSelector((state) => state.cart);
  const [subTotal, setSubtotal] = useState(0);
  const [currentType, setCurrentType] = useState(0);
  const [extraSubTotal, setExtraSubTotal] = useState(0);
  const [choiceTotal, setChoiceTotal] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [orderResp, setOrderResp] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(
    defDel ? defDel.selectedAddress : null
  );
  const [selectedAddressStr, setSelectedAddressStr] = useState(
    defDel
      ? defDel.selectedAddress
        ? defDel.selectedAddress.customerAddressType
        : null
      : null
  );
  const [delModalOpen, setDelModalOpen] = useState(false);
  const [delModalOpen2, setDelModalOpen2] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [show, setShow] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [currentPaymentType, setCurrentPaymentType] = useState("");
  const [showInvoice, setShowInvoice] = useState(false);
  const [delCharge, setDelCharge] = useState(0);

  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });

  const dispatch = useDispatch();
  const ref = React.createRef();

  const allAddress = useSelector((state) => state.user.allAddresses);
  const auth = useSelector((state) => state.auth);
  const taxDetails = useSelector((state) => state.auth.taxDetails);

  const history = useHistory();

  useEffect(() => {
    const item = localStorage.getItem("deliveryType");
    console.log(item);
    if (item) {
      console.log(JSON.parse(item));
      setCurrentType(JSON.parse(item));
    }

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let localUserMobileNumber = localStorage.getItem("userMobileNumber");

    if (localUserMobileNumber) {
      if (specialChars.test(localUserMobileNumber)) {
        encodeURIComponent(localUserMobileNumber);
      }
      dispatch(GetAddress(localUserMobileNumber));
    }
  }, []);

  useEffect(() => {
    console.log("setSelectedAddress");
    if (defDel) {
      setCurrentType(defDel);
      if (defDel.selectedAddress) {
        setSelectedAddress(defDel.selectedAddress);
        setSelectedAddressStr(defDel.selectedAddress.customerAddressType);
      }
    }
  }, [defDel]);

  const renderAllSub = () => {
    const all =
      subTotal +
      (extraSubTotal ? extraSubTotal : 0) +
      (choiceTotal ? choiceTotal : 0);
    return <span>₹ {all.toFixed(2)}</span>;
  };

  const calcDeliveryPrice = () => {
    const allSub =
      subTotal +
      (extraSubTotal ? extraSubTotal : 0) +
      (choiceTotal ? choiceTotal : 0);

    let deliveryCharge = 0;

    if (deliveryPrice) {
      deliveryPrice.forEach((delivery) => {
        if (allSub >= delivery.minAmount && allSub <= delivery.maxAmount) {
          deliveryCharge = delivery.deliveryFee;
        }
      });
    }

    setDelCharge(deliveryCharge.toFixed(2));
  };

  const renderTax = (tax) => {
    const all = (
      (subTotal +
        (extraSubTotal ? extraSubTotal : 0) +
        (choiceTotal ? choiceTotal : 0)) *
      (tax.taxPercentage / 100)
    ).toFixed(2);
    return <span>₹ {all}</span>;
  };

  const renderGrandTot = () => {
    const allSub =
      subTotal +
      (extraSubTotal ? extraSubTotal : 0) +
      (choiceTotal ? choiceTotal : 0);

    let allTax = 0;

    if (taxDetails) {
      taxDetails.forEach((tax) => {
        allTax = allTax + allSub * (tax.taxPercentage / 100);
      });
    }

    const grantTot = allSub + allTax + Number(delCharge);

    return <span>₹ {grantTot.toFixed(2)}</span>;
  };

  const handleCusAdDChange = (address) => {
    const newDel = { ...defDel, selectedAddress: address };
    setSelectedAddress(address);
    dispatch(setDeliveryType(newDel));
  };

  const handlePaymentType = () => {
    console.log(paymentType);
    setCurrentPaymentType(paymentType);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseInvoice = () => setShowInvoice(false);
  const handleShowInvoice = () => setShowInvoice(true);

  const placeOrder = () => {
    try {
      const total =
        subTotal +
        (extraSubTotal ? extraSubTotal : 0) +
        (choiceTotal ? choiceTotal : 0);

      let orderDetails = [];
      const allItems = Object.values(cart?.cartItems);

      for (let i = 0; i < allItems.length; i++) {
        const obj = {
          productId: allItems[i].productId,
          quantity: allItems[i].qty,
          storeId: allItems[i].storeId,
          price: allItems[i].price,
          remarks: allItems[i].specialText,
        };
        orderDetails.push(obj);
      }

      let cgstCaluclatedValue = 0;
      let sgstCalculatedValue = 0;

      if (taxDetails) {
        taxDetails.forEach((tax) => {
          if (tax.taxCategory.toUpperCase() === "CGST") {
            cgstCaluclatedValue = total * (tax.taxPercentage / 100);
          }
          if (tax.taxCategory.toUpperCase() === "SGST") {
            cgstCaluclatedValue = total * (tax.taxPercentage / 100);
          }
        });
      }
      const NewOrder = {
        id: 0,
        orderId: "EMPTY",
        restaurantId: currentType.restaurantId,
        storeId: currentType.storeId,
        orderSource: "M",
        customerId: auth.user.id,
        orderReceivedDateTime: new Date(),
        orderDeliveryType:
          currentType.type === "delivery" ? "delivery" : "pickup",
        storeTableId: "testStore",
        orderStatus: "SUBMITTED",
        taxRuleId: 1,
        totalPrice: total,
        customerAddressId: selectedAddress ? selectedAddress.id : null,
        cgstCaluclatedValue: cgstCaluclatedValue.toFixed(2),
        sgstCalculatedValue: sgstCalculatedValue.toFixed(2),
        overallPriceWithTax: null,
        orderDetails: orderDetails,
      };

      /* [
        {
          productId: "P001",
          orderId: "44",
          quantity: 10,
          storeId: "S001",
          price: 4.5,
          remarks: "Burger Order",
        },
        {
          productId: "P002",
          quantity: 2,
          orderId: "44",
          storeId: "S001",
          price: 8.5,
          remarks: "Pizza Order",
        },
      ] */

      //console.log(NewOrder);
      dispatch(saveNewOrder(NewOrder)).then((res) => {
        if (res && res.data) {
          console.log(res.data);
          setOrderResp(res.data);
          handleShowInvoice();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const resetPaymentMethod = () => {
    setCurrentPaymentType("");
  };

  const handleNavTab = (val) => {
    console.log(val);
    setTabValue(val);
  };

  const handleSubTotal = (total) => {
    setSubtotal(total);
    calcDeliveryPrice();
  };

  const handleExtraTotal = (total) => {
    setExtraSubTotal(total);
    calcDeliveryPrice();
  };

  const handleChoiceTotal = (total) => {
    setChoiceTotal(total);
    calcDeliveryPrice();
  };

  const handleTypeChange = (type) => {
    setCurrentType(type);
  };

  const handleCloseDelModal = (resp) => {
    setDelModalOpen(resp);
    setDelModalOpen2(resp);
  };

  const renderDeliveryTypeModal = () => {
    return setDelModalOpen(true);
  };

  const renderDeliveryTypeModal2 = () => {
    console.log(delModalOpen2);
    return setDelModalOpen2(true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeCoupon = (event) => {
    setCoupon(event.target.value);
  };

  const handleChangePaymentType = (event) => {
    setPaymentType(event.target.value);
  };

  const handleChangeSelectedAddressStr = (event) => {
    setSelectedAddressStr(event.target.value);
  };

  const renderNowDate = () => {
    const dateObj = new Date();
    const month = dateObj.toLocaleString("default", { month: "short" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return (
      <span>
        {day}/{month.toUpperCase()}/{year}
      </span>
    );
  };

  const renderNowTime = () => {
    const dateObj = new Date();
    const time = dateObj.toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
    });

    return <span>{time}</span>;
  };

  const renderInvoiceModal = () => {
    return (
      <Modal show={showInvoice} onHide={handleCloseInvoice}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Typography>Invoice</Typography>
          </Modal.Title>
        </Modal.Header>
        {orderResp ? (
          <Modal.Body ref={ref}>
            {defDel ? (
              <>
                <div className="text-center">
                  <Typography sx={{ fontWeight: "600" }}>Hangries</Typography>
                  <Typography sx={{ color: "#A6A6A6" }}>
                    <span>{defDel.address1}</span>
                    {defDel.address2 ? (
                      <>
                        , <span>{defDel.address2}</span>
                      </>
                    ) : null}
                    {defDel.address3 ? (
                      <>
                        , <br></br>
                        <span>{defDel.address3}</span>
                      </>
                    ) : null}
                    , {defDel.city}
                    {defDel.zipCode ? <>, {defDel.zipCode}</> : null},{" "}
                    {defDel.country}
                  </Typography>
                  <Typography sx={{ fontWeight: "600" }}>
                    Order ID: {orderResp ? orderResp.orderId : null}
                  </Typography>
                  <Typography sx={{ fontWeight: "600" }}>
                    Order No: {orderResp ? orderResp.id : null}
                  </Typography>
                  <Typography sx={{ fontWeight: "600" }}>
                    {defDel.type === "delivery" ? (
                      <span>Delivery</span>
                    ) : (
                      <span>Self-Collect</span>
                    )}
                    <span> [Paid]</span>
                  </Typography>
                </div>
                <hr></hr>
                <div>
                  <Typography>
                    Name: {auth.user?.firstName} {auth.user?.lastName}
                  </Typography>
                  {selectedAddress ? (
                    <Typography>
                      {/* <p
                                      style={{
                                        fontWeight: "bold",
                     
                                      }}
                                    >
                                      {selectedAddress.customerAddressType}
                                    </p> */}
                      <p
                        style={{
                          color: "#7F7F7F",
                        }}
                      >
                        {selectedAddress.address1}
                        {", "}
                        {selectedAddress.address2}
                        {", "}
                        {selectedAddress.landmark}
                        {", "}
                        {selectedAddress.city}
                        {", "}
                        {selectedAddress.zipCode}
                        {", "}
                        {selectedAddress.state}
                      </p>
                    </Typography>
                  ) : null}
                  <Typography>Mob No: {auth.user?.mobileNumber}</Typography>
                </div>
                <hr></hr>
                <div>
                  <Typography>
                    <Row>
                      <Col>Time: {renderNowTime()}</Col>
                      <Col>Date: {renderNowDate()}</Col>
                    </Row>
                  </Typography>
                </div>
                <hr></hr>
                <div>
                  <InvoiceTable
                    allProducts={orderResp.orderDetails}
                  ></InvoiceTable>
                </div>
              </>
            ) : null}
          </Modal.Body>
        ) : null}

        <Modal.Footer>
          <Row className="w-100">
            <Col className="col-6">
              <Button
                color="secondary"
                onClick={handleCloseInvoice}
                className="w-100"
                variant="contained"
              >
                Close
              </Button>
            </Col>
            <Col className="col-6">
              <Pdf targetRef={ref} filename="invoice.pdf">
                {({ toPdf }) => (
                  <Button
                    color="primary"
                    onClick={toPdf}
                    className="w-100"
                    variant="contained"
                  >
                    Download Invoice
                  </Button>
                )}
              </Pdf>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    );
  };

  const renderPayUModal = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Secure Form Example</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <section className="container">
                <div className="card-container">
                  <aside>Card Number</aside>
                  <div
                    className="payu-card-form payu-secure-form payu-secure-form-empty"
                    id="payu-card-number"
                  >
                    <iframe
                      allowTransparency="true"
                      scrolling="no"
                      className="payu-secure-form-iframe"
                      src="https://merch-prod.snd.payu.com/front/secure-form/form/?ringId=_PayuRingIframe_1&type=number&cardIcon=true&style=%7B%22basic%22%3A%7B%22fontSize%22%3A%2224px%22%7D%7D&placeholder=%7B%22number%22%3A%22%22%2C%22date%22%3A%22MM%2FYY%22%2C%22cvv%22%3A%22%22%7D&lang=en&fonts=%5B%5D&sid=K4ofK9cPsKkP0tPCCk9cz"
                      style={{
                        border: "medium none !important",
                        margin: "0px !important",
                        padding: "0px !important",
                        width: "1px !important",
                        minWidth: "100% !important",
                        overflow: "hidden !important",
                        display: "block !important",
                        height: "28.8px",
                      }}
                      frameBorder={0}
                    />
                  </div>
                  <div className="card-details clearfix">
                    <div className="expiration">
                      <aside>Valid Thru</aside>
                      <div
                        className="payu-card-form payu-secure-form payu-secure-form-empty"
                        id="payu-card-date"
                      >
                        <iframe
                          allowTransparency="true"
                          scrolling="no"
                          className="payu-secure-form-iframe"
                          src="https://merch-prod.snd.payu.com/front/secure-form/form/?ringId=_PayuRingIframe_1&type=date&style=%7B%22basic%22%3A%7B%22fontSize%22%3A%2224px%22%7D%7D&placeholder=%7B%22number%22%3A%22%22%2C%22date%22%3A%22MM%2FYY%22%2C%22cvv%22%3A%22%22%7D&lang=en&fonts=%5B%5D&sid=K4ofK9cPsKkP0tPCCk9cz"
                          style={{
                            border: "medium none !important",
                            margin: "0px !important",
                            padding: "0px !important",
                            width: "1px !important",
                            minWidth: "100% !important",
                            overflow: "hidden !important",
                            display: "block !important",
                            height: "28.8px",
                          }}
                          frameBorder={0}
                        />
                      </div>
                    </div>
                    <div className="cvv">
                      <aside>CVV</aside>
                      <div
                        className="payu-card-form payu-secure-form payu-secure-form-empty"
                        id="payu-card-cvv"
                      >
                        <iframe
                          allowTransparency="true"
                          scrolling="no"
                          className="payu-secure-form-iframe"
                          src="https://merch-prod.snd.payu.com/front/secure-form/form/?ringId=_PayuRingIframe_1&type=cvv&style=%7B%22basic%22%3A%7B%22fontSize%22%3A%2224px%22%7D%7D&placeholder=%7B%22number%22%3A%22%22%2C%22date%22%3A%22MM%2FYY%22%2C%22cvv%22%3A%22%22%7D&lang=en&fonts=%5B%5D&sid=K4ofK9cPsKkP0tPCCk9cz"
                          style={{
                            border: "medium none !important",
                            margin: "0px !important",
                            padding: "0px !important",
                            width: "1px !important",
                            minWidth: "100% !important",
                            overflow: "hidden !important",
                            display: "block !important",
                            height: "28.8px",
                          }}
                          frameBorder={0}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button id="tokenizeButton">Tokenize</button>
                <div id="responseTokenize" />
              </section>
              <iframe
                allowTransparency="true"
                tabIndex={-1}
                scrolling="no"
                src="https://merch-prod.snd.payu.com/front/secure-form/ring/?sid=K4ofK9cPsKkP0tPCCk9cz"
                aria-hidden="true"
                style={{
                  border: "none !important",
                  margin: "0px !important",
                  padding: "0px !important",
                  width: "1px !important",
                  overflow: "hidden !important",
                  display: "block !important",
                  visibility: "hidden !important",
                  position: "fixed !important",
                  height: "1px !important",
                  pointerEvents: "none !important",
                  userSelect: "none !important",
                }}
                frameBorder={0}
              />
            </div>
          </div>
          <p>
            Check refer to the{" "}
            <a href="card_tokenization.html#secureform">Secure Form section</a>.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div>
      <Header></Header>
      <div className="wh-background">
        <CusContainer>
          <Row>
            <Col md={12} lg={4} className="mar-tp-f">
              <Row>
                <Col className="col-12 text-center">
                  {/* {cart?.cartItems &&
                  Object.keys(cart?.cartItems).length > 0 ? (
                    <h5>
                      You have selected {Object.keys(cart.cartItems).length}{" "}
                      items
                    </h5>
                  ) : (
                    <h5>You have no items in the cart</h5>
                  )} */}

                  <h5 style={{ fontWeight: "bold", color: "#000" }}>
                    VALIDATE YOUR ORDER
                  </h5>
                </Col>
                {/* <Col className="col-4">
                <Typography sx={{ textAlign: "end" }}>
                  <a href="/new-menu">Explore Menu</a>
                </Typography>
              </Col> */}
              </Row>
              <div>
                <Card sx={{ width: "100%", marginTop: 3 }}>
                  <CardContent sx={{ height: "auto" }}>
                    <CartCard
                      onChangeSubTotal={handleSubTotal}
                      onChangeExtraSubTotal={handleExtraTotal}
                      onChangeChoiceTotal={handleChoiceTotal}
                    ></CartCard>
                    {Object.keys(cart.cartItems).length > 0 ? (
                      <Typography>
                        <Row className="ps-2">
                          <div className="w75">
                            <Typography
                              sx={{
                                fontSize: "0.9rem",
                                fontWeight: "600",
                                fontFamily: "Arial",
                                color: "#595959",
                              }}
                            >
                              Subtotal
                            </Typography>
                          </div>
                          <div className="w25">
                            <Typography
                              sx={{
                                fontSize: "0.9rem",
                                fontWeight: "600",
                                color: "#2e7d32",
                              }}
                            >
                              {renderAllSub()}
                            </Typography>
                          </div>
                        </Row>
                        <Row className="ps-2">
                          {taxDetails ? (
                            <>
                              {taxDetails.map((tax) => (
                                <>
                                  <div className="w75">
                                    <Typography
                                      sx={{
                                        fontSize: "0.9rem",
                                        fontWeight: "600",
                                        fontFamily: "Arial",
                                        color: "#595959",
                                      }}
                                    >
                                      Taxes ({tax.taxCategory}{" "}
                                      {tax.taxPercentage}%)
                                    </Typography>
                                  </div>
                                  <div className="w25">
                                    <Typography
                                      sx={{
                                        fontSize: "0.9rem",
                                        fontWeight: "600",
                                        color: "#2e7d32",
                                      }}
                                    >
                                      {renderTax(tax)}
                                    </Typography>
                                  </div>
                                </>
                              ))}
                            </>
                          ) : null}
                        </Row>

                        <Row className="ps-2">
                          <div className="w75">
                            <Typography
                              sx={{
                                fontSize: "0.9rem",
                                fontWeight: "600",
                                fontFamily: "Arial",
                                color: "#595959",
                              }}
                            >
                              Delivery Charges
                            </Typography>
                          </div>
                          <div className="w25">
                            <Typography
                              sx={{
                                fontSize: "0.9rem",
                                fontWeight: "600",
                                color: "#2e7d32",
                              }}
                            >
                              ₹ {delCharge}
                            </Typography>
                          </div>
                        </Row>
                        <Row className="ps-2">
                          <div className="w75 mt-2">
                            <Typography
                              sx={{
                                fontSize: "0.9rem",
                                fontWeight: "600",
                                fontFamily: "Arial",
                                color: "#595959",
                              }}
                            >
                              Grand Total
                            </Typography>
                          </div>
                          <div className="w25 mt-2">
                            <Typography
                              sx={{
                                fontSize: "0.9rem",
                                fontWeight: "600",
                                color: "#2e7d32",
                              }}
                            >
                              {renderGrandTot()}
                            </Typography>
                          </div>
                        </Row>
                      </Typography>
                    ) : null}
                  </CardContent>
                </Card>
              </div>
            </Col>
            <Col md={12} lg={4} className="mar-tp">
              <Row>
                <Col className="col-12 text-center">
                  <h5 style={{ fontWeight: "bold", color: "#000" }}>
                    CONFIRM YOUR ORDER DETAILS
                  </h5>
                </Col>
              </Row>
              <Row>
                <Col className="col-12">
                  <Grid sx={{ width: "100%", marginTop: 3 }}>
                    <Card sx={{ width: "100%", marginTop: 3 }}>
                      <CardContent>
                        <h5
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: "600",
                            fontFamily: "Arial",
                            color: "#595959",
                          }}
                        >
                          DELIVERY TYPE :{" "}
                          {currentType?.type === "delivery" ? (
                            <span>Delivery</span>
                          ) : (
                            <span>Self-Collect</span>
                          )}
                        </h5>
                        <h5
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: "600",
                            fontFamily: "Arial",
                            color: "#595959",
                          }}
                        >
                          ORDER DATE : {renderNowDate()}
                        </h5>
                        {currentType && currentType?.type === "delivery" ? (
                          <div style={{ width: "100%", marginTop: 3 }}>
                            <div className="row mb-3">
                              <h5
                                style={{
                                  fontSize: "0.9rem",
                                  fontWeight: "600",
                                  fontFamily: "Arial",
                                  color: "#595959",
                                }}
                              >
                                SELECT DELIVERY ADDRESS
                              </h5>
                            </div>

                            {auth.authenticate ? (
                              <div className="row">
                                <div
                                  className="col-6"
                                  sx={{ textAlign: "center" }}
                                >
                                  {allAddress.length < 1 ? (
                                    <Alert severity="error">
                                      You don't have added any addresses. Please
                                      add a new address!
                                    </Alert>
                                  ) : null}
                                  {selectedAddress ? (
                                    <Typography sx={{ textAlign: "left" }}>
                                      <h5
                                        style={{
                                          fontSize: "0.9rem",
                                          fontWeight: "600",
                                          fontFamily: "Arial",
                                          color: "#595959",
                                        }}
                                      >
                                        {selectedAddress.customerAddressType}
                                      </h5>
                                      <p
                                        style={{
                                          fontSize: "0.9rem",
                                          fontFamily: "Arial",
                                          color: "#595959",
                                        }}
                                      >
                                        {selectedAddress.address1}
                                        <br />
                                        {selectedAddress.address2}
                                        <br />
                                        {selectedAddress.landmark}
                                        <br />
                                        {selectedAddress.city}
                                        <br />
                                        {selectedAddress.zipCode}
                                        <br />
                                        {selectedAddress.state}
                                      </p>
                                    </Typography>
                                  ) : null}
                                </div>

                                <div
                                  className="col-6"
                                  sx={{ textAlign: "end" }}
                                >
                                  {allAddress.length > 0 ? (
                                    <FormControl fullWidth className="mb-3">
                                      <InputLabel id="demo-address-label">
                                        Address
                                      </InputLabel>
                                      <Select
                                        labelId="demo-address-label"
                                        id="demo-address"
                                        value={selectedAddressStr}
                                        label="Address"
                                        onChange={
                                          handleChangeSelectedAddressStr
                                        }
                                      >
                                        {allAddress.map((address) => (
                                          <MenuItem
                                            key={address.customerAddressType}
                                            onClick={() => {
                                              handleCusAdDChange(address);
                                            }}
                                            value={address.customerAddressType}
                                          >
                                            {address.customerAddressType}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  ) : null}
                                  <Typography sx={{ textAlign: "center" }}>
                                    <CardActions>
                                      {/* <CLButton
                                    variant="contained"
                                    className="w-100"
                                  >
                                    ADD NEW ADDRESS
                                  </CLButton> */}
                                      <LoginDrawer
                                        forceAddAddress={true}
                                      ></LoginDrawer>
                                    </CardActions>
                                  </Typography>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <Alert severity="error">
                                  Please login to use your address for delivery!
                                </Alert>
                              </div>
                            )}
                          </div>
                        ) : null}
                        {currentType && currentType?.type === "collect" ? (
                          <div style={{ width: "100%", marginTop: 3 }}>
                            <div className="row mb-3">
                              <h5
                                style={{
                                  fontSize: "0.9rem",
                                  fontWeight: "600",
                                  fontFamily: "Arial",
                                  color: "#595959",
                                }}
                              >
                                SELF COLLECT
                              </h5>
                            </div>
                            <div className="row">
                              <div
                                className="col-12"
                                sx={{ textAlign: "center" }}
                              >
                                <Typography sx={{ textAlign: "left" }}>
                                  <h5
                                    style={{
                                      fontSize: "0.9rem",
                                      fontWeight: "600",
                                      fontFamily: "Arial",
                                      color: "#595959",
                                    }}
                                  >
                                    STORE ADDRESS
                                  </h5>
                                  <p
                                    style={{
                                      fontSize: "0.9rem",
                                      fontFamily: "Arial",
                                      color: "#595959",
                                    }}
                                  >
                                    {currentType.resturantName} <br />
                                    <span>{currentType.address1}</span>
                                    {currentType.address2 ? (
                                      <>
                                        , <span>{currentType.address2}</span>
                                      </>
                                    ) : null}
                                    {currentType.address3 ? (
                                      <>
                                        , <span>{currentType.address3}</span>
                                      </>
                                    ) : null}
                                  </p>
                                </Typography>
                              </div>

                              <div className="col-12" sx={{ textAlign: "end" }}>
                                <Typography sx={{ textAlign: "center" }}>
                                  <CardActions>
                                    <CLButton
                                      onClick={renderDeliveryTypeModal2}
                                      variant="contained"
                                      className="w-100"
                                      color="warning"
                                    >
                                      CHANGE LOCATION
                                    </CLButton>
                                  </CardActions>
                                </Typography>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        {!currentType ? (
                          <div>
                            <Row>
                              <Col className="col-12 mt-5 mb-2">
                                <Typography
                                  sx={{
                                    fontWeight: "bold",
                                    fontSize: "1.25rem",
                                    color: "#7F7F7F",
                                  }}
                                >
                                  PLEASE SELECT A DELIVERY TYPE
                                </Typography>
                              </Col>
                              <Col className="col-12">
                                <DTButton
                                  onClick={renderDeliveryTypeModal}
                                  variant="contained"
                                  color="success"
                                  sx={{ width: "100%" }}
                                >
                                  Select Delivery Type
                                </DTButton>
                              </Col>
                            </Row>
                          </div>
                        ) : null}
                      </CardContent>
                    </Card>
                  </Grid>
                </Col>
              </Row>

              {/* <Row>
                <Col className="col-12">
                  <Grid sx={{ width: "100%", marginTop: 3 }}>
                    <Card>
                      <CardContent>
                        <h5 style={{ fontWeight: "bold", color: "#7F7F7F" }}>
                          APPLY COUPON CODE
                        </h5>
                        <div className="row align-items-center">
                          <div className="col-6" sx={{ textAlign: "center" }}>
                            <CusTextField
                              id="outlined-name"
                              value={coupon}
                              onChange={handleChangeCoupon}
                            />
                          </div>

                          <div className="col-6" sx={{ textAlign: "end" }}>
                            <Typography sx={{ textAlign: "center" }}>
                              <CardActions>
                                <ACButton variant="contained" className="w-100">
                                  APPLY COUPON
                                </ACButton>
                              </CardActions>
                            </Typography>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                </Col>
              </Row> */}
            </Col>
            <Col md={12} lg={4} className="mar-tp">
              <Row>
                <Col className="col-12 text-center">
                  <h5 style={{ fontWeight: "bold", color: "#000" }}>
                    PAYMENT MODE
                  </h5>
                </Col>
              </Row>
              {/* <Row>
              <Col className="col-12 mt-5">
                <h5>Payment Options</h5>
              </Col>
              <Col className="col-12">
                <Grid sx={{ width: "100%", marginTop: 3 }}>
                  <Card>
                    <CardActionArea>
                      <CardContent>
                        <Row>
                          <Col className="col-6">
                            <GooglePayButton
                              environment="TEST"
                              className="text-center p-0 m-0"
                              paymentRequest={{
                                apiVersion: 2,
                                apiVersionMinor: 0,
                                allowedPaymentMethods: [
                                  {
                                    type: "CARD",
                                    parameters: {
                                      allowedAuthMethods: [
                                        "PAN_ONLY",
                                        "CRYPTOGRAM_3DS",
                                      ],
                                      allowedCardNetworks: [
                                        "MASTERCARD",
                                        "VISA",
                                      ],
                                    },
                                    tokenizationSpecification: {
                                      type: "PAYMENT_GATEWAY",
                                      parameters: {
                                        gateway: "example",
                                        gatewayMerchantId:
                                          "exampleGatewayMerchantId",
                                      },
                                    },
                                  },
                                ],
                                merchantInfo: {
                                  merchantId: "12345678901234567890",
                                  merchantName: "Hangries",
                                },
                                transactionInfo: {
                                  totalPriceStatus: "FINAL",
                                  totalPriceLabel: "Total",
                                  totalPrice: "1.00",
                                  currencyCode: "USD",
                                  countryCode: "US",
                                },
                              }}
                              onLoadPaymentData={(paymentRequest) => {
                                console.log(
                                  "load payment data",
                                  paymentRequest
                                );
                                console.log(
                                  "TODO: send data to backend",
                                  paymentRequest
                                );
                                setIsPaid(true);
                              }}
                            />
                          </Col>
                          <Col className="col-6">
                            <form
                              method="post"
                              action="https://merch-prod.snd.payu.com/api/v2_1/orders"
                              target="_blank"
                            >
                              <input
                                type="hidden"
                                name="customerIp"
                                defaultValue="123.123.123.123"
                              />
                              <input
                                type="hidden"
                                name="merchantPosId"
                                defaultValue={300746}
                              />
                              <input
                                type="hidden"
                                name="description"
                                defaultValue="Order description"
                              />
                              <input
                                type="hidden"
                                name="totalAmount"
                                defaultValue={20000}
                              />
                              <input
                                type="hidden"
                                name="currencyCode"
                                defaultValue="PLN"
                              />
                              <input
                                type="hidden"
                                name="buyer.language"
                                defaultValue="en"
                              />
                              <input
                                type="hidden"
                                name="products[0].name"
                                defaultValue="Product 1"
                              />
                              <input
                                type="hidden"
                                name="products[0].unitPrice"
                                defaultValue={20000}
                              />
                              <input
                                type="hidden"
                                name="products[0].quantity"
                                defaultValue={1}
                              />
                              <input
                                type="hidden"
                                name="continueUrl"
                                defaultValue="https://developers.payu.com"
                              />
                              <input
                                type="hidden"
                                name="OpenPayu-Signature"
                                defaultValue="sender=300746;algorithm=SHA-256;signature=4349c7a814c7d4caf40f5be4f0746c35f69094fccc0605a6b747dc621148f731"
                              />
                              <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                className="w-100"
                              >
                                PayU Payment
                              </Button>
                            </form>

                         
                          </Col>
                        </Row>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              </Col>
            </Row> */}

              <Row>
                <Col className="col-12">
                  <Grid sx={{ width: "100%", marginTop: 3 }}>
                    {!currentPaymentType ? (
                      <Card>
                        <FormControl sx={{ marginLeft: 3, marginTop: 2 }}>
                          {/* <h5 style={{ fontWeight: "bold", color: "#7F7F7F" }}>
                            PAYMENT METHOD
                          </h5> */}
                          <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={paymentType}
                            onChange={handleChangePaymentType}
                          >
                            <FormControlLabel
                              value="PayU"
                              control={<Radio color="success" />}
                              label={
                                <Typography
                                  sx={{
                                    color: "#595959",
                                    fontSize: "0.9rem",
                                    fontWeight: "600",
                                    fontFamily: "Arial",
                                  }}
                                >
                                  PayU (Cards, Net Banking, UPI, Wallet)
                                </Typography>
                              }
                            />
                            <FormControlLabel
                              value="Paytm"
                              control={<Radio color="success" />}
                              label={
                                <Typography
                                  sx={{
                                    color: "#595959",
                                    fontSize: "0.9rem",
                                    fontWeight: "600",
                                    fontFamily: "Arial",
                                  }}
                                >
                                  Paytm (UPI, Net Banking, Credit card, Debit
                                  Card, Patm wallet)
                                </Typography>
                              }
                            />
                            <FormControlLabel
                              value="CASH"
                              control={<Radio color="success" />}
                              label={
                                <Typography
                                  sx={{
                                    color: "#595959",
                                    fontSize: "0.9rem",
                                    fontWeight: "600",
                                    fontFamily: "Arial",
                                  }}
                                >
                                  Cash
                                </Typography>
                              }
                              disabled={
                                currentType?.type === "delivery" ? true : false
                              }
                            />
                            <FormControlLabel
                              value="COD"
                              control={<Radio color="success" />}
                              label={
                                <Typography
                                  sx={{
                                    color: "#595959",
                                    fontSize: "0.9rem",
                                    fontWeight: "600",
                                    fontFamily: "Arial",
                                  }}
                                >
                                  Cash On Delivery
                                </Typography>
                              }
                              disabled={
                                currentType?.type === "collect" ? true : false
                              }
                            />
                          </RadioGroup>
                        </FormControl>
                        <CardActions>
                          <SPMButton
                            variant="contained"
                            color="success"
                            className="w-100"
                            onClick={handlePaymentType}
                            disabled={paymentType ? false : true}
                          >
                            SELECT PAYMENT METHOD
                          </SPMButton>
                        </CardActions>
                      </Card>
                    ) : null}
                    {currentPaymentType === "Paytm" ? (
                      <Card className="p-3">
                        <Row>
                          <Col>
                            <Paytm></Paytm>
                          </Col>
                          <Col>
                            <Button
                              onClick={resetPaymentMethod}
                              variant="contained"
                              color="warning"
                              sx={{ width: "100%", height: "100%" }}
                            >
                              Reset
                            </Button>
                          </Col>
                        </Row>
                      </Card>
                    ) : null}
                    {currentPaymentType === "PayU" ? (
                      <Card className="p-3">
                        <Row>
                          <Col>
                            {/* <PayU></PayU> */}
                            <PayUTest></PayUTest>
                          </Col>
                          <Col>
                            <Button
                              onClick={resetPaymentMethod}
                              variant="contained"
                              color="warning"
                              sx={{ width: "100%", height: "100%" }}
                            >
                              Reset
                            </Button>
                          </Col>
                        </Row>
                      </Card>
                    ) : null}
                    {currentPaymentType === "CASH" ? (
                      <Card className="p-3">
                        <Row>
                          <Col>
                            <p>You selected CASH!</p>
                          </Col>
                          <Col>
                            <Button
                              onClick={resetPaymentMethod}
                              variant="contained"
                              color="warning"
                              sx={{ width: "100%", height: "100%" }}
                            >
                              Reset
                            </Button>
                          </Col>
                        </Row>
                      </Card>
                    ) : null}
                    {currentPaymentType === "COD" ? (
                      <Card className="p-3">
                        <Row>
                          <Col>
                            <p>You selected Cash On Delivery!</p>
                          </Col>
                          <Col>
                            <Button
                              onClick={resetPaymentMethod}
                              variant="contained"
                              color="warning"
                              sx={{ width: "100%", height: "100%" }}
                            >
                              Reset
                            </Button>
                          </Col>
                        </Row>
                      </Card>
                    ) : null}
                  </Grid>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className="text-center p-3">
              {currentType?.type === "delivery" ? (
                <POButton
                  onClick={placeOrder}
                  variant="contained"
                  disabled={
                    selectedAddress && Object.keys(cart?.cartItems).length > 0
                      ? false
                      : true
                  }
                >
                  PLACE ORDER
                </POButton>
              ) : (
                <POButton
                  onClick={placeOrder}
                  variant="contained"
                  disabled={
                    Object.keys(cart?.cartItems).length > 0 ? false : true
                  }
                >
                  PLACE ORDER
                </POButton>
              )}
            </Col>
          </Row>
        </CusContainer>
      </div>
      <Footer></Footer>
      {delModalOpen ? (
        <DeliveryTypeModal
          delay={1}
          onChangeType={handleTypeChange}
          onCloseDelModal={handleCloseDelModal}
        ></DeliveryTypeModal>
      ) : null}
      {delModalOpen2 ? (
        <DeliveryTypeModal
          delay={1}
          onChangeType={handleTypeChange}
          onCloseDelModal={handleCloseDelModal}
          forceOpen={true}
          fromCheckout={true}
        ></DeliveryTypeModal>
      ) : null}
      {renderInvoiceModal()}
      {renderPayUModal()}
      {isMobile ? <BottomNav onChangeTab={handleNavTab}></BottomNav> : null}
    </div>
  );
}
