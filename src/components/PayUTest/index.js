import React from "react";
const fetch = require("node-fetch");
/* var sha512 = require("js-sha512").sha512; */

export const PayUTest = () => {
  const encodedParams = new URLSearchParams();
  encodedParams.set("key", "JPM7Fg");
  encodedParams.set("amount", "10");
  encodedParams.set("txnid", "t6svtqtjRdl4wm");
  encodedParams.set("firstname", "Ashish");
  encodedParams.set("lastname", "Kumar");
  encodedParams.set("email", "test@gmail.com");
  encodedParams.set("phone", "9988776655");
  encodedParams.set("productinfo", "iPhone");
  encodedParams.set("surl", "http://localhost:5080/new-checkout#s");
  encodedParams.set("furl", "http://localhost:5080/new-checkout#f");
  /*  encodedParams.set("pg", "");
  encodedParams.set("bankcode", "");
  encodedParams.set("ccnum", "");
  encodedParams.set("ccexpmon", "");
  encodedParams.set("ccexpyr", "");
  encodedParams.set("ccvv", "");
  encodedParams.set("ccname", "");
  encodedParams.set("txn_s2s_flow", ""); */
  encodedParams.set(
    "hash",
    "f755540202b0e2194a13893140beb2f93d8d1860b22ea553620a474f2b7f1a60144aec0bbada96048f82e508e0f5bf97abf2d267d51f16dd46dead8fbd811c5d"
  );
  const url = "https://test.payu.in/_payment";
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: encodedParams,
  };

  const pay = () => {
    try {
      fetch(url, options)
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.error("error:" + err));

      /* sha512(JPM7Fg|t6svtqtjRdl4wm|10|iPhone|Ashish|test@gmail.com|||||||||||TuxqAugd); */
      var hashString =
        "JPM7Fg" +
        "|" +
        "t6svtqtjRdl4wm" +
        "|" +
        10 +
        "|" +
        "iPhone" +
        "|" +
        "Ashish" +
        "|" +
        "test@gmail.com" +
        "|" +
        "||||||||||" +
        "TuxqAugd"; // Your salt value

      /* var hashed = sha512(hashString); */
      /* console.log(hashed); */
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={pay}>Pay P</button>
      <form action="https://test.payu.in/_payment" method="post">
        <input type="hidden" name="key" defaultValue="JPM7Fg" />
        <input type="hidden" name="txnid" defaultValue="t6svtqtjRdl4wm" />
        <input type="hidden" name="productinfo" defaultValue="iPhone" />
        <input type="hidden" name="amount" defaultValue={10} />
        <input type="hidden" name="email" defaultValue="test@gmail.com" />
        <input type="hidden" name="firstname" defaultValue="Ashish" />
        <input type="hidden" name="lastname" defaultValue="Kumar" />
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
        <input type="hidden" name="phone" defaultValue={9988776655} />
        <input
          type="hidden"
          name="hash"
          defaultValue="a0680012f27ca191dff75e1e432869ea1fcc127e28634b60d9a98c4329625c5eca694bab0528981d726cc4dd474c2adf4c99e1a9481986560873d3d6c0c62625"
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
