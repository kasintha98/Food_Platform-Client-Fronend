import React from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CartNum from "../UI/CartNum";
import { useSelector } from "react-redux";

export const BottomNav = (props) => {
  const pathname = window.location.pathname;
  const [value, setValue] = React.useState(pathname);

  const cart = useSelector((state) => state.cart);

  return (
    <div>
      <Paper
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 6,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            //props.onChangeTab(newValue);
          }}
        >
          <BottomNavigationAction
            component={Link}
            to="/"
            label="Home"
            value="/"
            icon={<HomeIcon />}
          />

          <BottomNavigationAction
            component={Link}
            to="/new-cart"
            label="Cart"
            value="/new-cart"
            icon={
              <>
                {Object.keys(cart.cartItems).length > 0 ? (
                  <CartNum
                    count={Object.keys(cart.cartItems).length}
                    bottom={true}
                  ></CartNum>
                ) : (
                  <CartNum count={0} bottom={true}></CartNum>
                )}{" "}
                <ShoppingCartIcon />
              </>
            }
          />
          <BottomNavigationAction
            component={Link}
            to="/new-menu"
            label="Menu"
            value="/new-menu"
            icon={<RestaurantMenuIcon />}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
};
