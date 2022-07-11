import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isUserLoggedIn,
  updateCart,
  getAllStores,
  setDeliveryType,
  getVersion,
} from "./actions";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductListPage from "./containers/ProductListPage";
import ProductPage from "./containers/ProductPage";
import HomePage from "./containers/HomePage";
import CartPage from "./containers/CartPage";
import CheckoutPage from "./containers/CheckoutPage";
import ProfilePage from "./containers/ProfilePage";
import OrderPage from "./containers/OrderPage";
import ResetPasswordPage from "./containers/ResetPasswordPage";
import ChangePasswordPage from "./containers/ChangePasswordPage";
import OrderDetailsPage from "./containers/OrderDetailsPage";
import SignupPage from "./containers/SignupPage";
import PdfPage from "./containers/PdfPage";
import NewMenu from "./containers/NewMenu";
import NewCheckout from "./containers/NewCheckout";
import { NewCartPage } from "./containers/NewCartPage";
import { DeliveryTypeModal } from "./components/DeliveryTypeModal";
import { MyOrders } from "./containers/MyOrders";
import { GPSTracker } from "./containers/GPSTracker";
import ReactSession from "react-client-session";
import { CloudError } from "./containers/CloudError";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
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

    const delItem = localStorage.getItem("deliveryType");

    if (delItem) {
      const delObj = JSON.parse(delItem);
      dispatch(setDeliveryType(delObj));
    }

    console.log("App.js - get stores");

    dispatch(getAllStores()).then((res) => {
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
          <Route path="/error" exact component={CloudError} />
          <PrivateRoute path="/new-menu" exact component={NewMenu} />
          <PrivateRoute path="/gps" exact component={GPSTracker} />
          <PrivateRoute path="/my-orders" exact component={MyOrders} />
          <PrivateRoute path="/new-checkout" exact component={NewCheckout} />
          <PrivateRoute path="/new-cart" component={NewCartPage} />
          <PrivateRoute path="/cart" component={CartPage} />
          <PrivateRoute path="/bill" exact component={PdfPage} />
          <PrivateRoute path="/checkout" component={CheckoutPage} />
          <PrivateRoute path="/profile" exact component={ProfilePage} />
          <PrivateRoute path="/signupuser" exact component={SignupPage} />
          <PrivateRoute path="/reset-password" component={ResetPasswordPage} />
          <PrivateRoute path="/profile/orders" component={OrderPage} />
          <PrivateRoute
            path="/category/:slug"
            exact
            component={ProductListPage}
          />
          <PrivateRoute path="/product/:slug" component={ProductPage} />
          <PrivateRoute
            path="/change-password/:token"
            component={ChangePasswordPage}
          />

          <PrivateRoute
            path="/profile/orderDetails/:orderId"
            component={OrderDetailsPage}
          />
        </Switch>
      </Router>
      {show ? <DeliveryTypeModal delay={0}></DeliveryTypeModal> : null}
    </div>
  );
}

export default App;
