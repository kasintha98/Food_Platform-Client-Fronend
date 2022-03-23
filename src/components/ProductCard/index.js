import React from "react";
import { Row, Col, Carousel } from "react-bootstrap";
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

export default function ProductCard() {
  const [open, setOpen] = React.useState(false);
  const [pizzaType, setPizzaType] = React.useState("1");
  const [pizzaSize, setPizzaSize] = React.useState("11");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePizzaType = (event) => {
    setPizzaType(event.target.value);
  };
  const handlePizzaSize = (event) => {
    setPizzaSize(event.target.value);
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
            Sausages Pizza Customize
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
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
                    value={pizzaType}
                    onChange={handlePizzaType}
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
                    value={pizzaSize}
                    onChange={handlePizzaSize}
                  >
                    <FormControlLabel
                      value="11"
                      control={<Radio />}
                      label="Regular"
                      className="borderRound"
                    />
                    <FormControlLabel
                      value="21"
                      control={<Radio />}
                      label="Medium"
                      className="borderRound"
                    />
                    <FormControlLabel
                      value="31"
                      control={<Radio />}
                      label="Large"
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
                  >
                    <Remove></Remove>
                  </Button>
                  <TextField size="small" id="numberofitems" type="tel" />
                  <Button
                    sx={{
                      width: "25px !important",
                      height: "25px",
                      minWidth: "25px !important",
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
      <Card sx={{ maxWidth: 345, marginTop: 5 }}>
        <CardMedia
          component="img"
          height="180"
          image={pizzaImg}
          alt="product"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Sausages Pizza
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </Typography>
        </CardContent>
        <CardActions>
          <Row className="w-100">
            <Col className="col-10">
              <Button onClick={handleOpen} size="small" variant="outlined">
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
      {renderCustomizeModal()}
    </div>
  );
}
