import React, { useState } from "react";
import { useSelector } from "react-redux";

var sha512 = require("js-sha512").sha512;

export const PayUTest = (props) => {
  const auth = useSelector((state) => state.auth);

  const [hashed, setHashed] = useState("");
  const [txnid, setTxnid] = useState("");
  const [total, setTotal] = useState(0);

  const saveOrder = (e) => {
    e.preventDefault();
    try {
      getSavedOrder();

      setTimeout(function () {
        document.getElementById("payuForm").submit();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const getSavedOrder = async () => {
    const savedOrder = await props.placeOrder();
    setTxnid(savedOrder.orderId);
    setTotal(savedOrder.overallPriceWithTax);
    var hashString =
      "JPM7Fg" +
      "|" +
      `${savedOrder.orderId}` +
      "|" +
      `${savedOrder.overallPriceWithTax}` +
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
  };

  return (
    <div>
      <form
        target="_blank"
        action="https://test.payu.in/_payment"
        method="post"
        id="payuForm"
      >
        <input type="hidden" name="key" defaultValue="JPM7Fg" />
        <input type="hidden" name="txnid" defaultValue={txnid} />
        <input
          type="hidden"
          name="productinfo"
          defaultValue="Hangries Food Items"
        />
        <input type="hidden" name="amount" defaultValue={total} />
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
          defaultValue="http://localhost:5080/new-checkout#s"
        />
        <input
          type="hidden"
          name="furl"
          defaultValue="http://localhost:5080/new-checkout#f"
        />
        <input
          type="hidden"
          name="phone"
          defaultValue={auth.user?.mobileNumber}
        />
        <input type="hidden" name="hash" defaultValue={hashed} />
        <button
          className="btn btn-primary w-100"
          disabled={props.disabled}
          onClick={(e) => {
            saveOrder(e);
          }}
        >
          Pay With PayU
        </button>
        {/* <input
          type="submit"
          defaultValue="submit"
          value="Pay With PayU"
          className="btn btn-primary w-100"
          disabled={props.disabled}
        /> */}
      </form>
    </div>
  );
};
