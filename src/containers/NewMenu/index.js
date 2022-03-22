import React from "react";
import "./style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Row, Col, Container } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import pizzaImg from "../../img/pizza.jpg";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

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

export default function NewMenu() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Header></Header>
      <Container
        style={{
          marginTop: "120px",
          minHeight: "calc(100vh - 180px)",
        }}
      >
        <Row>
          <Col sm={6} md={8}>
            <div>
              <h2>Our Menu</h2>
            </div>
            <div>
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Pizza" {...a11yProps(0)} />
                    <Tab label="Burger" {...a11yProps(1)} />
                    <Tab label="Other" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <div>
                    <Row>
                      <Col sm={6} md={6} lg={4}>
                        <Card sx={{ maxWidth: 345, marginTop: 5 }}>
                          <CardMedia
                            component="img"
                            height="180"
                            image={pizzaImg}
                            alt="product"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Sausages Pizza
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Row className="w-100">
                              <Col className="col-10">
                                <Button size="small" variant="outlined">
                                  Customize
                                </Button>
                              </Col>
                              <Col className="col-2">
                                <IconButton
                                  size="small"
                                  color="success"
                                  aria-label="add to shopping cart"
                                >
                                  <AddShoppingCart />
                                </IconButton>
                              </Col>
                            </Row>
                          </CardActions>
                        </Card>
                      </Col>
                      <Col sm={6} md={6} lg={4}>
                        <Card sx={{ maxWidth: 345, marginTop: 5 }}>
                          <CardMedia
                            component="img"
                            height="180"
                            image={pizzaImg}
                            alt="product"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Sausages Pizza
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Row className="w-100">
                              <Col className="col-10">
                                <Button size="small" variant="outlined">
                                  Customize
                                </Button>
                              </Col>
                              <Col className="col-2">
                                <IconButton
                                  size="small"
                                  color="success"
                                  aria-label="add to shopping cart"
                                >
                                  <AddShoppingCart />
                                </IconButton>
                              </Col>
                            </Row>
                          </CardActions>
                        </Card>
                      </Col>
                      <Col sm={6} md={6} lg={4}>
                        <Card sx={{ maxWidth: 345, marginTop: 5 }}>
                          <CardMedia
                            component="img"
                            height="180"
                            image={pizzaImg}
                            alt="product"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Sausages Pizza
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Row className="w-100">
                              <Col className="col-10">
                                <Button size="small" variant="outlined">
                                  Customize
                                </Button>
                              </Col>
                              <Col className="col-2">
                                <IconButton
                                  size="small"
                                  color="success"
                                  aria-label="add to shopping cart"
                                >
                                  <AddShoppingCart />
                                </IconButton>
                              </Col>
                            </Row>
                          </CardActions>
                        </Card>
                      </Col>
                      <Col sm={6} md={6} lg={4}>
                        <Card sx={{ maxWidth: 345, marginTop: 5 }}>
                          <CardMedia
                            component="img"
                            height="180"
                            image={pizzaImg}
                            alt="product"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Sausages Pizza
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Row className="w-100">
                              <Col className="col-10">
                                <Button size="small" variant="outlined">
                                  Customize
                                </Button>
                              </Col>
                              <Col className="col-2">
                                <IconButton
                                  size="small"
                                  color="success"
                                  aria-label="add to shopping cart"
                                >
                                  <AddShoppingCart />
                                </IconButton>
                              </Col>
                            </Row>
                          </CardActions>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                  Item Three
                </TabPanel>
              </Box>
            </div>
          </Col>
          <Col sm={6} md={4}>
            <Card sx={{ maxWidth: 345, marginTop: 12 }}>
              <CardContent>
                <Card sx={{ maxWidth: 345 }}>
                  <Row>
                    <Col className="col-3">
                      <CardMedia
                        component="img"
                        height="50"
                        image={pizzaImg}
                        alt="green iguana"
                      />
                    </Col>
                    <Col className="col-9">
                      <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                      </Typography>
                    </Col>
                  </Row>
                  <CardActions>
                    <ButtonGroup
                      variant="contained"
                      aria-label="outlined primary button group"
                    >
                      <Button size="small">-</Button>
                      <TextField size="small" id="outlined-number" type="tel" />
                      <Button size="small">+</Button>
                    </ButtonGroup>
                  </CardActions>
                </Card>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="success" className="w-100">
                  Checkout
                </Button>
              </CardActions>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </div>
  );
}
