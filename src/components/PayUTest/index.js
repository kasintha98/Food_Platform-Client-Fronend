import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

var sha512 = require("js-sha512").sha512;
var jwt = require("jsonwebtoken");

export const PayUTest = (props) => {
  const auth = useSelector((state) => state.auth);

  const [hashed, setHashed] = useState("");
  const [txnUID, setTxnUID] = useState(uuidv4());
  const [hashedOrderObj, setHashedOrderObj] = useState(
    jwt.sign(
      {
        txnUID,
        cgstCalculatedValue: props.cgstCalculatedValue("cgst"),
        sgstCalculatedValue: props.sgstCalculatedValue("sgst"),
        deliveryCharges: props.deliveryCharges,
        discountPercentage: props.discountPercentage,
        overallPriceWithTax: props.overallPriceWithTax("over"),
        total: props.defTotal("total"),
        restaurantId: props.restaurantId,
        storeId: props.storeId,
        time: new Date().getTime(),
      },
      "burgersecret"
    )
  );
  /* const [txnid, setTxnid] = useState("");
  const [total, setTotal] = useState(0); */

  /* const saveOrderFromFrontEnd = (e) => {
    e.preventDefault();
    try {
      getSavedOrder();

      setTimeout(function () {
        document.getElementById("payuForm").submit();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }; */

  /* const getSavedOrder =  () => {
    props.placeOrder().then((res) => {
      if (res) {
        setTxnid(res.orderId);
        setTotal(res.overallPriceWithTax);
        var hashString =
          "JPM7Fg" +
          "|" +
          `${res.orderId}` +
          "|" +
          `${res.overallPriceWithTax}` +
          "|" +
          "Hangries Food Items" +
          "|" +
          `${auth.user?.firstName}` +
          "|" +
          `${auth.user?.emailId}` +
          "|" +
          "||||||||||" +
          "TuxqAugd"; // Your salt value
        var hashed = sha512(hashString);
        setHashed(hashed);
        return true;
      }
    });
  }; */

  //const txnUID = uuidv4();

  useEffect(() => {
    /* console.log({
      cgstCalculatedValue: props.cgstCalculatedValue("cgst"),
      sgstCalculatedValue: props.sgstCalculatedValue("sgst"),
      deliveryCharges: props.deliveryCharges,
      discountPercentage: props.discountPercentage,
      overallPriceWithTax: props.overallPriceWithTax("over"),
    }); */
    var hashString =
      "JPM7Fg" +
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
      "TuxqAugd"; // Your salt value
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

  return (
    <div>
      <form action="https://test.payu.in/_payment" method="POST" id="payuForm">
        <input type="hidden" name="key" defaultValue="JPM7Fg" />
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
          defaultValue={`http://localhost:5080/new-checkout?page=success&token=${hashedOrderObj}`}
        />
        <input
          type="hidden"
          name="furl"
          defaultValue="http://localhost:5080/new-checkout?page=failed"
        />
        <input
          type="hidden"
          name="phone"
          defaultValue={auth.user?.mobileNumber}
        />
        <input type="hidden" name="field1" defaultValue="KasiTest" />
        <input type="hidden" name="drop_category" defaultValue="NB|EMI|CASH" />
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
    </div>
  );
};
