import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isUserLoggedIn,
  updateCart,
  getAllStores,
  setDeliveryType,
  getVersion,
  getClientPaymentModes,
  getPayTMUrl,
  getPayTMMerchantID,
  getPayTMSalt,
  getPayTMWSebsiteName,
  getOffersByStatusCall,
} from "./actions";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./containers/HomePage";
import NewMenu from "./containers/NewMenu";
import NewCheckout from "./containers/NewCheckout";
import { NewCartPage } from "./containers/NewCartPage";
import { DeliveryTypeModal } from "./components/DeliveryTypeModal";
import { MyOrders } from "./containers/MyOrders";
import { GPSTracker } from "./containers/GPSTracker";
import { CloudError } from "./containers/CloudError";
import { LoadingPage } from "./containers/LoadingPage";
// import { useLocation } from "react-router-dom";
import ReactGA from 'react-ga';

ReactGA.initialize('G-5WZE2ZP5RN');

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const stores = useSelector((state) => state.store.stores);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    console.log("App.js - updateCart");
    dispatch(updateCart());
    dispatch(getAllStores());
    dispatch(getVersion());
    dispatch(getClientPaymentModes("R001"));
    dispatch(getPayTMUrl("R001"));
    dispatch(getPayTMMerchantID("R001")).then((mid) => {
      dispatch(getPayTMUrl("R001")).then((url) => {
        document.getElementById(
          "paytmpgsrc"
        ).src = `https://${url}/merchantpgpui/checkoutjs/merchants/${mid}.js`;
      });
    });
    dispatch(getPayTMSalt("R001"));
    dispatch(getOffersByStatusCall("R001","S001"));
    dispatch(getPayTMWSebsiteName("R001"));

    const delItem = localStorage.getItem("deliveryType");

    if (delItem) {
      const delObj = JSON.parse(delItem);
      dispatch(setDeliveryType(delObj));
    }

    console.log("App.js - get stores");

    dispatch(getAllStores()).then((res) => {
      // console.log("aaa res", res);
      if (res) {
        setShow(true);
      }
    });

    const time = localStorage.getItem("otpTime");
    if (time) {
      localStorage.setItem("otpTime", 90);
    }
  }, [auth.authenticate]);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route
            path="/new-menu"
            exact
            component={stores && stores.length > 0 ? NewMenu : CloudError}
          />
          <Route
            path="/gps"
            exact
            component={stores && stores.length > 0 ? GPSTracker : CloudError}
          />
          <Route
            path="/my-orders"
            exact
            component={stores && stores.length > 0 ? MyOrders : CloudError}
          />
          <Route
            path="/new-checkout"
            exact
            component={stores && stores.length > 0 ? NewCheckout : LoadingPage}
          />
          <Route
            path="/new-cart"
            component={stores && stores.length > 0 ? NewCartPage : CloudError}
          />
        </Switch>
      </Router>
      {/* {show ? <DeliveryTypeModal delay={0}></DeliveryTypeModal> : null} */}
      {/* {true ? <DeliveryTypeModal delay={0}></DeliveryTypeModal> : null} */}
      {/* {<DeliveryTypeModal delay={0}></DeliveryTypeModal>} */}
    </div>
  );
}

export default App;
