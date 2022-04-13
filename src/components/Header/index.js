import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Dropdown,
  DropdownButton,
  Container,
} from "react-bootstrap";
import "./style.css";
import NewModal from "../Modal";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../img/logo.png";
import { login, signout } from "../../actions";
import { Link, NavLink } from "react-router-dom";
import CartNum from "../UI/CartNum";
import { ToastContainer } from "react-toastify";
import styled from "@emotion/styled";
import LoginDrawer from "../Login";
import { NavHashLink } from "react-router-hash-link";

const CusNavbar = styled(Navbar)`
  background-color: #fff;
  box-shadow: 2px 2px #f7f7f7;
  height: 50px;
  font-weight: bold;

  @media (max-width: 992px) {
    height: 60px;
  }
`;

export default function Header(props) {
  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  //calling action to login the user
  const userLogin = () => {
    try {
      dispatch(login({ email, password }));
      console.log({ auth: auth });
    } catch (error) {
      console.log({ error });
    }
  };

  //calling the action to logout the user
  const logout = () => {
    dispatch(signout());
  };

  const renderLoggedInMenu = () => {
    return (
      <>
        <NavHashLink
          className="nav-link"
          to="/#home"
          activeClassName="selected"
          activeStyle={{ color: "red" }}
        >
          Home
        </NavHashLink>
        <NavHashLink
          className="nav-link"
          to="/#about"
          activeClassName="selected"
          activeStyle={{ color: "red" }}
        >
          About
        </NavHashLink>
        <NavHashLink
          className="nav-link"
          to="/#chef"
          activeClassName="selected"
          activeStyle={{ color: "red" }}
        >
          Chef
        </NavHashLink>
        <NavHashLink
          className="nav-link"
          to="/new-menu"
          activeClassName="selected"
          activeStyle={{ color: "red" }}
        >
          Menu
        </NavHashLink>
        <NavHashLink
          className="nav-link"
          to="/#contact"
          activeClassName="selected"
          activeStyle={{ color: "red" }}
        >
          Contact
        </NavHashLink>
        <NavLink className="nav-link" to="/new-cart">
          {Object.keys(cart.cartItems) ? (
            <CartNum count={Object.keys(cart.cartItems).length}></CartNum>
          ) : null}
          <i className="fa fa-cart-plus"></i> Cart
        </NavLink>
        <DropdownButton title={`${auth.user.fullName}`} variant="dark">
          <Dropdown.Item>
            <Link to="/profile">
              <i className="fa fa-id-badge"></i> Profile
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link onClick={() => logout()} to="/">
              <i className="fa fa-sign-out"></i> Logout
            </Link>
          </Dropdown.Item>
        </DropdownButton>
      </>
    );
  };

  const renderNonLoggedInMenu = () => {
    return (
      <>
        <NavHashLink
          className="nav-link"
          to="/#home"
          activeClassName="selected"
          activeStyle={{ color: "red" }}
        >
          Home
        </NavHashLink>
        <NavHashLink
          className="nav-link"
          to="/#about"
          activeClassName="selected"
          activeStyle={{ color: "red" }}
        >
          About
        </NavHashLink>
        <NavHashLink
          className="nav-link"
          to="/#chef"
          activeClassName="selected"
          activeStyle={{ color: "red" }}
        >
          Chef
        </NavHashLink>
        <NavHashLink
          className="nav-link"
          to="/new-menu"
          activeClassName="selected"
          activeStyle={{ color: "red" }}
        >
          Menu
        </NavHashLink>
        <NavHashLink
          className="nav-link"
          to="/#contact"
          activeClassName="selected"
          activeStyle={{ color: "red" }}
        >
          Contact
        </NavHashLink>
        <LoginDrawer />
        <NavLink className="nav-link" to="/new-cart">
          {Object.keys(cart.cartItems) ? (
            <CartNum count={Object.keys(cart.cartItems).length}></CartNum>
          ) : null}
          <i className="fa fa-cart-plus"></i> Cart
        </NavLink>
      </>
    );
  };

  const renderLoginModal = () => {
    return (
      <NewModal
        size="lg"
        modalTitle="Login"
        variant="primary"
        action={userLogin}
        saveBtnName="Login"
        show={loginModal}
        handleClose={() => {
          setLoginModal(false);
        }}
        log={true}
      >
        <Input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          lable="Email"
          type="text"
          placeholder="Enter your email..."
        ></Input>
        <Input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          lable="Password"
          type="password"
          placeholder="Enter your password..."
        ></Input>
      </NewModal>
    );
  };

  return (
    <div>
      <ToastContainer />
      <CusNavbar fixed="top" variant="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img height="45px" src={logo} alt="logo" />
            </Link>
          </Navbar.Brand>
          {/* <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse
            style={{ backgroundColor: "#fff", marginTop: "0px" }}
            id="navbarScroll"
          >
            <Nav
              className="mr-auto my-2 my-lg-0 justify-content-end"
              style={{ maxHeight: "200px", width: "100%" }}
              navbarScroll
            >
              {auth.authenticate
                ? renderLoggedInMenu()
                : renderNonLoggedInMenu()}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </CusNavbar>

      {renderLoginModal()}
    </div>
  );
}
