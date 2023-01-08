import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { v5 as uuidv5 } from "uuid";
import { apiPayULocal, api } from "../../urlConfig";

var sha512 = require("js-sha512").sha512;
var jwt = require("jsonwebtoken");
require("dotenv").config();

export const PayUTest = (props) => {
  const auth = useSelector((state) => state.auth);
  const payUURL = useSelector((state) => state.user.payUURL);
  const payUMerchantID = useSelector((state) => state.user.payUMerchantID);
  const payUSalt = useSelector((state) => state.user.payUSalt);

  const [hashed, setHashed] = useState("");
  const [txnUID, setTxnUID] = useState(
    uuidv5(
      JSON.stringify({
        customerId: props.customerId,
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
    )
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

  useEffect(() => {
    console.log(hashedOrderObj);
    console.log("Selected PayU Option: " + props.selectedTypeOfPayment);
    var hashString =
      `${payUMerchantID}` +
      "|" +
      `${txnUID}` +
      "|" +
      `${props.total}` +
      "|" +
      "Hangries Food Items" +
      "|" +
      `${auth.user?.firstName}` +
      "|" +
      `${auth.user?.emailId}` +
      "|" +
      "||||||||||" +
      `${payUSalt}`; // Your salt value
    var hashed = sha512(hashString);
    setHashed(hashed);
  }, [props.total]);

  const saveOrderFromBackend = (e) => {
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
      <form action={payUURL} method="POST" id="payuForm">
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
        <input
          type="hidden"
          name="enforce_paymethod"
          defaultValue="creditcard|debitcard|netbanking"
        />
        <input
          type="hidden"
          name="drop_category"
          defaultValue="CASH,UPI"
        />
        <input type="hidden" name="hash" defaultValue={hashed} />
        <button
          className="btn btn-primary w-100"
          disabled={props.disabled}
          onClick={(e) => {
            saveOrderFromBackend(e);
          }}
        >
          Pay With PayU
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
