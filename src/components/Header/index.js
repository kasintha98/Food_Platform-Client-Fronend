import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Navbar,
  Nav,
  Dropdown,
  DropdownButton,
  Row,
  Col,
  Container,
  Button,
} from "react-bootstrap";
import "./style.css";
import NewModal from "../Modal";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../img/logo.png";
import del from "../../img/deliveryType.jpg";
import { login, signout } from "../../actions";
import { Link, NavLink } from "react-router-dom";
import CartNum from "../UI/CartNum";
import { ToastContainer } from "react-toastify";
import styled from "@emotion/styled";
import LoginDrawer from "../Login";
import { NavHashLink } from "react-router-hash-link";
import { HeaderDeliveryType } from "../HeaderDeliveryType";
import { DeliveryTypeModal } from "../DeliveryTypeModal";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { Typography } from "@mui/material";
import { useMediaQuery } from "react-responsive";

const CusNavbar = styled(Navbar)`
  background-color: #fff;
  box-shadow: 2px 2px #f7f7f7;
  height: 50px;
  font-weight: bold;

  @media (max-width: 992px) {
    height: 60px;
  }
`;

const CLButton = styled(Button)``;

const CusDropdown = styled(Dropdown.Toggle)`
  border: none;
  background-color: transparent;

  &:hover {
    background-color: transparent;
  }
`;

const CusDropMenu = styled(Dropdown.Menu)`
  width: 350px;

  @media (max-width: 576px) {
    width: 75vw;
  }
`;

const CusNav = styled(Nav)`
  height: 50px;

  @media (max-width: 992px) {
    margin-top: -1px;
    height: 200px;
  }
`;

const CusNav2 = styled(Nav)`
  height: 40px;
  @media (max-width: 992px) {
    width: 100%;
    height: auto;
  }
`;

const CusNavHashLink = styled(NavHashLink)`
  color: rgba(0, 0, 0, 0.55);

  &:hover {
    color: rgba(0, 0, 0, 0.7);
  }
`;

const CusNav3 = styled(Nav)`
  height: 50px;
  width: 100%;
  @media (max-width: 992px) {
    width: 100%;
    height: auto;
  }
`;

const CusImage = styled.img`
  height: 40px;
  @media (max-width: 431px) {
    height: 40px;
    width: 70px;
  }
`;

