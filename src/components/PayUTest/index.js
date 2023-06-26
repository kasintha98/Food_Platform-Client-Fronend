import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { v5 as uuidv5 } from "uuid";
import { apiPayULocal, api } from "../../urlConfig";

var sha512 = require("js-sha512").sha512;
var jwt = require("jsonwebtoken");
require("dotenv").config();

export const PayUTest = (props) => {
  console.log("aaa payu props", props);
  const auth = useSelector((state) => state.auth);
  const payUURL = useSelector((state) => state.user.payUURL);
  const payUMerchantID = useSelector((state) => state.user.payUMerchantID);
  const payUSalt = useSelector((state) => state.user.payUSalt);
  var qruser = {};

  if(JSON.parse(localStorage.getItem("qr")) == null){
    qruser = {
      mobile: "",
      name: "Guest",
      userid: "Guest",
      addressid: "Guest",
    };
  }else{
    qruser = JSON.parse(localStorage.getItem("qr"));
  }
  // const qruser = JSON.parse(localStorage.getItem("qr"));
  console.log("aaa diable", props.disabled);

  // const firstName = auth.user?.firstName || "kavindu";
  const email = auth.user?.emailId || `${qruser.name}@gmail.com`;
  const firstName = auth.user?.firstName || qruser.name.toString();
  // const email = auth.user?.emailId || "abc@gmail.com";
  // const firstName = auth.user?.firstName || "shyamal";
  // const email = auth.user?.emailId || "shyamal@serendibsystems.com";

  const [hashed, setHashed] = useState("");
  const [txnUID, setTxnUID] = useState(
    uuidv5(
      JSON.stringify({
        customerId: props.customerId == "" ? 227 : props.customerId,
        cgstCalculatedValue: props.cgstCalculatedValue("cgst"),
        sgstCalculatedValue: props.sgstCalculatedValue("sgst"),
        deliveryCharges: props.deliveryCharges,
        discountPercentage: props.discountPercentage,
        overallPriceWithTax: props.overallPriceWithTax("over"),
        total: props.defTotal("total"),
        restaurantId: props.restaurantId,
        storeId: props.storeId,
        time: new Date().getTime(),
      }),
      "0050ae36-4343-11ed-b878-0242ac120002"
    ) + new Date().getTime()
  );
  const [hashedOrderObj, setHashedOrderObj] = useState(
    jwt.sign(
      {
        ...props.getOrderObj(),
        paymentTxnReference: txnUID,
        paymentStatus: "PAID",
      },
      "burgersecret"
    )
  );

  // useEffect(() => {
  //   console.log("aaa hashedOrderObj", hashedOrderObj);
  //   console.log("aaa Selected PayU Option: " + props.selectedTypeOfPayment);
  //   var hashString =
  //     `${payUMerchantID}` +
  //     "|" +
  //     `${txnUID}` +
  //     "|" +
  //     `${props.total}` +
  //     "|" +
  //     "Hangries Food Items" +
  //     "|" +
  //     `${auth.user?.firstName}` +
  //     "|" +
  //     `${auth.user?.emailId}` +
  //     "|" +
  //     "||||||||||" +
  //     `${payUSalt}`; // Your salt value
  //   console.log("aaa hashString", hashString);
  //   var hashed = sha512(hashString);
  //   setHashed(hashed);
  // }, [props.total]);

  useEffect(() => {
    console.log("aaa hashedOrderObj", hashedOrderObj);
    console.log("aaa Selected PayU Option: " + props.selectedTypeOfPayment);
    var hashString =
      `${payUMerchantID}` +
      "|" +
      `${txnUID}` +
      "|" +
      `${props.total}` +
      "|" +
      "Hangries Food Items" +
      "|" +
      `${firstName}` +
      "|" +
      `${email}` +
      "|" +
      "||||||||||" +
      `${payUSalt}`; // Your salt value
    console.log("aaa hashString", hashString);
    var hashed = sha512(hashString);
    setHashed(hashed);
  }, [props.total]);

  const saveOrderFromBackend = (e) => {
    // localStorage.setItem("transactionDone", ""); -- BLANK SCREEN COMMENTED
    e.preventDefault();
    try {
      setTimeout(function () {
        document.getElementById("payuForm").submit();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const saveOrderFromBackendPayTM = (e) => {
    e.preventDefault();
    try {
      setTimeout(function () {
        document.getElementById("payuFormPayTM").submit();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {console.log("aaa prps.disable", props.disabled)}
      <form action={payUURL} method="POST" id="payuForm">
        <input type="hidden" name="key" defaultValue={payUMerchantID} />
        <input type="hidden" name="txnid" defaultValue={txnUID} />
        <input
          type="hidden"
          name="productinfo"
          defaultValue="Hangries Food Items"
        />
        <input type="hidden" name="amount" defaultValue={props.total} />
        <input
          type="hidden"
          name="email"
          defaultValue={auth.user?.emailId || `${qruser.name}@gmail.com`}
        />
        <input
          type="hidden"
          name="firstname"
          defaultValue={auth.user?.firstName || qruser.name.toString()}
        />
        <input
          type="hidden"
          name="lastname"
          defaultValue={auth.user?.lastName || "shyamal"}
        />
        <input
          type="hidden"
          name="surl"
          defaultValue={`${api}/savePayUResponseSuccess?token=${hashedOrderObj}`}
          // defaultValue={`${apiPayULocal}/savePayUResponseSuccess?token=${hashedOrderObj}`}
        />
        <input
          type="hidden"
          name="furl"
          defaultValue={`${api}/savePayUResponseFailure`}
          // defaultValue={`${apiPayULocal}/savePayUResponseFailure`}
        />
        <input
          type="hidden"
          name="phone"
          defaultValue={auth.user?.mobileNumber || "+94713873540"}
        />
        <input
          type="hidden"
          name="enforce_paymethod"
          defaultValue="creditcard|debitcard|netbanking|upi"
        />
        <input type="hidden" name="drop_category" defaultValue="CASH" />
        <input type="hidden" name="hash" defaultValue={hashed} />
        <button
          className="btn btn-primary w-100"
          disabled={props.disabled}
          onClick={(e) => {
            saveOrderFromBackend(e);
          }}
        >
          Pay Now!
        </button>
      </form>

      <br></br>

      {/* PayTm form */}

      {/* <form action={payUURL} method="POST" id="payuFormPayTM">
        <input type="hidden" name="key" defaultValue={payUMerchantID} />
        <input type="hidden" name="txnid" defaultValue={txnUID} />
        <input
          type="hidden"
          name="productinfo"
          defaultValue="Hangries Food Items"
        />
        <input type="hidden" name="amount" defaultValue={props.total} />
        <input type="hidden" name="email" defaultValue={auth.user?.emailId} />
        <input
          type="hidden"
          name="firstname"
          defaultValue={auth.user?.firstName}
        />
        <input
          type="hidden"
          name="lastname"
          defaultValue={auth.user?.lastName}
        />
        <input
          type="hidden"
          name="surl"
          defaultValue={`${api}/savePayUResponseSuccess?token=${hashedOrderObj}`}
        />
        <input
          type="hidden"
          name="furl"
          defaultValue={`${api}/savePayUResponseFailure`}
        />
        <input
          type="hidden"
          name="phone"
          defaultValue={auth.user?.mobileNumber}
        />
        <input type="hidden" name="pg" defaultValue="CASH" />
        <input type="hidden" name="bankcode" defaultValue="PAYTM" />
        <input
          type="hidden"
          name="enforce_paymethod"
          defaultValue="creditcard|debitcard|netbanking|upi|PayTM"
        />
        <input
          type="hidden"
          name="drop_category"
          defaultValue="UPI|googlepay"
        />
        <input type="hidden" name="hash" defaultValue={hashed} />
        <button
          className="btn btn-primary w-100"
          disabled={props.disabled}
          onClick={(e) => {
            saveOrderFromBackendPayTM(e);
          }}
        >
          Pay With PayTM
        </button>
      </form> */}
    </div>
  );
};
