import React from "react";
const fetch = require("node-fetch");

export const PayUTest = () => {
  const encodedParams = new URLSearchParams();
  encodedParams.set("key", "JP***g");
  encodedParams.set("amount", "10.00");
  encodedParams.set("txnid", "WCoYPvLnlu1xBb");
  encodedParams.set("firstname", "PayU User");
  encodedParams.set("email", "test@gmail.com");
  encodedParams.set("phone", "9876543210");
  encodedParams.set("productinfo", "iPhone");
  encodedParams.set("surl", "http://localhost:3000/new-checkout#suc");
  encodedParams.set("furl", "http://localhost:3000/new-checkout");
  encodedParams.set("pg", "");
  encodedParams.set("bankcode", "");
  encodedParams.set("ccnum", "");
  encodedParams.set("ccexpmon", "");
  encodedParams.set("ccexpyr", "");
  encodedParams.set("ccvv", "");
  encodedParams.set("ccname", "");
  encodedParams.set("txn_s2s_flow", "");
  encodedParams.set(
    "hash",
    "9ff3a81d7e3a33a27c7c3faa94eea2994066c4232e9f6d091b8b576e101c690c3713b5438eca36622171165f4a445c2f25da1879b5367a54f91fd5980b6e65e2"
  );
  const url = "https://test.payu.in/merchant/_payment";
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: encodedParams,
  };

  const pay = () => {
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error("error:" + err));
  };

  return (
    <div>
      {/* <button onClick={pay}>Pay</button> */}
      <form action="https://test.payu.in/_payment" method="post">
        <input type="hidden" name="key" defaultValue="JPM7Fg" />
        <input type="hidden" name="txnid" defaultValue="t6svtqtjRdl4ws" />
        <input type="hidden" name="productinfo" defaultValue="iPhone" />
        <input type="hidden" name="amount" defaultValue={10} />
        <input type="hidden" name="email" defaultValue="test@gmail.com" />
        <input type="hidden" name="firstname" defaultValue="Ashish" />
        <input type="hidden" name="lastname" defaultValue="Kumar" />
        <input
          type="hidden"
          name="surl"
          defaultValue="http://localhost:3000/new-checkout#s"
        />
        <input
          type="hidden"
          name="furl"
          defaultValue="http://localhost:3000/new-checkout#f"
        />
        <input type="hidden" name="phone" defaultValue={9988776655} />
        <input
          type="hidden"
          name="hash"
          defaultValue="eabec285da28fd0e3054d41a4d24fe9f7599c9d0b66646f7a9984303fd6124044b6206daf831e9a8bda28a6200d318293a13d6c193109b60bd4b4f8b09c90972"
        />
        <input
          type="submit"
          defaultValue="submit"
          value="Pay With PayU"
          className="btn btn-primary w-100"
        />{" "}
      </form>
    </div>
  );
};
