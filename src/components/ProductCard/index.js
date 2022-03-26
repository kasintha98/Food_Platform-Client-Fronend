import React from "react";
import { Row, Col, Carousel } from "react-bootstrap";
import styled from "@emotion/styled";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import pizzaImg from "../../img/pizza.jpg";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Add, Remove } from "@mui/icons-material";
import vegSvg from "../../img/veg.svg";
import nonvegSvg from "../../img/non-veg.svg";
import {
  Modal,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormGroup,
  Checkbox,
  TextField,
} from "@mui/material";
import { addToCartNew, replaceCartItemNew } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "80%",
  overflowY: "auto",
};

const CusomizeBtn = styled(Button)`
  position: absolute;
  right: 5px;
  top: 84px;
  background-color: rgba(255, 255, 255, 0.7);

  &:hover {
    background-color: rgba(255, 255, 255);
  }
`;

const VegImg = styled.img`
  position: absolute;
  left: 5px;
  top: 5px;
`;

export default function ProductCard(props) {
  const [open, setOpen] = React.useState(false);
  const [dishAddOn, setDishAddOn] = React.useState("1");
  const [dishSize, setDishSize] = React.useState(props.product.size);
  const [currentProduct, setCurrentProduct] = React.useState(props.product);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const onQuantityIncrement = (product_id) => {
    console.log({ product_id });
    dispatch(addToCartNew(cart.cartItems[product_id], 1));
  };

  const onQuantityDecrement = (product_id) => {
    dispatch(addToCartNew(cart.cartItems[product_id], -1));
  };

  const handleDishAddOn = (event) => {
    setDishAddOn(event.target.value);
  };
  const handleDishSize = (event) => {
    setDishSize(event.target.value);
  };

  const handleCurrentProduct = (curProduct) => {
    setCurrentProduct(curProduct);
    console.log(curProduct);
  };

  const replaceCartItem = (dupProduct, oldId) => {
    dispatch(replaceCartItemNew(dupProduct, oldId));
  };

  const renderCustomizeModal = () => {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <Carousel>
              <Carousel.Item style={{ height: "200px" }}>
                <img
                  className="d-block w-100"
                  src={pizzaImg}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item style={{ height: "200px" }}>
                <img
                  className="d-block w-100"
                  src={pizzaImg}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item style={{ height: "200px" }}>
                <img
                  className="d-block w-100"
                  src={pizzaImg}
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.product?.dish_type}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.product?.dish_description_id}
          </Typography>
          <div>
            <div>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, fontWeight: "500" }}
              >
                Pizza type
              </Typography>
              <div>
                <FormControl sx={{ width: "100%" }}>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={dishAddOn}
                    onChange={handleDishAddOn}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Mix Veg, Pizza (Onion, Tomato)"
                      className="borderRound"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="Paradise Veg, Pizza (Baby Corn, Olives)"
                      className="borderRound"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <div>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, fontWeight: "500" }}
              >
                Pizza size
              </Typography>
              <div>
                <FormControl sx={{ width: "100%" }}>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={dishSize}
                    onChange={handleDishSize}
                  >
                    {props.products.map((dupProduct) =>
                      dupProduct.dish_type === props.product.dish_type ? (
                        <FormControlLabel
                          value={dupProduct.size}
                          control={
                            <Radio
                              onClick={() => {
                                handleCurrentProduct(dupProduct);
                                replaceCartItem(
                                  dupProduct,
                                  props.product.product_id
                                );
                              }}
                            />
                          }
                          label={dupProduct.size}
                          className="borderRound"
                        />
                      ) : null
                    )}
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <div>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, fontWeight: "500" }}
              >
                Extra toppings
              </Typography>
              <div>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Extra Toppings (Regular)"
                    sx={{ width: "100%", marginRight: "0px" }}
                    className="borderRound"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Extra Toppings (Middle)"
                    sx={{ width: "100%", marginRight: "0px" }}
                    className="borderRound"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Extra Toppings (Large)"
                    sx={{ width: "100%", marginRight: "0px" }}
                    className="borderRound"
                  />
                </FormGroup>
              </div>
            </div>
            <div>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, fontWeight: "500" }}
              >
                Paneer & Cheese
              </Typography>
              <div>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Paneer & Cheese (Regular)"
                    sx={{ width: "100%", marginRight: "0px" }}
                    className="borderRound"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Paneer & Cheese (Middle)"
                    sx={{ width: "100%", marginRight: "0px" }}
                    className="borderRound"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Paneer & Cheese (Large)"
                    sx={{ width: "100%", marginRight: "0px" }}
                    className="borderRound"
                  />
                </FormGroup>
              </div>
            </div>
            <div>
              <br></br>
              <TextField
                id="outlined-multiline-static"
                label="Special Requests"
                multiline
                rows={3}
                sx={{ width: "100%" }}
              />
            </div>
          </div>
          <div>
            <br></br>
            <Row className="align-items-center">
              <Col className="col-4">
                <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                >
                  <Button
                    sx={{
                      width: "25px !important",
                      height: "25px",
                      minWidth: "25px !important",
                    }}
                    onClick={() => {
                      onQuantityDecrement(props.product?.product_id);
                    }}
                  >
                    <Remove></Remove>
                  </Button>
                  <TextField
                    size="small"
                    id="numberofitems"
                    type="tel"
                    value={cart?.cartItems[props.product?.product_id]?.qty}
                  />
                  <Button
                    sx={{
                      width: "25px !important",
                      height: "25px",
                      minWidth: "25px !important",
                    }}
                    onClick={() => {
                      onQuantityIncrement(props.product?.product_id);
                    }}
                  >
                    <Add></Add>
                  </Button>
                </ButtonGroup>
              </Col>
              <Col className="col-8">
                <Button
                  sx={{ width: "100%" }}
                  variant="contained"
                  color="success"
                  onClick={handleClose}
                >
                  Add to my order ₹ 100.00
                </Button>
              </Col>
            </Row>
          </div>
        </Box>
      </Modal>
    );
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345, marginTop: 5, position: "relative" }}>
        <CardMedia
          component="img"
          height="120px"
          image={pizzaImg}
          alt="product"
        />
        {props.product.ingredient_exists_flag === "Y" ? (
          <CusomizeBtn onClick={handleOpen} size="small" variant="outlined">
            Customize
          </CusomizeBtn>
        ) : null}

        {props.product?.dish_category === "Veg" ? (
          <VegImg src={vegSvg} alt="veg" />
        ) : (
          <VegImg src={nonvegSvg} alt="non-veg" />
        )}
        <VegImg src={vegSvg} alt="veg" />

        <CardContent sx={{ padding: "5px" }}>
          <Typography
            sx={{ fontSize: "1rem", fontWeight: "600" }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {props.product?.dish_type === "Fries" ? (
              <>
                {props.product?.dish_type} ({props.product?.size})
              </>
            ) : (
              <>{props.product?.dish_type}</>
            )}
          </Typography>
          <Typography
            sx={{ fontSize: "0.85rem" }}
            variant="body2"
            color="text.secondary"
          >
            {props.product?.dish_description_id}
          </Typography>
        </CardContent>
        <CardActions>
          <Row className="w-100 align-items-center">
            <Col className="col-10">
              <Typography>₹ {props.product?.price}</Typography>
            </Col>
            <Col className="col-2">
              <IconButton
                size="small"
                color="success"
                aria-label="add to shopping cart"
                onClick={() => {
                  dispatch(addToCartNew(currentProduct, 1));
                }}
              >
                <AddShoppingCart />
              </IconButton>
            </Col>
          </Row>
        </CardActions>
      </Card>
      {renderCustomizeModal()}
    </div>
  );
}
