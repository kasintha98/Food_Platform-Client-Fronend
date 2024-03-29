import React, { useState, useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";
import { useStateWithCallbackLazy } from "use-state-with-callback";
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
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import CartCard from "../../components/CartCard";
import { DeliveryTypeModal } from "../../components/DeliveryTypeModal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
  GetAddress,
  saveNewOrder,
  setDeliveryType,
  getAllStores,
  validateCoupon,
  clearCoupon,
  getBusinessDate,
  getPayuMerchantID,
  getPayuUrl,
  getPayuSalt,
  getOffersByStatusCall
} from "../../actions";
import LoginDrawer from "../../components/Login";
import { useMediaQuery } from "react-responsive";
import { BottomNav } from "../../components/BottomNav";
import { InvoiceTable } from "../../components/InvoiceTable";
import Pdf from "react-to-pdf";
import { PayUTest } from "../../components/PayUTest";
import { toast } from "react-toastify";
import { PaytmButton } from "../../components/PayTMNew/paytmButton";
import upiimg from "../../img/upi.jpg";
import nbimg from "../../img/nb.jpg";
import cardimg from "../../img/card.jpg";
import ReactGA from "react-ga4";

const queryString = require("query-string");
var jwt = require("jsonwebtoken");

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

const CusContainer = styled(Container)`
  margin-top: 50px;
  min-height: calc(100vh - 180px);
  margin-bottom: -40px;
  @media (max-width: 992px) {
    margin-top: 60px;
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

const CusTextField2 = styled(TextField)`
 & label {
  font-size: 0.75rem;
  top: -11px;
}

& .Mui-focused{
  top: 0px !important;
}

& fieldset{
  font-size: 0.75rem;
}

& .MuiFormLabel-filled{
  top: 0px !important;
}

& input{
  font-size: 0.75rem;
  padding: 0.25rem;
}
 }
