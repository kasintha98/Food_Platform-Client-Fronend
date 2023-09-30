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
  getAllStores2,
  getActiveCSS,
  getActiveCssLogo,
  getAllActiveCSS,
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
import ReactGA from "react-ga4";


// ReactGA.initialize("G-VEB7MD19H9");

// ReactGA.initialize('G-5WZE2ZP5RN'); ----- ClientID
  // ReactGA.initialize('G-VEB7MD19H9'); //-------- DEV ID

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const stores = useSelector((state) => state.store.stores);
  const [show, setShow] = useState(false);

  var restId = '';

  useEffect(() => {
    const domain =  window.location.host;
    console.log("DOMAIN NAME First Method ==== ", domain);
    window.domainName = domain;

    if(window.domainName == "hungry-point.in"){
      console.log("Restaurant Selected @ hungry-point.in 1==== R002");
      window.restId = 'R002';
      restId = 'R002';
      ReactGA.initialize("G-VMBQ5KGFJK");
    }else if(window.domainName == "hangries.in"){
      console.log("Restaurant Selected @ hangries.in 1==== R001");
      window.restId = 'R001';
      restId = 'R001';
      ReactGA.initialize("G-VEB7MD19H9");
    }else{
      console.log("Restaurant Selected @ else loop 1==== R001");
      window.restId = 'R001';
      restId = 'R001'
    }
  },[]);

  useEffect(() => {

    const domain =  window.location.host;
    console.log("DOMAIN NAME Second Method ==== ", domain);
    window.domainName = domain;

    if(window.domainName == "hungry-point.in"){
      console.log("Restaurant Selected @ hungry-point.in 2==== R002");
      window.restId = 'R002';
      restId = 'R002';
    }else if(window.domainName == "hangries.in"){
      console.log("Restaurant Selected @ hangries.in 2==== R001");
      window.restId = 'R001';
      restId = 'R001';
    }else{
      console.log("Restaurant Selected @ else loop 2==== R001");
      window.restId = 'R001';
      restId = 'R001'
    }
    
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }

  }, [auth.authenticate]);

  useEffect(() => {
    console.log("App.js - updateCart");
    dispatch(updateCart());
    dispatch(getAllStores2(window.restId));
    dispatch(getVersion(window.restId));
    dispatch(getClientPaymentModes(window.restId));
    dispatch(getPayTMUrl(window.restId));
    dispatch(getPayTMMerchantID(window.restId)).then((mid) => {
      dispatch(getPayTMUrl(window.restId)).then((url) => {
        document.getElementById(
          "paytmpgsrc"
        ).src = `https://${url}/merchantpgpui/checkoutjs/merchants/${mid}.js`;
      });
    });
    dispatch(getPayTMSalt(window.restId));
    dispatch(getOffersByStatusCall(window.restId,"S001"));
    dispatch(getPayTMWSebsiteName(window.restId));

    dispatch(getActiveCSS(restId , "ALL", "HOME", "Banner"));
    dispatch(getActiveCssLogo(restId , "ALL", "HOME", "Logo"));
    dispatch(getAllActiveCSS(restId , "ALL"));
    

    const delItem = localStorage.getItem("deliveryType");

    if (delItem) {
      const delObj = JSON.parse(delItem);
      dispatch(setDeliveryType(delObj));
    }

    console.log("App.js - get stores");

    dispatch(getAllStores2(window.restId)).then((res) => {
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
