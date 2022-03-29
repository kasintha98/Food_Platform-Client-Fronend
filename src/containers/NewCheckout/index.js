import React from "react";
import "./style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Row, Col, Container } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CheckoutCard from "../../components/CheckoutCard/index";
import ProductCard from "../../components/ProductCard";
import styled from "@emotion/styled";
import CartNum from "../../components/UI/CartNum";
import { useSelector } from "react-redux";
import { Paper } from "@mui/material";
import { Grid } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { CardMedia, TextField } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Divider from "@mui/material/Divider";
import LoginIcon from "@mui/icons-material/Login";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CartIconArea = styled.div`
  display: none;

  @media (max-width: 992px) {
    display: block;
  }
`;

const CusContainer = styled(Container)`
  margin-top: 65px;
  min-height: calc(100vh - 180px);

  @media (max-width: 992px) {
    margin-top: 80px;
  }
`;

const CusCol = styled(Col)`
  @media (max-width: 992px) {
    display: none;
  }
`;

export default function NewCheckout() {
  const [value, setValue] = React.useState(0);

  const cart = useSelector((state) => state.cart);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Header></Header>
      <CusContainer>
        <Row>
          <Col className="col-7 mt-5">
            <Row>
              <Col className="col-8">
                <h5>You have selected 3 items</h5>
              </Col>
              <Col className="col-4">
                <Typography sx={{ textAlign: "end" }}>
                  <a href="">Explore Menu</a>
                </Typography>
              </Col>
            </Row>
            <div>
              <Card sx={{ width: "100%", marginTop: 3 }}>
                <CardContent sx={{ height: "auto" }}>
                  <CheckoutCard />
                  <CheckoutCard />
                  <CheckoutCard />
                </CardContent>
              </Card>
            </div>
          </Col>
          <Col className="col-5 mt-5">
            <Row>
              <Col className="col-12">
                <h5>Choose a delivery address</h5>
              </Col>
              <Col className="col-12">
                <Grid sx={{ width: "100%", marginTop: 3 }}>
                  <Card>
                    <CardContent>
                      <div className="row mb-3">
                        <div className="col-2">
                          <Typography sx={{ textAlign: "center" }}>
                            <LocationOnIcon></LocationOnIcon>
                          </Typography>
                        </div>
                        <div className="col-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                          >
                            Please select location, so that we can find a
                            restaurant that delivers to you!
                          </Typography>
                        </div>
                        <div className="col-4">
                          <Typography
                            variant="subtitle1"
                            color="success"
                            sx={{ textAlign: "end" }}
                          >
                            <Button variant="outlined" justifyContent="end">
                              ADD LOCATION
                            </Button>
                          </Typography>
                        </div>
                      </div>
                      <Divider variant="middle" />
                      <div className="row mt-3">
                        <div className="col-2">
                          <Typography sx={{ textAlign: "center" }}>
                            <LoginIcon></LoginIcon>
                          </Typography>
                        </div>
                        <div className="col-6">
                          <Typography variant="subtitle1" paragraph>
                            Login to use your saved addresses
                          </Typography>
                        </div>
                        <div className="col-4">
                          <Typography
                            variant="subtitle1"
                            color="success"
                            sx={{ textAlign: "end" }}
                          >
                            <Button variant="outlined">MY ADDRESS</Button>
                          </Typography>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              </Col>
            </Row>
            <Row>
              <Col className="col-12 mt-5">
                <h5>Order Pick Up</h5>
              </Col>
              <Col className="col-12">
                <Grid sx={{ width: "100%", marginTop: 3 }}>
                  <Card>
                    <CardContent>
                      <div className="row ">
                        <div className="col-2">
                          <Typography sx={{ textAlign: "center" }}>
                            <PhoneIphoneIcon></PhoneIphoneIcon>
                          </Typography>
                        </div>
                        <div className="col-6">
                          <Typography variant="subtitle1" paragraph>
                            Enter your phone number
                          </Typography>
                        </div>
                        <div className="col-4">
                          <TextField
                            id=""
                            label="Phone"
                            type="text"
                            variant="standard"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              </Col>
            </Row>
            <Row>
              <Col className="col-12 mt-5">
                <h5>Offers</h5>
              </Col>
              <Col className="col-12">
                <Grid sx={{ width: "100%", marginTop: 3 }}>
                  <Card>
                    <CardActionArea>
                      <CardContent>
                        <div className="row">
                          <div className="col-3" sx={{ textAlign: "center" }}>
                            <Typography sx={{ textAlign: "center" }}>
                              <LocalOfferIcon></LocalOfferIcon>
                            </Typography>
                          </div>
                          <div className="col-6">
                            <Typography variant="subtitle1" paragraph>
                              Select offer / Apply coupon
                            </Typography>

                            <Typography
                              variant="subtitle1"
                              color="text.secondary"
                            >
                              Get discount with your order
                            </Typography>
                          </div>
                          <div className="col-3" sx={{ textAlign: "end" }}>
                            <Typography sx={{ textAlign: "center" }}>
                              <ArrowForwardIosIcon></ArrowForwardIosIcon>
                            </Typography>
                          </div>
                        </div>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              </Col>
            </Row>
            <Row>
              <Col className="col-12 mt-5">
                <h5>Price Details</h5>
              </Col>
              <Col className="col-12">
                <Grid sx={{ width: "100%", marginTop: 3 }}>
                  <Card>
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Sub Total
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ textAlign: "end" }}
                          >
                            ₹ 5050.00
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Discount
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ textAlign: "end" }}
                          >
                            -
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Taxes and Charges
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ textAlign: "end" }}
                          >
                            ₹ 287.50
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Grand Total
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ textAlign: "end" }}
                          >
                            ₹ 5337.50
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="success"
                        className="w-100"
                      >
                        PLACE ORDER
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Col>
            </Row>
          </Col>
        </Row>
      </CusContainer>
      <Footer></Footer>
    </div>
  );
}
