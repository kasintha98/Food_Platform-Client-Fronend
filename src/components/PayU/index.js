import React from "react";
import Button from "@mui/material/Button";

export const PayU = () => {
  const base_url = "";

  const payumoney = () => {
    try {
      console.log("aa");
      //Create a Data object that is to be passed to LAUNCH method of Bolt
      var pd = {
        key: "",
        txnid: "",
        amount: "",
        firstname: "",
        email: "",
        phone: "",
        productinfo: "",
        surl: "",
        furl: "",
        hash: "",
      };
      // Data to be Sent to API to generate hash.
      let data = {
        txnid: pd.txnid,
        email: pd.email,
        amount: pd.amount,
        productinfo: pd.productinfo,
        firstname: pd.firstname,
      };

      // API call to get the Hash value
      fetch(base_url + "payment/payumoney", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(function (a) {
          return a.json();
        })
        .then(function (json) {
          pd.hash = json["hash"];
          //  With the hash value in response, we are ready to launch the bolt overlay.
          //Function to launch BOLT
          redirectToPayU(pd);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const redirectToPayU = (pd) => {
    try {
      //use window.bolt.launch if you face an error in bolt.launch
      window.bolt.launch(pd, {
        responseHandler: function (response) {
          // your payment response Code goes here
          fetch(base_url + "payment/payumoney/response", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response.response),
          })
            .then(function (a) {
              return a.json();
            })
            .then(function (json) {
              console.log(json);
            });
        },
        catchException: function (response) {
          // the code you use to handle the integration errors goes here
          // Make any UI changes to convey the error to the user
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button onClick={payumoney} variant="contained" color="primary">
        Pay with PayU Now!
      </Button>
    </div>
  );
};