`;

export default function NewCheckout(props) {
  const defDel = useSelector((state) => state.auth.deliveryType);
  const deliveryPrice = useSelector((state) => state.auth.deliveryPrice);
  const couponReduxObj = useSelector((state) => state.user.coupon);
  const clientPaymentModes = useSelector(
    (state) => state.user.clientPaymentModes
  );
  const businessDateAll = useSelector((state) => state.user.businessDate);
  const allAddress = useSelector((state) => state.user.allAddresses);
  const auth = useSelector((state) => state.auth);
  const taxDetails = useSelector((state) => state.auth.taxDetails);

  const payTMURL = useSelector((state) => state.user.payTMURL);
  const payTMMerchantID = useSelector((state) => state.user.payTMMerchantID);
  const payTMSalt = useSelector((state) => state.user.payTMSalt);
  const payTMWebsiteName = useSelector((state) => state.user.payTMWebsiteName);

  const [value, setValue] = useState(0);
  const cart = useSelector((state) => state.cart);
  const [subTotal, setSubtotal] = useState(0);
  const [currentType, setCurrentType] = useState(0);
  const [extraSubTotal, setExtraSubTotal] = useState(0);
  const [choiceTotal, setChoiceTotal] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [orderResp, setOrderResp] = useStateWithCallbackLazy(null);
  const [selectedAddress, setSelectedAddress] = useState(
    defDel
      ? defDel.selectedAddress
      : allAddress && allAddress.length > 0
      ? allAddress[0].customerAddressType
      : null
  );
  const [selectedAddressStr, setSelectedAddressStr] = useState(
    defDel && defDel.selectedAddress
      ? defDel.selectedAddress.customerAddressType
      : null
  );
  const [delModalOpen, setDelModalOpen] = useState(false);
  const [delModalOpen2, setDelModalOpen2] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [show, setShow] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Not Paid");
  const [currentPaymentType, setCurrentPaymentType] = useState("");
  const [showInvoice, setShowInvoice] = useState(false);
  const [delCharge, setDelCharge] = useState(0);
  const [height, setHeight] = useState(0);
  const [couponLocalObj, setCouponLocalObj] = useState(null);
  const [bOGOLowestPizzaKey, setBOGOLowestPizzaKey] = useState(null);
  const [comboReduceKey, setComboReduceKey] = useState(null);

  const offersData = useSelector((state) => state.user.offersData);
  const [comboOfferReduceKey, setcomboOfferReduceKey] = useState([]);

  const [offerCost, setOfferCost] = useState(0);

  const [allBogoReduceCost, setAllBogoReduceCost] = useState(0);
  const [showPayUFailed, setShowPayUFailed] = useState(false);
  const [comboOfferCode, setcomboOfferCode] = useState("");

  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });

  const dispatch = useDispatch();
  const ref = React.createRef();
  const refH = useRef(null);

  const delobj = JSON.parse(localStorage.getItem("deliveryType"));
  const qrobj = JSON.parse(localStorage.getItem("qr"));
  const qrcode = delobj?.qrcode;
  const tableId = delobj?.tableId;
  const customerName = qrobj?.name;
  const qruserid = qrobj?.userid;
  console.log("aaa qruserid", qruserid);

  const history = useHistory();
  let mobileNum = localStorage.getItem("userMobileNumber");

  useEffect(() => {
    dispatch(getAllStores());
    dispatch(getOffersByStatusCall(window.restId,"S001"));
    dispatch(getPayuUrl(currentType ? currentType.restaurantId : window.restId));
    dispatch(
      getPayuMerchantID(currentType ? currentType.restaurantId : window.restId)
    );
    dispatch(getPayuSalt(currentType ? currentType.restaurantId : window.restId));
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
      dispatch(GetAddress(localUserMobileNumber,window.restId)).then((res) => {
        if (res && !(defDel && defDel.selectedAddress)) {
          if (res && res.length > 0) {
            setSelectedAddress(res[0]);
            setSelectedAddressStr(res[0].customerAddressType);
          }
        }
      });
    }
  }, [mobileNum]);

  useEffect(() => {
    console.log("setSelectedAddress");
    if (defDel) {
      setCurrentType(defDel);
      if (defDel.selectedAddress) {
        setSelectedAddress(defDel.selectedAddress);
        setSelectedAddressStr(defDel.selectedAddress.customerAddressType);
      } else {
        if (allAddress && allAddress.length > 0) {
          setSelectedAddress(allAddress[0]);
          setSelectedAddressStr(allAddress[0].customerAddressType);
        }
      }
    }
  }, [defDel]);

  useEffect(() => {
    if (refH.current) {
      setHeight(refH.current.clientHeight * 0.58);
    }
  });

  useEffect(() => {
    if (defDel) {
      dispatch(getBusinessDate(defDel.restaurantId, defDel.storeId));
    }
  }, [defDel]);

  useEffect(() => {
    if(window.restId === "R001"){
      ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "Checkout Screen" });
    }else if (window.restId == "R002"){
      ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "Checkout Screen Hungry Point" });
    }

    if (
      queryString.parse(props.location.search).status === "success" &&
      queryString.parse(props.location.search).hash &&
      queryString.parse(props.location.search).res
    ) {
      let decodedOrderObj = null;
      let decodedPayURes = null;

      try {
        decodedOrderObj = jwt.verify(
          queryString.parse(props.location.search).hash,
          "burgersecret"
        );

        decodedPayURes = jwt.verify(
          queryString.parse(props.location.search).res,
          "burgersecret"
        );
      } catch (error) {
        console.log(error);
      }

      if (decodedOrderObj && decodedPayURes) {
        setCurrentPaymentType("PayU");
        toast.success("Payment Success");
        //let paymentMode = "PayU";

        /* if (decodedPayURes.mode === "CC") {
          paymentMode = "CREDIT_CARDS";
        }
        if (decodedPayURes.mode === "DC") {
          paymentMode = "DEBIT_CARDS";
        }
        if (decodedPayURes.mode === "NB") {
          paymentMode = "NET_BANKING";
        }
        if (decodedPayURes.mode === "UPI") {
          paymentMode = "UPI";
        } */

        // -- BLANK SCREEN COMMENTED
        console.log("**********************  isTransactionDone::: ", localStorage.getItem("transactionDone"));// BLANK SCREEN COMMENTED
        if (!isMobile) {
          if (localStorage.getItem("transactionDone") !== "TRANS_DONE") {
            localStorage.setItem("transactionDone", "TRANS_DONE");
            dispatch(saveNewOrder({ ...decodedOrderObj })).then((res) => {
              if (res && res.data) {
                console.log(res.data);
                setOrderResp(res.data[0], () => {
                  handleShowInvoice();
                });
                dispatch(clearCoupon());
                return res.data;
              } else {
                toast.error("Invalid hash or response data!");
              }
            });
          }
        } else if (isMobile) {
          if (localStorage.getItem("transactionDone") !== "TRANS_DONE") {
            localStorage.setItem("transactionDone", "TRANS_DONE");
            dispatch(saveNewOrder({ ...decodedOrderObj })).then((res) => {
              if (res && res.data) {
                console.log(res.data);
                setOrderResp(res.data[0], () => {
                  handleShowInvoice();
                });
                dispatch(clearCoupon());
                return res.data;
              } else {
                toast.error("Invalid hash or response data!");
              }
            });
          }
        } else {
          toast.error("Please login again!");
        }
        

        /*
        dispatch(saveNewOrder({ ...decodedOrderObj })).then((res) => {
          if (res && res.data) {
            console.log("Called at location 1");
            console.log(res.data);
            console.log("END at location 1");
            setOrderResp(res.data[0], () => {
              handleShowInvoice();
            });
            dispatch(clearCoupon());
            return res.data;
          }
        });
        */
      } 
      else {
        toast.error("Invalid hash or response data!");
      }
    }

    if (queryString.parse(props.location.search).status === "failure") {
      setShowPayUFailed(true);
    }
  }, []);

  const options = {
    unit: "px",
    format: [255, height],
  };

  const renderAllSub = () => {
    let all =
      subTotal +
      (extraSubTotal ? extraSubTotal : 0) +
      (choiceTotal ? choiceTotal : 0);

    if (
      couponReduxObj &&
      Number(couponReduxObj.couponDetails.discountPercentage)
    ) {
      const afterAddCoupon =
        (100 - Number(couponReduxObj.couponDetails.discountPercentage)) / 100;
      all = all * afterAddCoupon;
    }

    if (allBogoReduceCost) {
      all = all - Number(allBogoReduceCost);
    }

    if (comboReduceKey) {
      all = all - Number(comboReduceKey.reducingCost);
    }

    console.log(comboOfferReduceKey);
    if (typeof comboOfferReduceKey !== 'undefined' && comboOfferReduceKey && comboOfferReduceKey.length > 0) {
      var reduceCost = 0;
      for (let i = 0; i < comboOfferReduceKey.length; i++) {
        reduceCost = reduceCost + Number(comboOfferReduceKey[i].reducingCost)
      }
      all = all - reduceCost;
    }

    return <span>₹ {all.toFixed(2)}</span>;
  };

  const renderCouponDiscount = () => {
    let all =
      subTotal +
      (extraSubTotal ? extraSubTotal : 0) +
      (choiceTotal ? choiceTotal : 0);

    if (
      couponReduxObj &&
      Number(couponReduxObj.couponDetails.discountPercentage)
    ) {
      const afterAddCoupon =
        Number(couponReduxObj.couponDetails.discountPercentage) / 100;
      all = all * afterAddCoupon;
    }

    if (allBogoReduceCost) {
      all = all - Number(allBogoReduceCost);
    }

    if (comboReduceKey) {
      all = all - Number(comboReduceKey.reducingCost);
    }

    if (typeof comboOfferReduceKey !== 'undefined' && comboOfferReduceKey && comboOfferReduceKey.length > 0) {
      var reduceCost = 0;
      for (let i = 0; i < comboOfferReduceKey.length; i++) {
        reduceCost = reduceCost + Number(comboOfferReduceKey[i].reducingCost)
      }
      all = all - reduceCost;
    }

    return <span>₹ {all.toFixed(2)}</span>;
  };

  const calcDeliveryPrice = () => {
    if(defDel) {
    if (defDel.type === "delivery") {
      let allSub =
        subTotal +
        (extraSubTotal ? extraSubTotal : 0) +
        (choiceTotal ? choiceTotal : 0);

      if (
        couponReduxObj &&
        Number(couponReduxObj.couponDetails.discountPercentage)
      ) {
        const afterAddCoupon =
          (100 - Number(couponReduxObj.couponDetails.discountPercentage)) / 100;
        allSub = allSub * afterAddCoupon;
      }

      if (allBogoReduceCost) {
        allSub = allSub - Number(allBogoReduceCost);
      }

      if (comboReduceKey) {
        allSub = allSub - Number(comboReduceKey.reducingCost);
      }
      if (typeof comboOfferReduceKey !== 'undefined' && comboOfferReduceKey && comboOfferReduceKey.length > 0) {
        var reduceCost = 0;
      for (let i = 0; i < comboOfferReduceKey.length; i++) {
        reduceCost = reduceCost + Number(comboOfferReduceKey[i].reducingCost)
      }
        allSub = allSub - reduceCost;
      }

      let deliveryCharge = 0;

      if (deliveryPrice) {
        deliveryPrice.forEach((delivery) => {
          if (allSub >= delivery.minAmount && allSub <= delivery.maxAmount) {
            deliveryCharge = delivery.deliveryFee;
          }
        });
      }

      setDelCharge(deliveryCharge.toFixed(2));
    }
  }
  };

  const renderTax = (tax) => {
    let allSub =
      subTotal +
      (extraSubTotal ? extraSubTotal : 0) +
      (choiceTotal ? choiceTotal : 0);

    if (
      couponReduxObj &&
      Number(couponReduxObj.couponDetails.discountPercentage)
    ) {
      const afterAddCoupon =
        (100 - Number(couponReduxObj.couponDetails.discountPercentage)) / 100;
      allSub = allSub * afterAddCoupon;
    }

    if (allBogoReduceCost) {
      allSub = allSub - Number(allBogoReduceCost);
    }

    if (comboReduceKey) {
      allSub = allSub - Number(comboReduceKey.reducingCost);
    }

    if (typeof comboOfferReduceKey !== 'undefined' && comboOfferReduceKey && comboOfferReduceKey.length > 0) {
      var reduceCost = 0;
      for (let i = 0; i < comboOfferReduceKey.length; i++) {
        reduceCost = reduceCost + Number(comboOfferReduceKey[i].reducingCost)
      }
      allSub = allSub - reduceCost;
    }

    const all = (allSub * (tax.taxPercentage / 100)).toFixed(2);
    return <span>₹ {all}</span>;
  };

  let grandTotalForPayU = 0;

  const renderGrandTot = () => {
    let allSub =
      subTotal +
      (extraSubTotal ? extraSubTotal : 0) +
      (choiceTotal ? choiceTotal : 0);

    if (
      couponReduxObj &&
      Number(couponReduxObj.couponDetails.discountPercentage)
    ) {
      const afterAddCoupon =
        (100 - Number(couponReduxObj.couponDetails.discountPercentage)) / 100;
      allSub = allSub * afterAddCoupon;
    }

    if (allBogoReduceCost) {
      allSub = allSub - Number(allBogoReduceCost);
    }

    console.log(isCOMBOOfferVerified);

    if (comboReduceKey) {
      console.log("IN RENDER GRAND TOTAL OLD");
      allSub = allSub - Number(comboReduceKey.reducingCost);
    }

    if (typeof comboOfferReduceKey !== 'undefined' && comboOfferReduceKey && comboOfferReduceKey.length > 0) {
      console.log("IN RENDER GRAND TOTAL NEW");
      var reduceCost = 0;
      for (let i = 0; i < comboOfferReduceKey.length; i++) {
        reduceCost = reduceCost + Number(comboOfferReduceKey[i].reducingCost)
      }
      allSub = allSub - reduceCost;
    }

    let allTax = 0;

    if (taxDetails) {
      taxDetails.forEach((tax) => {
        allTax = allTax + allSub * (tax.taxPercentage / 100);
      });
    }

    const grantTot = allSub + allTax + Number(delCharge);
    grandTotalForPayU = grantTot.toFixed(2);

    return <span>₹ {Math.round(grantTot.toFixed(2))}.00</span>;
  };

  const handleCusAdDChange = (address) => {
    const newDel = { ...defDel, selectedAddress: address };
    setSelectedAddress(address);
    dispatch(setDeliveryType(newDel));
  };

  const handlePaymentType = () => {
    let type =
      paymentType === "UPI" || paymentType === "NB" || paymentType === "CARD"
        ? clientPaymentModes
        : paymentType;
    console.log(type);
    setCurrentPaymentType(type);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const closePayUFailed = () => setShowPayUFailed(false);

  const handleCloseInvoice = () => {
    setShowInvoice(false);
    history.push("/");
  };
  const handleShowInvoice = () => {
    console.log("Log OrerResp");
    console.log(orderResp);
    console.log("END Log OrerResp");
    setShowInvoice(true);
   
  }

  const placeOrder = async (
    fromVerifiedPayU,
    decodedOrderObj,
    fromVerifiedPayaTM
  ) => {
    try {
      let total =
        subTotal +
        (extraSubTotal ? extraSubTotal : 0) +
        (choiceTotal ? choiceTotal : 0);

      if (
        couponReduxObj &&
        Number(couponReduxObj.couponDetails.discountPercentage)
      ) {
        const afterAddCoupon =
          (100 - Number(couponReduxObj.couponDetails.discountPercentage)) / 100;
        total = total * afterAddCoupon;
      }

      if (allBogoReduceCost) {
        total = total - Number(allBogoReduceCost);
      }

      if (comboReduceKey) {
        total = total - Number(comboReduceKey.reducingCost);
      }

      if (typeof comboOfferReduceKey !== 'undefined' && comboOfferReduceKey && comboOfferReduceKey.length > 0) {

        var reduceCost = 0;
        for (let i = 0; i < comboOfferReduceKey.length; i++) {
          reduceCost = reduceCost + Number(comboOfferReduceKey[i].reducingCost)
        }
        total = total - reduceCost;
      }

      let orderDetails = [];
      const allItems = Object.values(cart?.cartItems);

      for (let i = 0; i < allItems.length; i++) {
        const obj = {
          productId: allItems[i].productId,
          orderId: "EMPTY",
          subProductId: allItems[i].subProductId
            ? allItems[i].subProductId
            : "NAA",
          quantity: allItems[i].qty,
          storeId: allItems[i].storeId,
          price: allItems[i].price,
          remarks: allItems[i].specialText,
          foodPackagedFlag: "N",
        };

        if (
          Object.keys(allItems[i].choiceIng).length > 0 &&
          allItems[i].choiceIng.price
        ) {
          console.log(allItems[i].choiceIng);
          const objCh = {
            productId: allItems[i].productId,
            orderId: "EMPTY",
            subProductId: allItems[i].choiceIng.subProductId
              ? allItems[i].choiceIng.subProductId
              : "NAA",
            quantity: allItems[i].qty ? allItems[i].qty : 1,
            storeId: allItems[i].storeId,
            price: allItems[i].choiceIng.price,
            remarks: allItems[i].choiceIng.specialText
              ? allItems[i].choiceIng.specialText
              : "",
            foodPackagedFlag: "N",
          };
          orderDetails.push(objCh);
        }

        if (Object.keys(allItems[i].extra).length > 0) {
          const allExtra = Object.values(allItems[i].extra);

          for (let k = 0; k < allExtra.length; k++) {
            const objextra = {
              productId: allItems[i].productId,
              orderId: "EMPTY",
              subProductId: allExtra[k].subProductId
                ? allExtra[k].subProductId
                : "NAA",
              quantity: allItems[i].qty ? allItems[i].qty : 1,
              storeId: allItems[i].storeId,
              price: allExtra[k].price,
              remarks: allExtra[k].specialText ? allExtra[k].specialText : "",
              foodPackagedFlag: "N",
            };
            orderDetails.push(objextra);
          }
        }

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
            sgstCalculatedValue = total * (tax.taxPercentage / 100);
          }
        });
      }

      let overallPriceWithTax =
        Number(total) +
        Number(cgstCaluclatedValue.toFixed(2)) +
        Number(sgstCalculatedValue.toFixed(2)) +
        Number(delCharge);

      const NewOrder = {
        id: 0,
        orderId: "EMPTY",
        restaurantId: decodedOrderObj
          ? decodedOrderObj.restaurantId
          : currentType.restaurantId,
        storeId: decodedOrderObj
          ? decodedOrderObj.storeId
          : currentType.storeId,
        orderSource:
          currentType.type === "delivery" ? "WD" : qrcode ? "Q" : "WS",
        customerId: auth.user.id || qruserid,
        orderReceivedDateTime: new Date(),
        orderDeliveryType:
          currentType.type === "delivery"
            ? "WEB DELIVERY"
            : qrcode
            ? "SELF DINE IN QR"
            : "WEB SELF COLLECT",
        storeTableId: tableId ? tableId : null,
        orderStatus: "SUBMITTED",
        taxRuleId: 1,
        totalPrice: decodedOrderObj ? decodedOrderObj.total : total,
        paymentStatus:
          fromVerifiedPayU || fromVerifiedPayaTM ? "PAID" : paymentStatus,
        paymentMode: fromVerifiedPayU ? "PayU" : currentPaymentType,
        deliveryCharges: decodedOrderObj
          ? decodedOrderObj.deliveryCharges
          : Number(delCharge)
          ? Number(delCharge)
          : 0,
        customerAddressId: selectedAddress ? selectedAddress.id : null,
        cgstCalculatedValue: decodedOrderObj
          ? decodedOrderObj.cgstCalculatedValue
          : cgstCaluclatedValue.toFixed(2),
        sgstCalculatedValue: decodedOrderObj
          ? decodedOrderObj.sgstCalculatedValue
          : sgstCalculatedValue.toFixed(2),
        overallPriceWithTax: decodedOrderObj
          ? decodedOrderObj.overallPriceWithTax
          : Math.round(overallPriceWithTax),
        orderDetails: orderDetails,
        // couponCode: couponReduxObj
        //   ? couponReduxObj.couponDetails.couponCode
        //   : "",
        couponCode: couponReduxObj
          ? couponReduxObj.couponDetails.couponCode
          : comboOfferCode,
        discountPercentage: decodedOrderObj
          ? decodedOrderObj.discountPercentage
          : couponReduxObj
          ? couponReduxObj.couponDetails.discountPercentage
          : 0,
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

      console.log("New order==========", NewOrder);

      const result = await dispatch(saveNewOrder(NewOrder)).then((res) => {
        if (res && res.data) {
          console.log("Called at location 2");
          console.log(res.data);
          console.log("END at location 2");
          setOrderResp(res.data[0], () => {
            if (currentPaymentType !== "PayU") {
              console.log("Inside not PayU loop");
              handleShowInvoice();
            }
            if (currentPaymentType === "PayU") {
              console.log("Inside PayU loop");
              toast.warning("Please complete the PayU process in next tab!");
            }
          });
          dispatch(clearCoupon());
          return res.data;
        }
      });
      return result;
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

  const handleChangePaymentType = (event) => {
    setPaymentType(event.target.value);
  };

  const handleChangeSelectedAddressStr = (event) => {
    setSelectedAddressStr(event.target.value);
  };

  var isComboCouponApplied = false;
  var offerString = "";
  localStorage.setItem("offerList",offerString);

  const validateCouponCode = () => {
    if (!couponCode) {
      toast.error("Please fill the coupon code!");
      return;
    }

    if (couponCode === "BOGO") {
      specialOfferCheckBOGO();
      return;
    }else{

        console.log("===============");
        console.log(offersData);

      const dateOfOffer = new Date(businessDateAll && businessDateAll.businessDate);
      const day = dateOfOffer.getDay();
      var dayOfferFlag ="";
  
      for (let i = 0; i < offersData.length; i++) {
        if (couponCode === (offersData[i].offerCode)) {

          setcomboOfferCode(offersData[i].offerCode);

           if(day === 0){dayOfferFlag = offersData[i].sunday }else if(day === 1){dayOfferFlag = offersData[i].monday}else if(day === 2){dayOfferFlag = offersData[i].tuesday}else if(day === 3){dayOfferFlag = offersData[i].wednesday}else if(day === 4){dayOfferFlag = offersData[i].thursday}else if(day === 5){dayOfferFlag = offersData[i].friday}else if(day === 6){dayOfferFlag = offersData[i].saturday}else{dayOfferFlag = ''}

          if(dayOfferFlag === "N"){
            toast.info("This code is not valid for the Day");
            break;
          }

          if (offersData[i].offerApplicability === 'ONLINE' || offersData[i].offerApplicability === 'BOTH') {
            isComboCouponApplied = true;
            setOfferCost(offersData[i].offerPrice);
            offerString = offersData[i].offerProductList;
            // if(offerString != null){ localStorage.setItem("offerList",offersData[i].offerProductList);}else{ localStorage.setItem("offerList","");}
            localStorage.setItem("offerList", offersData[i].offerProductList);
            offerCheckForCart(offersData[i].offerProductList);
            // console.log("+=+=");
            // console.log(offersData[i].offerCode);
            break;
          } else {
            toast.info("This code is not valid!");
            calculateCOMBOCartCostWithFaiedCode();
            break;
          }
        }
        console.log(offersData[i].offerCode);
      }
  
      dispatch(validateCoupon(couponCode, window.restId, "S001")).then((res) => {
        if (res) {
          setCouponLocalObj(res);
        }
      });
        return;
    }

    
  };

  //----- Combo offer code new ----
  var rule1 = "";
  var rule2 = "";
  var rule3 = "";
  var rule4 = "";
  var rule5 = "";
  var rule6 = "";

  var rule1_qty = 1;
  var rule2_qty = 1;
  var rule3_qty = 1;
  var rule4_qty = 1;
  var rule5_qty = 1;
  var rule6_qty = 1;

  var rule1AddQty = 0;
  var rule2AddQty = 0;
  var rule3AddQty = 0;
  var rule4AddQty = 0;
  var rule5AddQty = 0;
  var rule6AddQty = 0;

  var rule1Array = [];
  var rule2Array = [];
  var rule3Array = [];
  var rule4Array = [];
  var rule5Array = [];
  var rule6Array = [];

  var ruleQtyListArray = [];

  var comboReduceCost = 0;

  var rule1Verified = false;
  var rule2Verified = false;
  var rule3Verified = false;
  var rule4Verified = false;
  var rule5Verified = false;
  var rule6Verified = false;

  var isCOMBOOfferVerified = false;

  let comboOfferObjects = [];

  let verifyRule1 = (item,rule_items) => {
    console.log("verifyRule1 Method called");
    console.log(item);
    console.log(rule_items);

    rule_items.forEach(product => {
      if(product === item){
        console.log("verifyRule1 Loop called");
        // setRule1Verified(true);
        rule1Verified = true;
        
      }
    });
  }

  let verifyRuleWithQuantity = (rule, item, rule_items, rule_qty) => {

    if (rule === "rule1") {
      rule_items.forEach(product => {
        if (product === item.productId) {

          if (item.qty >= rule_qty) {
            rule1Verified = true;
            rule_items.forEach(checkProd => {
              comboOfferObjects = comboOfferObjects.filter(function (item) {
                return item !== checkProd
              })
            })
            var offerQtyObj = {
              key: product,
              ruleQty: rule_qty
            }
            ruleQtyListArray.push(offerQtyObj);
          } else {
            rule1AddQty = rule1AddQty + 1;
            console.log("======================", rule1AddQty, " -- product--", product, "==rule_qty==", rule_qty);
            if (rule_qty == rule1AddQty) {
              console.log("In Single rule verify condition", rule1AddQty, " -- product--", product);
              rule1Verified = true;
              var offerQtyObj = {
                key: product,
                ruleQty: rule_qty
              }
              ruleQtyListArray.push(offerQtyObj);
            }
          }

          // for(let i = 0; i < rule_qty; i ++){
          comboOfferObjects.push(item.productId);
          // }
        }
      });
    }

    if (rule === "rule2") {
      rule_items.forEach(product => {
        if (product === item.productId) {

          if (item.qty >= rule_qty) {
            rule2Verified = true;
            rule_items.forEach(checkProd => {
              comboOfferObjects = comboOfferObjects.filter(function (item) {
                return item !== checkProd
              })
            })
            var offerQtyObj = {
              key: product,
              ruleQty: rule_qty
            }
            ruleQtyListArray.push(offerQtyObj);
          } else {
            rule2AddQty = rule2AddQty + 1;
            if (rule_qty == rule2AddQty) {
              rule2Verified = true;
              var offerQtyObj = {
                key: product,
                ruleQty: rule_qty
              }
              ruleQtyListArray.push(offerQtyObj);
            }
          }

          comboOfferObjects.push(item.productId);
        }
      });
    }

    if (rule === "rule3") {
      rule_items.forEach(product => {
        if (product === item.productId) {

          if (item.qty >= rule_qty) {
            rule3Verified = true;
            rule_items.forEach(checkProd => {
              comboOfferObjects = comboOfferObjects.filter(function (item) {
                return item !== checkProd
              })
            })
            var offerQtyObj = {
              key: product,
              ruleQty: rule_qty
            }
            ruleQtyListArray.push(offerQtyObj);
          } else {
            rule3AddQty = rule3AddQty + 1;
            if (rule_qty == rule3AddQty) {
              rule3Verified = true;
              var offerQtyObj = {
                key: product,
                ruleQty: rule_qty
              }
              ruleQtyListArray.push(offerQtyObj);
            }
          }

          comboOfferObjects.push(item.productId);
        }
      });
    }

    if (rule === "rule4") {
      rule_items.forEach(product => {
        if (product === item.productId) {

          if (item.qty >= rule_qty) {
            rule4Verified = true;
            rule_items.forEach(checkProd => {
              comboOfferObjects = comboOfferObjects.filter(function (item) {
                return item !== checkProd
              })
            })
            var offerQtyObj = {
              key: product,
              ruleQty: rule_qty
            }
            ruleQtyListArray.push(offerQtyObj);
          } else {
            rule4AddQty = rule4AddQty + 1;
            if (rule_qty == rule4AddQty) {
              rule4Verified = true;
              var offerQtyObj = {
                key: product,
                ruleQty: rule_qty
              }
              ruleQtyListArray.push(offerQtyObj);
            }
          }

          comboOfferObjects.push(item.productId);
        }
      });
    }

    if (rule === "rule5") {
      rule_items.forEach(product => {
        if (product === item.productId) {

          if (item.qty >= rule_qty) {
            rule5Verified = true;
            rule_items.forEach(checkProd => {
              comboOfferObjects = comboOfferObjects.filter(function (item) {
                return item !== checkProd
              })
            })
            var offerQtyObj = {
              key: product,
              ruleQty: rule_qty
            }
            ruleQtyListArray.push(offerQtyObj);
          } else {
            rule5AddQty = rule5AddQty + 1;
            if (rule_qty == rule5AddQty) {
              rule5Verified = true;
              var offerQtyObj = {
                key: product,
                ruleQty: rule_qty
              }
              ruleQtyListArray.push(offerQtyObj);
            }
          }

          comboOfferObjects.push(item.productId);
        }
      });
    }

    if (rule === "rule6") {
      rule_items.forEach(product => {
        if (product === item.productId) {

          if (item.qty >= rule_qty) {
            rule6Verified = true;
            rule_items.forEach(checkProd => {
              comboOfferObjects = comboOfferObjects.filter(function (item) {
                return item !== checkProd
              })
            })
            var offerQtyObj = {
              key: product,
              ruleQty: rule_qty
            }
            ruleQtyListArray.push(offerQtyObj);
          } else {
            rule6AddQty = rule6AddQty + 1;
            if (rule_qty == rule6AddQty) {
              rule6Verified = true;
              var offerQtyObj = {
                key: product,
                ruleQty: rule_qty
              }
              ruleQtyListArray.push(offerQtyObj);
            }
          }

          comboOfferObjects.push(item.productId);
        }
      });
    }
  }

/*
  let verifyRule = (rule,item,rule_items) => {
    console.log("verifyRule Method called");
    console.log(rule);
    console.log(item);
    console.log(rule_items);

    if(rule === "rule1"){
      rule_items.forEach(product => {
        if(product === item){
          rule1Verified = true;
          comboOfferObjects.push(item);
        }
      });
    }

    if(rule === "rule2"){
      rule_items.forEach(product => {
        if(product === item){
          rule2Verified = true;
          comboOfferObjects.push(item);
        }
      });
    }

    if(rule === "rule3"){
      rule_items.forEach(product => {
        if(product === item){
          rule3Verified = true;
          comboOfferObjects.push(item);
        }
      });
    }

    if(rule === "rule4"){
      rule_items.forEach(product => {
        if(product === item){
          rule4Verified = true;
          comboOfferObjects.push(item);
        }
      });
    }

    if(rule === "rule5"){
      rule_items.forEach(product => {
        if(product === item){
          rule5Verified = true;
          comboOfferObjects.push(item);
        }
      });
    }

    if(rule === "rule6"){
      rule_items.forEach(product => {
        if(product === item){
          rule6Verified = true;
          comboOfferObjects.push(item);
        }
      });
    }
  }
  */

  const offerCheckForCart = (offerStr) => {
    rule1Verified = false;
    rule2Verified = false;
    rule3Verified = false;
    rule4Verified = false;
    rule5Verified = false;
    rule6Verified = false;

    rule1AddQty = 0;
    rule2AddQty = 0;
    rule3AddQty = 0;
    rule4AddQty = 0;
    rule5AddQty = 0;
    rule6AddQty = 0;

    // var offerString = "(P046 OR P049 OR P055 OR P052 OR P058 OR P061)X2AND(P152 OR P154 OR P153)X3AND(P125 OR P126)X1AND(P1808 OR P113 OR P114 OR P240)X1AND(NA)X1AND(NA)X1";
    // var offerString = "(P001)X2AND(P011)X2AND(P115)X3AND(NA)X1AND(NA)X1AND(NA)X1";
    // var offerString = "(P001)X3AND(NA)X1AND(NA)X1AND(NA)X1AND(NA)X1AND(NA)X1";


    console.log("************* offerStr",offerStr);
    var offerString = offerStr;
    offerString = offerString.replace(/[{()}]/g, '');

    const rule_Array = offerString.split('AND');

    // console.log(rule_Array);

    for (var i = 0; i < rule_Array.length; i++) {
        if (i === 0) {
          rule1 = rule_Array[i];

          rule1_qty = rule1.split('X')[1]; // Added for Quantity in each loop
          rule1 = rule1.split('X')[0] // Added for Quantity in each loop

          console.log("rule1_qty =====",rule1_qty);

          rule1Array = rule1.split(' OR ');
        } else if (i === 1) {
          rule2 = rule_Array[i];

          rule2_qty = rule2.split('X')[1];
          rule2 = rule2.split('X')[0]

          rule2Array = rule2.split(' OR ');
        } else if (i === 2) {
          rule3 = rule_Array[i];

          rule3_qty = rule3.split('X')[1];
          rule3 = rule3.split('X')[0]

          rule3Array = rule3.split(' OR ');
        } else if (i === 3) {
          rule4 = rule_Array[i];

          rule4_qty = rule4.split('X')[1];
          rule4 = rule4.split('X')[0]

          rule4Array = rule4.split(' OR ');
        } else if (i === 4) {
          rule5 = rule_Array[i];

          rule5_qty = rule5.split('X')[1];
          rule5 = rule5.split('X')[0]

          rule5Array = rule5.split(' OR ');
        }else if (i === 5) {
          rule6 = rule_Array[i];

          rule6_qty = rule6.split('X')[1];
          rule6 = rule6.split('X')[0]

          rule6Array = rule6.split(' OR ');
        }
    }

    console.log("RULE ARRAY LOGS START");
    console.log("----------------------");
    console.log( Object.values(cart?.cartItems));
    console.log( Object.keys(cart?.cartItems));
    console.log("----------------------");
    console.log("rule1",rule1Array);
    console.log("rule2",rule2Array);
    console.log("rule3",rule3Array);
    console.log("rule4",rule4Array);
    console.log("rule5",rule5Array);
    console.log("rule6",rule6Array);
    console.log("RULE ARRAY LOGS END");

    /*
    for (let i = 0; i < Object.values(cart?.cartItems).length; i++) {
      if(rule1Verified || rule1Array[0] === "NA"){ rule1Verified = true; break;}
      verifyRule("rule1",Object.values(cart?.cartItems)[i].productId,rule1Array);
    }

    for (let i = 0; i < Object.values(cart?.cartItems).length; i++) {
      if(rule2Verified || rule2Array[0] === "NA"){ rule2Verified = true; break;}
      verifyRule("rule2",Object.values(cart?.cartItems)[i].productId,rule2Array);
    }

    for (let i = 0; i < Object.values(cart?.cartItems).length; i++) {
      if(rule3Verified || rule3Array[0] === "NA"){ rule3Verified = true; break;}
      verifyRule("rule3",Object.values(cart?.cartItems)[i].productId,rule3Array);
    }

    for (let i = 0; i < Object.values(cart?.cartItems).length; i++) {
      if(rule4Verified || rule4Array[0] === "NA"){ rule4Verified = true; break;}
      verifyRule("rule4",Object.values(cart?.cartItems)[i].productId,rule4Array);
    }

    for (let i = 0; i < Object.values(cart?.cartItems).length; i++) {
      if(rule5Verified || rule5Array[0] === "NA"){ rule5Verified = true; break;}
      verifyRule("rule5",Object.values(cart?.cartItems)[i].productId,rule5Array);
    }

    for (let i = 0; i < Object.values(cart?.cartItems).length; i++) {
      if(rule6Verified || rule6Array[0] === "NA"){
        rule6Verified = true;
        break;}
      verifyRule("rule6",Object.values(cart?.cartItems)[i].productId,rule6Array);
    }
    */

    for (let i = 0; i < Object.values(cart?.cartItems).length; i++) {
      if(rule1Verified || rule1Array[0] === "NA"){ rule1Verified = true; break;}
      verifyRuleWithQuantity("rule1",Object.values(cart?.cartItems)[i],rule1Array,rule1_qty);
    }

    for (let i = 0; i < Object.values(cart?.cartItems).length; i++) {
      if(rule2Verified || rule2Array[0] === "NA"){ rule2Verified = true; break;}
      verifyRuleWithQuantity("rule2",Object.values(cart?.cartItems)[i],rule2Array,rule2_qty);
    }

    for (let i = 0; i < Object.values(cart?.cartItems).length; i++) {
      if(rule3Verified || rule3Array[0] === "NA"){ rule3Verified = true; break;}
      verifyRuleWithQuantity("rule3",Object.values(cart?.cartItems)[i],rule3Array,rule3_qty);
    }

    for (let i = 0; i < Object.values(cart?.cartItems).length; i++) {
      if(rule4Verified || rule4Array[0] === "NA"){ rule4Verified = true; break;}
      verifyRuleWithQuantity("rule4",Object.values(cart?.cartItems)[i],rule4Array,rule4_qty);
    }

    for (let i = 0; i < Object.values(cart?.cartItems).length; i++) {
      if(rule5Verified || rule5Array[0] === "NA"){ rule5Verified = true; break;}
      verifyRuleWithQuantity("rule5",Object.values(cart?.cartItems)[i],rule5Array,rule5_qty);
    }

    for (let i = 0; i < Object.values(cart?.cartItems).length; i++) {
      if(rule6Verified || rule6Array[0] === "NA"){rule6Verified = true;break;}
        verifyRuleWithQuantity("rule6",Object.values(cart?.cartItems)[i],rule6Array,rule6_qty);
    }

    isCOMBOOfferVerified = false;

    console.log("Booleans=====", isComboCouponApplied, rule1Verified , rule2Verified ,
      rule3Verified , rule4Verified , rule5Verified , rule6Verified);

    if (isComboCouponApplied && rule1Verified && rule2Verified &&
      rule3Verified && rule4Verified && rule5Verified && rule6Verified) {
      isCOMBOOfferVerified = true;
      calculateCOMBOCartCost();
      toast.success("Hurray!! COMBO Offer has been applied!");
    } else {
      // if (isCOMBOOfferVerified) {
        isCOMBOOfferVerified = false;
        isComboCouponApplied = false;
        // calculateCOMBOCartCostWithFaiedCode();

        setOfferCost(0);

        // toast.error("FAILED!!");
      // }
    }

  }

  const calculateCOMBOCartCost = () => {
    console.log("CALCULATE CART VALUE START::::");
    console.log(comboOfferObjects);

    var comboKeys = [];
    var comboValues = [];

    for (let i = 0; i < Object.keys(cart?.cartItems).length; i++) {
      comboKeys.push(Object.keys(cart?.cartItems)[i]);
      comboValues.push({
          ...Object.values(cart?.cartItems)[i],
          cost:
            Object.values(cart?.cartItems)[i].price *
              Object.values(cart?.cartItems)[i].qty +
            Object.values(cart?.cartItems)[i].extraSubTotalWithQty +
            Object.values(cart?.cartItems)[i].choiceIng.choiceTotal,
          oneItemFullCost:
            Number(
              Object.values(cart?.cartItems)[i].price *
                Object.values(cart?.cartItems)[i].qty +
                Object.values(cart?.cartItems)[i].extraSubTotalWithQty +
                Object.values(cart?.cartItems)[i].choiceIng.choiceTotal
            ) / Number(Object.values(cart?.cartItems)[i].qty),
        });
    }

    // console.log("COMBO VALUES::::");
    // console.log(comboValues);

    const COMBOValuesSortByPrice = comboValues.sort(
      (a, b) => a.oneItemFullCost - b.oneItemFullCost
    );

    // console.log(COMBOValuesSortByPrice);
    var offerProduct = [];

    for (let j = 0; j < comboOfferObjects.length; j++) {

      for (let i = 0; i < Object.values(cart?.cartItems).length; i++) {
        if(comboOfferObjects[j] === Object.values(cart?.cartItems)[i].productId) {
          comboReduceCost = comboReduceCost + Object.values(cart?.cartItems)[i].price;
          offerProduct.push(Object.values(cart?.cartItems)[i]);
        }
      }
    }

    // console.log("CALCULATED COST::::");
    // console.log(comboReduceCost);
    // console.log(offerProduct);

    //----------
    let comboValuesWithReduceQty = [];

    for (let j = 0; j < offerProduct.length; j++) {

      comboReduceCost =
      comboReduceCost +
      offerProduct[j].oneItemFullCost;
      let obj2 = {
        ...offerProduct[j],
        qty: offerProduct[j].qty,
        extraSubTotalWithQty: Number(
          offerProduct[j].extraSubTotal *
            (offerProduct[j].qty)
        ),
        choiceIng: {
          ...offerProduct[j].choiceIng,
          choiceTotal: Number(
            offerProduct[j].choiceIng.price *
              (offerProduct[j].qty)
          ),
        },
      };
      comboValuesWithReduceQty.push(obj2);

      // console.log("comboValuesWithReduceQty::::");
      // console.log(comboValuesWithReduceQty);
      // console.log(((Number(comboValuesWithReduceQty[0].price)* comboValuesWithReduceQty[0].qty)-Number(comboValuesWithReduceQty[0].price)));
    }

    var comboOfferArray = [];

    var finalArray = [];

    for (let i = 0; i < Object.values(cart?.cartItems).length; i++) {
      comboOfferArray.push(Object.values(cart?.cartItems)[i])
    }

     for (let i = 0; i < comboOfferArray.length; i++) {
      if (comboValuesWithReduceQty.some(person => person.productId === comboOfferArray[i].productId)) {
        var ruleQty = 1;

        ruleQtyListArray.forEach(obj => {
          if(obj.key === comboOfferArray[i].productId){ ruleQty = obj.ruleQty}
        })

        if (comboOfferArray[i].qty > 1) {
          let object = {
            key: comboOfferArray[i].key,
            price: Number((comboOfferArray[i].qty * comboOfferArray[i].price) - (Number(comboOfferArray[i].price)*ruleQty)),
            reducingCost: Number(comboOfferArray[i].price)*ruleQty,
          }
          finalArray.push(object);
        } else {
          let object = {
            key: comboOfferArray[i].key,
            price: 0,
            reducingCost: Number(comboOfferArray[i].price),
          }
          finalArray.push(object);
        }
      }else{
        let object = {
          key: comboOfferArray[i].key,
          price: (Number(comboOfferArray[i].price)* (comboOfferArray[i].qty)),
          reducingCost: 0,
        }
        finalArray.push(object);
      }
    }

    console.log("---------------");
    console.log(comboOfferArray);
    console.log(finalArray);

    setcomboOfferReduceKey(finalArray);

    console.log("CART VALUE AFTER REDUCE::::");
    console.log( Object.values(cart?.cartItems));
  }


  const calculateCOMBOCartCostWithFaiedCode = () => {
     window.location.reload(true);
  }

  const specialOfferCheckBOGO = () => {
    if (couponCode === "BOGO") {
      const d = new Date(businessDateAll && businessDateAll.businessDate);
      const day = d.getDay();
      const wednesday = 3;
      let pizzaCount = 0;
      let pizzaKeys = [];
      let pizzaValues = [];
      let allReduceCost = 0;

      if (day === wednesday) {
        for (let i = 0; i < Object.keys(cart?.cartItems).length; i++) {
          if (
            Object.values(cart?.cartItems)[i].section === "Pizza" &&
            Object.values(cart?.cartItems)[i].productSize !== "Small" &&
            Object.values(cart?.cartItems)[i].dish !== "Combo"
          ) {
            pizzaKeys.push(Object.keys(cart?.cartItems)[i]);
            pizzaValues.push({
              ...Object.values(cart?.cartItems)[i],
              cost:
                Object.values(cart?.cartItems)[i].price *
                  Object.values(cart?.cartItems)[i].qty +
                Object.values(cart?.cartItems)[i].extraSubTotalWithQty +
                Object.values(cart?.cartItems)[i].choiceIng.choiceTotal,
              oneItemFullCost:
                Number(
                  Object.values(cart?.cartItems)[i].price *
                    Object.values(cart?.cartItems)[i].qty +
                    Object.values(cart?.cartItems)[i].extraSubTotalWithQty +
                    Object.values(cart?.cartItems)[i].choiceIng.choiceTotal
                ) / Number(Object.values(cart?.cartItems)[i].qty),
            });
            pizzaCount = pizzaCount + Object.values(cart?.cartItems)[i].qty;
          }
        }

        if (pizzaCount >= 2) {
          const pizzaValuesSortedByPrice = pizzaValues.sort(
            (a, b) => a.oneItemFullCost - b.oneItemFullCost
          );

          const numberOfPizzasToReducePrice = Math.floor(pizzaCount / 2);

          let pizzaValuesWithReduceQty = [];
          let reduceCount = numberOfPizzasToReducePrice;

          for (let j = 0; j < pizzaValuesSortedByPrice.length; j++) {
            if (reduceCount > pizzaValuesSortedByPrice[j].qty) {
              allReduceCost =
                allReduceCost +
                pizzaValuesSortedByPrice[j].qty *
                  pizzaValuesSortedByPrice[j].oneItemFullCost;
              let obj1 = {
                ...pizzaValuesSortedByPrice[j],
                qty: 0,
                extraSubTotal: 0,
                extraSubTotalWithQty: 0,
                choiceIng: {
                  ...pizzaValuesSortedByPrice[j].choiceIng,
                  choiceTotal: 0,
                },
              };
              pizzaValuesWithReduceQty.push(obj1);
              reduceCount = reduceCount - pizzaValuesSortedByPrice[j].qty;
            } else {
              allReduceCost =
                allReduceCost +
                reduceCount * pizzaValuesSortedByPrice[j].oneItemFullCost;
              let obj2 = {
                ...pizzaValuesSortedByPrice[j],
                qty: pizzaValuesSortedByPrice[j].qty - reduceCount,
                extraSubTotalWithQty: Number(
                  pizzaValuesSortedByPrice[j].extraSubTotal *
                    (pizzaValuesSortedByPrice[j].qty - reduceCount)
                ),
                choiceIng: {
                  ...pizzaValuesSortedByPrice[j].choiceIng,
                  choiceTotal: Number(
                    pizzaValuesSortedByPrice[j].choiceIng.price *
                      (pizzaValuesSortedByPrice[j].qty - reduceCount)
                  ),
                },
              };
              pizzaValuesWithReduceQty.push(obj2);
              reduceCount = 0;
            }
          }

          console.log(pizzaValuesWithReduceQty);

          /* const pizzasToReducePrice = pizzaValuesSortedByPrice.slice(
            0,
            numberOfPizzasToReducePrice
          ); */

          /* for (let i = 0; i < pizzasToReducePrice.length; i++) {
            allReduceCost =
              allReduceCost +
              numberOfPizzasToReducePrice *
                pizzasToReducePrice[i].oneItemFullCost;
          } */

          /* if (
            cart?.cartItems[pizzaKeys[0]].price >
            cart?.cartItems[pizzaKeys[1]].price
          ) {
            lowestPizzaKey = pizzaKeys[1];
          }
          if (
            cart?.cartItems[pizzaKeys[0]].price <
            cart?.cartItems[pizzaKeys[1]].price
          ) {
            lowestPizzaKey = pizzaKeys[0];
          }

          let cost =
            cart?.cartItems[lowestPizzaKey].price *
              cart?.cartItems[lowestPizzaKey].qty +
            cart?.cartItems[lowestPizzaKey].extraSubTotalWithQty +
            cart?.cartItems[lowestPizzaKey].choiceIng.choiceTotal; */

          setAllBogoReduceCost(allReduceCost);
          setBOGOLowestPizzaKey(pizzaValuesWithReduceQty);
          toast.success("Hurray!! BOGO Offer has been applied!");
        } else {
          setBOGOLowestPizzaKey(null);
          toast.error("BOGO is not applicable for this cart!");
        }
      } else {
        setBOGOLowestPizzaKey(null);
        if (day !== wednesday) {
          toast.error("BOGO is not applicable today! Only on wednesday!");
        } else {
          toast.error("BOGO is not applicable for this cart!");
        }
      }
    }
  };

  const specialOfferCheckCOMBO1 = () => {
    if (couponCode === "COMBO1") {
      if (Object.keys(cart?.cartItems).length === 2) {
        let drinkCount = 0;
        let drinkKey = null;
        let drinkObj = null;

        for (let i = 0; i < Object.keys(cart?.cartItems).length; i++) {
          if (Object.values(cart?.cartItems)[i].section === "Shakes & Drinks") {
            drinkKey = Object.keys(cart?.cartItems)[i];
            drinkObj = Object.values(cart?.cartItems)[i];
            drinkCount = drinkCount + Object.values(cart?.cartItems)[i].qty;
          }
        }

        if (drinkCount === 1) {
          setComboReduceKey({
            key: drinkKey,
            price: 29,
            reducingCost: Number(drinkObj.price) - 29,
          });
          toast.success("Hurray!! COMBO1 Offer has been applied");
        } else {
          toast.error("COMBO1 is not applicable for this cart!");
          setComboReduceKey(null);
        }
      } else {
        setComboReduceKey(null);
        toast.error("COMBO1 is not applicable for this cart!");
      }
    }
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

  const calcValues = (val) => {
    let total =
      subTotal +
      (extraSubTotal ? extraSubTotal : 0) +
      (choiceTotal ? choiceTotal : 0);

    if (val === "total") {
      return total;
    }

    if (val === "cgst") {
      if (taxDetails) {
        let c = 0;
        taxDetails.forEach((tax) => {
          if (tax.taxCategory.toUpperCase() === "CGST") {
            c = total * (tax.taxPercentage / 100);
          }
        });
        return c.toFixed(2);
      } else {
        return 0;
      }
    }

    if (val === "sgst") {
      if (taxDetails) {
        let c = 0;
        taxDetails.forEach((tax) => {
          if (tax.taxCategory.toUpperCase() === "SGST") {
            c = total * (tax.taxPercentage / 100);
          }
        });
        return c.toFixed(2);
      }
    }

    if (val === "over") {
      return (
        Number(total) +
        Number(calcValues("cgst")) +
        Number(calcValues("sgst")) +
        Number(delCharge)
      ).toFixed();
    }
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
          <Modal.Body style={{ maxHeight: "75vh", overflowY: "auto" }}>
            {defDel ? (
              <div ref={ref}>
                <div ref={refH}>
                  <div className="text-center">
                    <Typography sx={{ fontWeight: "600" }}>Hangries</Typography>
                    <Typography sx={{ color: "black" }}>
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
                      GST NO: {defDel ? defDel.storeGstNumber : null}
                    </Typography>
                    <Typography sx={{ fontWeight: "600" }}>
                      Order ID: {orderResp ? orderResp.orderId : null}
                    </Typography>
                    <Typography sx={{ fontWeight: "600" }}>
                      Customer Name:{" "}
                      {orderResp ? orderResp.customerName : customerName}
                    </Typography>
                    <Typography sx={{ fontWeight: "600" }}>
                      {defDel.type === "delivery" ? (
                        <span>Delivery</span>
                      ) : qrcode ? (
                        <span>QR Dine-In</span>
                      ) : (
                        <span>Self-Collect</span>
                      )}
                      <span>
                        {" "}
                        [{orderResp ? orderResp.paymentStatus : null}]
                      </span>
                    </Typography>
                  </div>
                  <hr></hr>
                  <div>
                    <Typography sx={{ color: "black" }}>
                      Name:{" "}
                      {auth.user
                        ? `${auth.user?.firstName}" "${auth.user?.lastName}`
                        : customerName}
                    </Typography>
                    {selectedAddress ? (
                      <Typography sx={{ color: "black" }}>
                        <p
                          style={{
                            color: "black",
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
                    <Typography sx={{ color: "black" }}>
                      Mob No: {auth.user?.mobileNumber}
                    </Typography>
                  </div>
                  <hr></hr>
                  <div>
                    <Typography sx={{ color: "black" }}>
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
                      grandTot={orderResp.totalPrice}
                      cgst={orderResp.cgstCalculatedValue}
                      sgst={orderResp.sgstCalculatedValue}
                      overallPriceWithTax={orderResp.overallPriceWithTax}
                      delCharge={delCharge}
                      fullResp={orderResp}
                    ></InvoiceTable>
                  </div>
                </div>
              </div>
            ) : null}
          </Modal.Body>
        ) : null}

        <Modal.Footer>
          <Row className="w-100">
            <Col className="col-6">
              <ReactToPrint
                trigger={() => (
                  <Button
                    color="secondary"
                    //onClick={handleCloseInvoice}
                    className="w-100"
                    variant="contained"
                  >
                    Print
                  </Button>
                )}
                content={() => ref.current}
              />
            </Col>
            <Col className="col-6">
              <Pdf
                targetRef={ref}
                filename="invoice.pdf"
                options={options}
                x={0.8}
              >
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

  const renderFailedPayUModal = () => {
    return (
      <Modal show={showPayUFailed} onHide={closePayUFailed}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Typography>PayU Payment Failed</Typography>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            maxHeight: "75vh",
            overflowY: "auto",
            backgroundColor: "#fff",
          }}
        >
          <div className="text-center">
            <Typography sx={{ fontWeight: "600", color: "red" }}>
              PayU payment failed! Please try again!
            </Typography>
            <Typography sx={{ fontWeight: "600", color: "red" }}>
              ERROR: {queryString.parse(props.location.search).error_Message}
            </Typography>
          </div>
        </Modal.Body>

        <Modal.Footer style={{ backgroundColor: "lightgray" }}>
          <div className="w-100 text-center">
            <Button
              color="primary"
              onClick={closePayUFailed}
              className="w-100"
              variant="contained"
            >
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  };

  const getOrderObj = () => {
    let total =
      subTotal +
      (extraSubTotal ? extraSubTotal : 0) +
      (choiceTotal ? choiceTotal : 0);

    if (
      couponReduxObj &&
      Number(couponReduxObj.couponDetails.discountPercentage)
    ) {
      const afterAddCoupon =
        (100 - Number(couponReduxObj.couponDetails.discountPercentage)) / 100;
      total = total * afterAddCoupon;
    }

    if (allBogoReduceCost) {
      total = total - Number(allBogoReduceCost);
    }

    if (comboReduceKey) {
      total = total - Number(comboReduceKey.reducingCost);
    }

    if (typeof comboOfferReduceKey !== 'undefined' && comboOfferReduceKey && comboOfferReduceKey.length > 0) {
      var reduceCost = 0;
      for (let i = 0; i < comboOfferReduceKey.length; i++) {
        reduceCost = reduceCost + Number(comboOfferReduceKey[i].reducingCost)
      }
      total = total - reduceCost;
    }

    let orderDetails = [];
    const allItems = Object.values(cart?.cartItems);

    for (let i = 0; i < allItems.length; i++) {
      const obj = {
        productId: allItems[i].productId,
        orderId: "EMPTY",
        subProductId: allItems[i].subProductId
          ? allItems[i].subProductId
          : "NAA",
        quantity: allItems[i].qty,
        storeId: allItems[i].storeId,
        price: allItems[i].price,
        remarks: allItems[i].specialText,
        foodPackagedFlag: "N",
      };

      if (
        Object.keys(allItems[i].choiceIng).length > 0 &&
        allItems[i].choiceIng.price
      ) {
        console.log(allItems[i].choiceIng);
        const objCh = {
          productId: allItems[i].productId,
          orderId: "EMPTY",
          subProductId: allItems[i].choiceIng.subProductId
            ? allItems[i].choiceIng.subProductId
            : "NAA",
          quantity: allItems[i].qty ? allItems[i].qty : 1,
          storeId: allItems[i].storeId,
          price: allItems[i].choiceIng.price,
          remarks: allItems[i].choiceIng.specialText
            ? allItems[i].choiceIng.specialText
            : "",
          foodPackagedFlag: "N",
        };
        orderDetails.push(objCh);
      }

      if (Object.keys(allItems[i].extra).length > 0) {
        const allExtra = Object.values(allItems[i].extra);

        for (let k = 0; k < allExtra.length; k++) {
          const objextra = {
            productId: allItems[i].productId,
            orderId: "EMPTY",
            subProductId: allExtra[k].subProductId
              ? allExtra[k].subProductId
              : "NAA",
            quantity: allItems[i].qty ? allItems[i].qty : 1,
            storeId: allItems[i].storeId,
            price: allExtra[k].price,
            remarks: allExtra[k].specialText ? allExtra[k].specialText : "",
            foodPackagedFlag: "N",
          };
          orderDetails.push(objextra);
        }
      }

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
          sgstCalculatedValue = total * (tax.taxPercentage / 100);
        }
      });
    }

    let overallPriceWithTax =
      Number(total) +
      Number(cgstCaluclatedValue.toFixed(2)) +
      Number(sgstCalculatedValue.toFixed(2)) +
      Number(delCharge);

    const NewOrder = {
      id: 0,
      orderId: "EMPTY",
      restaurantId: currentType.restaurantId,
      storeId: currentType.storeId,
      orderSource: currentType.type === "delivery" ? "WD" : qrcode ? "Q" : "WS",
      customerId: auth.user.id || qruserid,
      orderReceivedDateTime: new Date(),
      // orderDeliveryType:
      //   currentType.type === "delivery" ? "WEB DELIVERY" : "WEB SELF COLLECT",
      orderDeliveryType:
        currentType.type === "delivery"
          ? "WEB DELIVERY"
          : qrcode
          ? "SELF DINE IN QR"
          : "WEB SELF COLLECT",
      // storeTableId: null,
      storeTableId: tableId ? tableId : null,
      orderStatus: "SUBMITTED",
      taxRuleId: 1,
      totalPrice: total,
      paymentStatus: paymentStatus,
      paymentMode: currentPaymentType,
      deliveryCharges: Number(delCharge) ? Number(delCharge) : 0,
      customerAddressId: selectedAddress ? selectedAddress.id : null,
      cgstCalculatedValue: cgstCaluclatedValue.toFixed(2),
      sgstCalculatedValue: sgstCalculatedValue.toFixed(2),
      overallPriceWithTax: Math.round(overallPriceWithTax),
      orderDetails: orderDetails,
      // couponCode: couponReduxObj ? couponReduxObj.couponDetails.couponCode : "",
      couponCode: couponReduxObj ? couponReduxObj.couponDetails.couponCode : comboOfferCode,
      discountPercentage: couponReduxObj
        ? couponReduxObj.couponDetails.discountPercentage
        : 0,
    };

    // console.log("aaa neworder", NewOrder);

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

    console.log(NewOrder);

    return NewOrder;
  };

  // {
  //   console.log("aaa disable---1", allAddress);
  // }
  // {
  //   console.log("aaa disable---2", selectedAddress);
  // }
  // {
  //   console.log("aaa disable---3", auth.user.id);
  // }

  return (
    <div>
      <Header></Header>
      <div className="wh-background">
        <CusContainer className="pb-2">
          <Row className="pt-2">
            <Typography
              sx={{
                textAlign: "center",
                marginBottom: "20px",
                color: "#C00000",
                fontWeight: "bold",
              }}
              variant="h4"
              component="h4"
            >
              <span
                style={{
                  width: "10vw",
                  height: "5px",
                  backgroundColor: "#C00000",
                  display: "inline-block",
                  marginBottom: "7px",
                }}
              ></span>{" "}
              CHECKOUT{" "}
              <span
                style={{
                  width: "10vw",
                  height: "5px",
                  backgroundColor: "#C00000",
                  display: "inline-block",
                  marginBottom: "7px",
                }}
              ></span>
            </Typography>
          </Row>
          <Row>
            <Col md={12} lg={4} className="mar-tp-f">
              <Row>
                <Col className="col-12 text-center">
                  <h5 style={{ fontWeight: "bold", color: "#000" }}>
                    VALIDATE YOUR ORDER
                  </h5>
                </Col>
              </Row>
              <div>
                <Card
                  sx={{
                    width: "100%",
                    marginTop: 3,
                    height: "360px",
                    maxHeight: "360px",
                    overflowY: "auto",
                  }}
                >
                  <CardContent sx={{ height: "auto" }}>
                    <CartCard
                      onChangeSubTotal={handleSubTotal}
                      onChangeExtraSubTotal={handleExtraTotal}
                      onChangeChoiceTotal={handleChoiceTotal}
                      bOGOLowestPizzaKey={
                        bOGOLowestPizzaKey ? bOGOLowestPizzaKey : []
                      }
                      onChangeSpecialOfferCheckBOGO={specialOfferCheckBOGO}
                      onChangeSpecialOfferCheckCOMBO1={calculateCOMBOCartCostWithFaiedCode}
                      comboReduceKey={comboReduceKey}
                      comboOfferReduceKey={comboOfferReduceKey}
                      offerPriceToAdd={offerCost}
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
                              Offer cost
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
                              ₹ {offerCost}.00
                            </Typography>
                          </div>
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

                        {couponReduxObj && couponReduxObj.couponDetails ? (
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
                                Coupon Discount
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
                                {renderCouponDiscount()}
                              </Typography>
                            </div>
                          </Row>
                        ) : null}

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

                        {defDel.type === "delivery" ? (
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
                        ) : null}

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

                    <Row className="mt-5">
                      <Col sm={7}>
                        <CusTextField2
                          sx={{ marginTop: "3px" }}
                          label="Coupon Code"
                          value={couponCode}
                          onChange={(event) => {
                            setCouponCode(event.target.value);
                          }}
                          fullWidth
                        />
                      </Col>
                      <Col sm={5}>
                        <Button
                          variant="contained"
                          color="success"
                          sx={{
                            fontSize: "0.75rem",
                            lineHeight: "1rem",
                            padding: "5px 16px",
                          }}
                          onClick={validateCouponCode}
                        >
                          APPLY
                        </Button>
                      </Col>
                    </Row>
                    <div className="text-center mt-2">
                      {couponReduxObj && couponReduxObj.couponDetails ? (
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            color: "#2e7d32",
                            fontSize: "0.9rem",
                          }}
                        >
                          {couponReduxObj.couponDetails.couponCode} Applied!
                          &nbsp;
                          {couponReduxObj.couponDetails.discountPercentage}%
                          Off!
                        </Typography>
                      ) : null}
                    </div>
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
                    <Card
                      sx={{
                        width: "100%",
                        marginTop: 3,
                        height: isMobile ? "" : "360px",
                      }}
                    >
                      <CardContent>
                        <h5
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: "600",
                            fontFamily: "Arial",
                            color: "#595959",
                          }}
                        >
                          {qrcode ? "ORDER SOURCE : " : "DELIVERY TYPE : "}
                          {/* DELIVERY TYPE :{" "} */}
                          {currentType?.type === "delivery" ? (
                            <span>Delivery</span>
                          ) : (
                            <>
                              {qrcode ? (
                                <span>Customer QR Dine In</span>
                              ) : (
                                <span>Self-Collect</span>
                              )}
                            </>
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
                            {tableId ? (
                              <div className="row">
                                <h5
                                  style={{
                                    fontSize: "0.9rem",
                                    fontWeight: "600",
                                    fontFamily: "Arial",
                                    color: "#595959",
                                  }}
                                >
                                  TABLE NO  - {tableId}
                                </h5>
                              </div>
                            ) : null}
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

                              {!qrcode && (
                                <div
                                  className="col-12"
                                  sx={{ textAlign: "end" }}
                                >
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
                              )}
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
            </Col>
            <Col md={12} lg={4} className="mar-tp">
              <Row>
                <Col className="col-12 text-center">
                  <h5 style={{ fontWeight: "bold", color: "#000" }}>
                    PAYMENT MODE
                  </h5>
                </Col>
              </Row>

              <Row>
                <Col className="col-12">
                  <Grid sx={{ width: "100%", marginTop: 3 }}>
                    {!currentPaymentType ? (
                      <Card sx={{ height: "360px" }}>
                        <FormControl sx={{ marginLeft: 3, marginTop: 2 }}>
                          <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={paymentType}
                            onChange={handleChangePaymentType}
                          >
                            <FormControlLabel
                              value="UPI"
                              control={<Radio color="success" />}
                              sx={{
                                border: "2px solid #2e7d32",
                                padding: "5px 0 5px 0",
                                marginTop: "5px",
                              }}
                              label={
                                <div>
                                  <div>
                                    <Typography
                                      sx={{
                                        color: "#595959",
                                        fontSize: "0.9rem",
                                        fontWeight: "600",
                                        fontFamily: "Arial",
                                      }}
                                    >
                                      Payment by UPI{" "}
                                      <span
                                        style={{
                                          color: "#2F5597",
                                          fontStyle: "italic",
                                        }}
                                      >
                                        (Preferred Payment Mode)
                                      </span>
                                    </Typography>
                                  </div>
                                  <img
                                    style={{ width: "100%", marginTop: "10px" }}
                                    src={upiimg}
                                    alt="upi"
                                  ></img>
                                </div>
                              }
                            />

                            <FormControlLabel
                              value="NB"
                              control={<Radio color="success" />}
                              sx={{
                                border: "2px solid #2e7d32",
                                padding: "5px 0 5px 0",
                                marginTop: "5px",
                              }}
                              label={
                                <div>
                                  <div>
                                    <Typography
                                      sx={{
                                        color: "#595959",
                                        fontSize: "0.9rem",
                                        fontWeight: "600",
                                        fontFamily: "Arial",
                                      }}
                                    >
                                      Payment by Net Banking
                                    </Typography>
                                  </div>
                                  <div className="text-center">
                                    <img
                                      style={{
                                        width: "65%",
                                        marginTop: "10px",
                                      }}
                                      src={nbimg}
                                      alt="upi"
                                    ></img>
                                  </div>
                                </div>
                              }
                            />

                            <FormControlLabel
                              value="CARD"
                              control={<Radio color="success" />}
                              sx={{
                                border: "2px solid #2e7d32",
                                padding: "5px 0 5px 0",
                                marginTop: "5px",
                              }}
                              label={
                                <div>
                                  <div>
                                    <Typography
                                      sx={{
                                        color: "#595959",
                                        fontSize: "0.9rem",
                                        fontWeight: "600",
                                        fontFamily: "Arial",
                                      }}
                                    >
                                      Payment by Prepaid, Credit & Debit cards
                                    </Typography>
                                  </div>
                                  <div className="text-center">
                                    <img
                                      style={{
                                        width: "70%",
                                        marginTop: "10px",
                                      }}
                                      src={cardimg}
                                      alt="upi"
                                    ></img>
                                  </div>
                                </div>
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
                            // disabled={paymentType ? false : true}
                            disabled={
                              !paymentType || (!auth.user.id && !qrcode)
                            }
                          >
                            SELECT PAYMENT METHOD
                          </SPMButton>
                        </CardActions>
                      </Card>
                    ) : null}
                    {currentPaymentType && clientPaymentModes === "PAYTM" ? (
                      <Card className="p-3" sx={{ height: "360px" }}>
                        <Row>
                          <Col>
                            <PaytmButton
                              total={Math.round(grandTotalForPayU)}
                              // disabled={
                              //   Object.keys(cart?.cartItems).length > 0 &&
                              //   auth.user.id &&
                              //   currentPaymentType
                              //     ? false
                              //     : true
                              // }
                              disabled={
                                Object.keys(cart?.cartItems).length > 0 &&
                                currentPaymentType &&
                                (qrcode || auth.user.id)
                                  ? false
                                  : true
                              }
                              placeOrder={placeOrder}
                              customerId={auth.user ? auth.user.id : null}
                              payTMMerchantID={payTMMerchantID}
                              payTMSalt={payTMSalt}
                              payTMURL={payTMURL}
                              payTMWebsiteName={payTMWebsiteName}
                              selectedTypeOfPayment={paymentType}
                            ></PaytmButton>
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
                    {/* {console.log(
                      "aaa clientPaymentModes",
                      Object.keys(cart?.cartItems).length,
                      currentPaymentType
                    )} */}
                    {currentPaymentType && clientPaymentModes === "PAYU" ? (
                      <Card className="p-3" sx={{ height: "360px" }}>
                        <Row>
                          <Col>
                            {/* {console.log("aaa disable---1", allAddress)}
                            {console.log("aaa disable---2", selectedAddress)}
                            {console.log("aaa disable---3", auth.user.id)} */}
                            <PayUTest
                              total={grandTotalForPayU}
                              // RD allAddress.length > 0 && selectedAddress && selectedAddress.id Added to control address Pay button disable
                              // disabled={
                              //   allAddress.length > 0 &&
                              //   selectedAddress &&
                              //   selectedAddress.id &&
                              //   Object.keys(cart?.cartItems).length > 0 &&
                              //   auth.user.id &&
                              //   currentPaymentType
                              //     ? false
                              //     : true
                              // }
                              disabled={
                                Object.keys(cart?.cartItems).length > 0 &&
                                currentPaymentType &&
                                (qrcode ||
                                  (allAddress.length > 0 &&
                                    selectedAddress &&
                                    selectedAddress.id &&
                                    auth.user.id))
                                  ? false
                                  : true
                              }
                              placeOrder={placeOrder}
                              cgstCalculatedValue={calcValues}
                              sgstCalculatedValue={calcValues}
                              deliveryCharges={
                                Number(delCharge) ? Number(delCharge) : 0
                              }
                              discountPercentage={
                                couponReduxObj
                                  ? couponReduxObj.couponDetails
                                      .discountPercentage
                                  : 0
                              }
                              overallPriceWithTax={calcValues}
                              defTotal={calcValues}
                              restaurantId={currentType.restaurantId}
                              storeId={currentType.storeId}
                              customerId={auth.user ? auth.user.id : null}
                              getOrderObj={getOrderObj}
                              selectedTypeOfPayment={paymentType}
                            ></PayUTest>
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
                      <Card className="p-3" sx={{ height: "360px" }}>
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
                      <Card className="p-3" sx={{ height: "360px" }}>
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
          <div className="w-100 text-center">
            {currentType?.type === "delivery" && (
              <Typography sx={{ color: "#595959" }}>
                <b>Note</b> - Delivery is made within 3 km of Store address
              </Typography>
            )}
            <Typography sx={{ color: "#595959" }}>
              <b>T&C Apply:- If order is placed it is non refundable*</b>
            </Typography>
          </div>
          {currentPaymentType === "COD" || currentPaymentType === "CASH" ? (
            <Row>
              <Col className="text-center p-3">
                {currentType?.type === "delivery" ? (
                  <POButton
                    onClick={placeOrder}
                    variant="contained"
                    disabled={
                      selectedAddress &&
                      Object.keys(cart?.cartItems).length > 0 &&
                      auth.user.id &&
                      currentPaymentType
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
                      Object.keys(cart?.cartItems).length > 0 &&
                      auth.user.id &&
                      currentPaymentType
                        ? false
                        : true
                    }
                  >
                    PLACE ORDER
                  </POButton>
                )}
              </Col>
            </Row>
          ) : null}

          {/* <Row>
            {!auth.user.id ? (
              <Alert severity="error">
                Please login before placing the order!
              </Alert>
            ) : null}
          </Row> */}
          {/* {console.log("aaa--------auth.user.id", auth.user.id)} */}
          {/* {console.log("aaa--------qrcode", qrcode)} */}

          <Row>
            {!auth.user.id && !qrcode && (
              <Alert severity="error">
                Please login before placing the order!
              </Alert>
            )}
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
      {renderFailedPayUModal()}
      {isMobile ? <BottomNav onChangeTab={handleNavTab}></BottomNav> : null}
    </div>
  );
}
