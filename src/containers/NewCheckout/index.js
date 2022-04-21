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
import { GetAddress } from "../../actions";

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
  background-color: #a6a6a6;

  &:hover {
    background-color: #616161;
  }
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
`;

export default function NewCheckout() {
  const [value, setValue] = useState(0);

  const cart = useSelector((state) => state.cart);
  const [subTotal, setSubtotal] = useState(0);
  const [currentType, setCurrentType] = useState(0);
  const [extraSubTotal, setExtraSubTotal] = useState(0);
  const [choiceTotal, setChoiceTotal] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedAddressStr, setSelectedAddressStr] = useState(null);
  const [delModalOpen, setDelModalOpen] = useState(false);
  const [delModalOpen2, setDelModalOpen2] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [show, setShow] = useState(false);
  const [paymentType, setPaymentType] = React.useState("female");

  const dispatch = useDispatch();

  const allAddress = useSelector((state) => state.user.allAddresses);
  const auth = useSelector((state) => state.auth);

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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubTotal = (total) => {
    setSubtotal(total);
  };

  const handleExtraTotal = (total) => {
    setExtraSubTotal(total);
  };

  const handleChoiceTotal = (total) => {
    setChoiceTotal(total);
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
      <CusContainer>
        <Row>
          <Col className="col-7 mt-5">
            <Row>
              <Col className="col-8">
                {cart?.cartItems && Object.keys(cart?.cartItems).length > 0 ? (
                  <h5>
                    You have selected {Object.keys(cart.cartItems).length} items
                  </h5>
                ) : (
                  <h5>You have no items in the cart</h5>
                )}
              </Col>
              <Col className="col-4">
                <Typography sx={{ textAlign: "end" }}>
                  {/* <a href="/new-menu">Explore Menu</a> */}
                </Typography>
              </Col>
            </Row>
            <div>
              <Card sx={{ width: "100%", marginTop: 3 }}>
                <CardContent sx={{ height: "auto" }}>
                  <CartCard
                    onChangeSubTotal={handleSubTotal}
                    onChangeExtraSubTotal={handleExtraTotal}
                    onChangeChoiceTotal={handleChoiceTotal}
                  ></CartCard>
                </CardContent>
              </Card>
            </div>
            <Row>
              <Col className="col-12 mt-5">
                <h5>Price Details</h5>
              </Col>
              <Col className="col-12">
                <Grid sx={{ width: "100%", marginTop: 3 }}>
                  <Card>
                    <Table aria-label="simple table">
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Sub Total
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ textAlign: "end" }}
                          >
                            ₹{" "}
                            {subTotal +
                              (extraSubTotal ? extraSubTotal : 0) +
                              (choiceTotal ? choiceTotal : 0)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Discount
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ textAlign: "end" }}
                          >
                            -
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Taxes and Charges
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ textAlign: "end" }}
                          >
                            -
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Grand Total
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ textAlign: "end" }}
                          >
                            ₹{" "}
                            {subTotal +
                              (extraSubTotal ? extraSubTotal : 0) +
                              (choiceTotal ? choiceTotal : 0)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <CardActions sx={{ justifyContent: "center" }}>
                      <POButton variant="contained">PLACE ORDER</POButton>
                    </CardActions>
                  </Card>
                </Grid>
              </Col>
            </Row>
          </Col>

          <Col className="col-5 mt-5">
            {currentType && currentType?.type === "delivery" ? (
              <Row>
                <Col className="col-12">
                  <Grid sx={{ width: "100%", marginTop: 3 }}>
                    <Card>
                      <CardContent>
                        <div className="row mb-3">
                          <h5 style={{ fontWeight: "bold", color: "#7F7F7F" }}>
                            SELECT DELIVERY ADDRESS
                          </h5>
                        </div>

                        {auth.authenticate ? (
                          <div className="row">
                            <div className="col-6" sx={{ textAlign: "center" }}>
                              {allAddress.length < 1 ? (
                                <Alert severity="error">
                                  You don't have added any addresses. Please add
                                  a new address!
                                </Alert>
                              ) : null}
                              {selectedAddress ? (
                                <Typography sx={{ textAlign: "left" }}>
                                  <h5
                                    style={{
                                      fontWeight: "bold",
                                      color: "#7F7F7F",
                                    }}
                                  >
                                    {selectedAddress.customerAddressType}
                                  </h5>
                                  <p
                                    style={{
                                      color: "#7F7F7F",
                                    }}
                                  >
                                    {selectedAddress.address1}
                                    <br />
                                    {selectedAddress.address2}
                                    <br />
                                    {selectedAddress.landmark}
                                    <br />
                                    {selectedAddress.state}
                                    <br />
                                    {selectedAddress.city}
                                    <br />
                                    {selectedAddress.zip}
                                  </p>
                                </Typography>
                              ) : null}
                            </div>

                            <div className="col-6" sx={{ textAlign: "end" }}>
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
                                    onChange={handleChangeSelectedAddressStr}
                                  >
                                    {allAddress.map((address) => (
                                      <MenuItem
                                        onClick={() => {
                                          setSelectedAddress(address);
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
                                  <CLButton
                                    variant="contained"
                                    className="w-100"
                                  >
                                    ADD NEW ADDRESS
                                  </CLButton>
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
                      </CardContent>
                    </Card>
                  </Grid>
                </Col>
              </Row>
            ) : null}

            {currentType && currentType?.type === "collect" ? (
              <Row>
                <Col className="col-12">
                  <Grid sx={{ width: "100%", marginTop: 3 }}>
                    <Card>
                      <CardContent>
                        <div className="row mb-3">
                          <h5 style={{ fontWeight: "bold", color: "#7F7F7F" }}>
                            SELF COLLECT
                          </h5>
                        </div>
                        <div className="row">
                          <div className="col-6" sx={{ textAlign: "center" }}>
                            <Typography sx={{ textAlign: "left" }}>
                              <h5
                                style={{ fontWeight: "bold", color: "#7F7F7F" }}
                              >
                                STORE ADDRESS
                              </h5>
                              <p
                                style={{
                                  color: "#7F7F7F",
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

                          <div className="col-6" sx={{ textAlign: "end" }}>
                            <Typography sx={{ textAlign: "center" }}>
                              <CardActions>
                                <CLButton
                                  onClick={renderDeliveryTypeModal2}
                                  variant="contained"
                                  className="w-100"
                                >
                                  CHANGE LOCATION
                                </CLButton>
                              </CardActions>
                            </Typography>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                </Col>
              </Row>
            ) : null}

            {!currentType ? (
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
            ) : null}

            <Row>
              <Col className="col-12 mt-5"></Col>
              <Col className="col-12">
                <Grid sx={{ width: "100%", marginTop: 3 }}>
                  <Card sx={{ width: "100%", marginTop: 3 }}>
                    <CardContent>
                      <h5 style={{ fontWeight: "bold", color: "#7F7F7F" }}>
                        ORDER DATE : {renderNowDate()}
                      </h5>
                      <h5 style={{ fontWeight: "bold", color: "#7F7F7F" }}>
                        TIME : NOW
                      </h5>
                    </CardContent>
                  </Card>
                </Grid>
              </Col>
            </Row>

            <Row>
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
                  <Card>
                    <FormControl sx={{ marginLeft: 3, marginTop: 2 }}>
                      <h5 style={{ fontWeight: "bold", color: "#7F7F7F" }}>
                        PAYMENT METHOD
                      </h5>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={paymentType}
                        onChange={handleChangePaymentType}
                        sx={{ color: "#7F7F7F" }}
                      >
                        <FormControlLabel
                          value="PayU (Cards, Net Banking, UPI, Wallet)"
                          control={<Radio color="success" />}
                          label="PayU (Cards, Net Banking, UPI, Wallet)"
                        />
                        <FormControlLabel
                          value="Paytm (UPI, Net Banking, Credit card, Debit Card, Patm wallet)"
                          control={<Radio color="success" />}
                          label="Paytm (UPI, Net Banking, Credit card, Debit Card, Patm wallet)"
                        />
                        <FormControlLabel
                          value="CASH"
                          control={<Radio color="success" />}
                          label="CASH"
                        />
                        <FormControlLabel
                          value="CASH ON DELIVERY"
                          control={<Radio color="success" />}
                          label="CASH ON DELIVERY"
                        />
                      </RadioGroup>
                    </FormControl>
                    <CardActions>
                      <SPMButton
                        variant="contained"
                        color="success"
                        className="w-100"
                      >
                        SELECT PAYMENT METHOD
                      </SPMButton>
                    </CardActions>
                  </Card>
                </Grid>
              </Col>
            </Row>
          </Col>
        </Row>
      </CusContainer>
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
        ></DeliveryTypeModal>
      ) : null}
      {renderPayUModal()}
    </div>
  );
}
