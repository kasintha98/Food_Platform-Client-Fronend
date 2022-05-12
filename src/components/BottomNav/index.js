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
import { NavHashLink } from "react-router-hash-link";
import LoginDrawer from "../Login";
import PinDropIcon from "@mui/icons-material/PinDrop";
import LoginDrawerMob from "../Login/mobileSideLog";
import PeopleIcon from "@mui/icons-material/People";
import styled from "@emotion/styled";

const CusBottomNavigationAction = styled(BottomNavigationAction)`
  & .MuiBottomNavigationAction-label {
    font-size: 0.69rem;
  }

  & .MuiBottomNavigationAction-root {
    padding: 0 !important;
  }
`;

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
          <CusBottomNavigationAction
            component={NavHashLink}
            to="/#home"
            label="Home"
            value="/#home"
            icon={<HomeIcon />}
            style={{ paddingLeft: "25px" }}
          />

          {/* <CusBottomNavigationAction
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
          /> */}
          <CusBottomNavigationAction
            component={NavHashLink}
            to="/#restaurants"
            label="Restaurants"
            value="/#restaurants"
            icon={<PinDropIcon />}
          />

          <CusBottomNavigationAction
            component={Link}
            to="/new-menu"
            label="Menu"
            value="/new-menu"
            icon={<RestaurantMenuIcon />}
          />

          <LoginDrawerMob></LoginDrawerMob>

          {/* <CusBottomNavigationAction
            component={Link}
            to="/#about"
            label="About Us"
            value="/#about"
            style={{ paddingRight: "25px" }}
            icon={<PeopleIcon />}
          /> */}
        </BottomNavigation>
      </Paper>
    </div>
  );
};
