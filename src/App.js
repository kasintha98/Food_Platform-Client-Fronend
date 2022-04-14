import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn, updateCart, getAllStores } from "./actions";
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

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    console.log("App.js - updateCart");
    dispatch(updateCart());
    dispatch(getAllStores());
  }, [auth.authenticate]);

  useEffect(() => {
    console.log("App.js - get stores");
    dispatch(getAllStores());
  },[]);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/new-menu" exact component={NewMenu} />
          <Route path="/my-orders" exact component={MyOrders} />
          <Route path="/new-checkout" exact component={NewCheckout} />
          <Route path="/new-cart" component={NewCartPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/bill" exact component={PdfPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/profile" exact component={ProfilePage} />
          <Route path="/signupuser" exact component={SignupPage} />
          <Route path="/reset-password" component={ResetPasswordPage} />
          <Route path="/profile/orders" component={OrderPage} />
          <Route path="/category/:slug" exact component={ProductListPage} />
          <Route path="/product/:slug" component={ProductPage} />
          <Route
            path="/change-password/:token"
            component={ChangePasswordPage}
          />

          <Route
            path="/profile/orderDetails/:orderId"
            component={OrderDetailsPage}
          />
        </Switch>
      </Router>
      <DeliveryTypeModal delay={5000}></DeliveryTypeModal>
    </div>
  );
}

export default App;
