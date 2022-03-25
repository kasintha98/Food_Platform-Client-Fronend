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
import { CardMedia } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Divider from "@mui/material/Divider";
import LoginIcon from "@mui/icons-material/Login";

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
                <a href="">Explore Menu</a>
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
                      <div className="mb-2">
                        <Typography variant="subtitle1" paragraph>
                          <LocationOnIcon></LocationOnIcon> SELECT LOCATION
                        </Typography>

                        <Typography variant="subtitle1" color="text.secondary">
                          Please select location, so that we can find a
                          restaurant that delivers to you!
                        </Typography>

                        <Typography
                          variant="subtitle1"
                          color="success"
                          alignItems="right"
                          justifyContent="right"
                        >
                          <Button variant="outlined" justifyContent="right">
                            ADD LOCATION
                          </Button>
                        </Typography>
                      </div>

                      <Divider variant="middle" />
                      <div className="mt-2">
                        <Typography variant="subtitle1" paragraph>
                          <LoginIcon></LoginIcon> Login to use your saved
                          addresses
                        </Typography>

                        <Typography variant="subtitle1" color="success">
                          <Button variant="outlined">MY ADDRESS</Button>
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              </Col>
            </Row>
            <div></div>
          </Col>
        </Row>
      </CusContainer>
      <Footer></Footer>
    </div>
  );
}