export default function Header(props) {
  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [delModalOpen2, setDelModalOpen2] = useState(false);

  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });

  const auth = useSelector((state) => state.auth);
  const deliveryType = useSelector((state) => state.auth.deliveryType);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const location = useLocation();

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

  const renderNowDate = () => {
    const dateObj = new Date();
    const month = dateObj.toLocaleString("default", { month: "short" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return (
      <span>
        {day}/{month.toUpperCase()}/{year}
      </span>
    );
  };

  const renderDeliveryTypeModal2 = () => {
    console.log(delModalOpen2);
    return setDelModalOpen2(true);
  };

  const handleCloseDelModal = (resp) => {
    setDelModalOpen2(resp);
  };

  const renderLoggedInMenu = () => {
    return (
      <>
        {/* <NavHashLink
          className="nav-link"
          to="/#home"
          activeClassName="selected"
          activeStyle={{ borderBottom: "3px red solid" }}
        >
          Home
        </NavHashLink>
        <NavHashLink
          className="nav-link"
          to="/#about"
          activeClassName="selected"
          activeStyle={{ borderBottom: "3px red solid" }}
        >
          About
        </NavHashLink>
        <NavHashLink
          className="nav-link"
          to="/#chef"
          activeClassName="selected"
          activeStyle={{ borderBottom: "3px red solid" }}
        >
          Chef
        </NavHashLink>
        <NavHashLink
          className="nav-link"
          to="/new-menu"
          activeClassName="selected"
          activeStyle={{ borderBottom: "3px red solid" }}
        >
          Menu
        </NavHashLink>
        <NavHashLink
          className="nav-link"
          to="/#contact"
          activeClassName="selected"
          activeStyle={{ borderBottom: "3px red solid" }}
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
        </DropdownButton> */}
        <NavHashLink
          className="nav-link"
          to="/#home"
          activeClassName="selected"
          activeStyle={{ /* color: "red", */ borderBottom: "3px red solid" }}
        >
          Home
        </NavHashLink>
        <NavHashLink
          className="nav-link"
          to="/#about"
          activeClassName="selected"
          activeStyle={{ /* color: "red", */ borderBottom: "3px red solid" }}
        >
          About
        </NavHashLink>
        <NavHashLink
          className="nav-link"
          to="/#restaurants"
          activeClassName="selected"
          activeStyle={{ /* color: "red", */ borderBottom: "3px red solid" }}
        >
          Restaurants
        </NavHashLink>
        <NavHashLink
          className="nav-link"
          to="/new-menu"
          activeClassName="selected"
          activeStyle={{ /* color: "red", */ borderBottom: "3px red solid" }}
        >
          Menu
        </NavHashLink>
        {/* <NavHashLink
          className="nav-link"
          to="/#contact"
          activeClassName="selected"
          activeStyle={{ borderBottom: "3px red solid" }}
        >
          Contact
        </NavHashLink> */}
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

  const renderNonLoggedInMenu = () => {
    return (
      <>
        <NavHashLink
          className="nav-link"
          to="/#home"
          activeClassName="selected"
          activeStyle={{ /* color: "red", */ borderBottom: "3px red solid" }}
        >
          Home
        </NavHashLink>
        <NavHashLink
          className="nav-link"
          to="/#about"
          activeClassName="selected"
          activeStyle={{ /* color: "red", */ borderBottom: "3px red solid" }}
        >
          About
        </NavHashLink>
        <NavHashLink
          className="nav-link"
          to="/#restaurants"
          activeClassName="selected"
          activeStyle={{ /* color: "red", */ borderBottom: "3px red solid" }}
        >
          Restaurants
        </NavHashLink>
        <NavHashLink
          className="nav-link"
          to="/new-menu"
          activeClassName="selected"
          activeStyle={{ /* color: "red", */ borderBottom: "3px red solid" }}
        >
          Menu
        </NavHashLink>
        {/* <NavHashLink
          className="nav-link"
          to="/#contact"
          activeClassName="selected"
          activeStyle={{ borderBottom: "3px red solid" }}
        >
          Contact
        </NavHashLink> */}
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
          <div className={isMobile ? "w-100" : ""} style={{ display: "flex" }}>
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

            {deliveryType ? (
              <>
                {/* <HeaderDeliveryType typeObj={deliveryType}></HeaderDeliveryType> */}
                <Dropdown style={{ marginTop: "7px" }}>
                  <CusDropdown
                    variant="success"
                    id="dropdown-basic"
                    className="p-0 m-0"
                  >
                    <CusImage src={del} alt="del logo" />
                  </CusDropdown>

                  <CusDropMenu>
                    <Row
                      className="p-1"
                      style={{
                        width: "100%",
                        marginLeft: 0,
                        borderBottom: "1px #D9D9D9 solid",
                      }}
                    >
                      <Col className="col-5">
                        {" "}
                        <Typography sx={{ color: "#A6A6A6" }}>
                          Method
                        </Typography>
                      </Col>
                      <Col className="col-7">
                        <Typography sx={{ color: "#A6A6A6" }}>
                          {deliveryType.type === "delivery" ? (
                            <span>Delivery</span>
                          ) : (
                            <span>Self-Collect</span>
                          )}
                        </Typography>
                      </Col>
                    </Row>
                    <Row
                      className="p-1"
                      style={{
                        width: "100%",
                        marginLeft: 0,
                        borderBottom: "1px #D9D9D9 solid",
                      }}
                    >
                      <Col className="col-5">
                        <Typography sx={{ color: "#A6A6A6" }}>Date</Typography>
                      </Col>
                      <Col className="col-7">
                        <Typography sx={{ color: "#A6A6A6" }}>
                          {renderNowDate()}
                        </Typography>
                      </Col>
                    </Row>
                    <Row
                      className="p-1"
                      style={{
                        width: "100%",
                        marginLeft: 0,
                        borderBottom: "1px #D9D9D9 solid",
                      }}
                    >
                      <Col className="col-5">
                        <Typography sx={{ color: "#A6A6A6" }}>
                          Resturant Name
                        </Typography>
                      </Col>
                      <Col className="col-7">
                        <Typography sx={{ color: "#A6A6A6" }}>
                          {deliveryType.resturantName}
                        </Typography>
                      </Col>
                    </Row>
                    <Row
                      className="p-1"
                      style={{
                        width: "100%",
                        marginLeft: 0,
                        borderBottom: "1px #D9D9D9 solid",
                      }}
                    >
                      <Col className="col-5">
                        <Typography sx={{ color: "#A6A6A6" }}>
                          Resturant Address
                        </Typography>
                      </Col>
                      <Col className="col-7">
                        <Typography sx={{ color: "#A6A6A6" }}>
                          <span>{deliveryType.address1}</span>
                          {deliveryType.address2 ? (
                            <>
                              , <span>{deliveryType.address2}</span>
                            </>
                          ) : null}
                          {deliveryType.address3 ? (
                            <>
                              , <span>{deliveryType.address3}</span>
                            </>
                          ) : null}
                        </Typography>
                      </Col>
                    </Row>
                    {deliveryType.type === "delivery" &&
                    deliveryType.selectedAddress ? (
                      <Row
                        className="p-1"
                        style={{
                          width: "100%",
                          marginLeft: 0,
                          borderBottom: "1px #D9D9D9 solid",
                        }}
                      >
                        <Col className="col-5">
                          <Typography sx={{ color: "#A6A6A6" }}>
                            Customer Address
                          </Typography>
                        </Col>
                        <Col className="col-7">
                          <Typography sx={{ color: "#A6A6A6" }}>
                            <span className="fw-bold">
                              {deliveryType.selectedAddress.customerAddressType}
                              {": "}
                              <span />
                            </span>
                            <span className="font-weight-normal">
                              {deliveryType.selectedAddress.address1},{" "}
                              {deliveryType.selectedAddress.address2},
                              {deliveryType.selectedAddress.landmark},{" "}
                              {deliveryType.selectedAddress.city},{" "}
                              {deliveryType.selectedAddress.state},{" "}
                              {deliveryType.selectedAddress.zipCode}
                              <span />
                            </span>
                          </Typography>
                        </Col>
                      </Row>
                    ) : null}

                    <Row
                      style={{
                        width: "100%",
                        marginLeft: 0,
                        borderBottom: "1px #D9D9D9 solid",
                      }}
                      className="p-1"
                    >
                      <CLButton
                        className="w-100"
                        onClick={renderDeliveryTypeModal2}
                        variant="primary"
                      >
                        <Typography>CHANGE</Typography>
                      </CLButton>
                    </Row>
                  </CusDropMenu>
                </Dropdown>
              </>
            ) : null}

            <CusNavHashLink
              className="nav-link ms-2"
              to="/gps"
              activeClassName="selected"
              activeStyle={{
                /* color: "red", */ borderBottom: "3px red solid",
              }}
            >
              <PinDropIcon></PinDropIcon> GPS Tracker
            </CusNavHashLink>

            {isMobile ? (
              <NavLink className="nav-link" to="/new-cart">
                {Object.keys(cart.cartItems) ? (
                  <CartNum count={Object.keys(cart.cartItems).length}></CartNum>
                ) : null}
                <i className="fa fa-cart-plus"></i>
              </NavLink>
            ) : null}
          </div>

          {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
          <Navbar.Collapse
            style={{ backgroundColor: "#fff", marginTop: "0px" }}
            id="navbarScroll"
          >
            <CusNav
              className="mr-auto my-2 my-lg-0 justify-content-end"
              style={{ maxHeight: "200px", width: "100%" }}
              navbarScroll
            >
              {auth.authenticate
                ? renderLoggedInMenu()
                : renderNonLoggedInMenu()}
            </CusNav>
          </Navbar.Collapse>
        </Container>
      </CusNavbar>

      {renderLoginModal()}
      {delModalOpen2 ? (
        <DeliveryTypeModal
          delay={1}
          /* onChangeType={handleTypeChange} */
          onCloseDelModal={handleCloseDelModal}
          forceOpen={true}
          fromCheckout={location.pathname === "/new-checkout" ? true : false}
        ></DeliveryTypeModal>
      ) : null}
    </div>
  );
}
