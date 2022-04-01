import React from "react";
import { Carousel } from "react-bootstrap";
import bg1 from "../../img/1.jpg";
import bg2 from "../../img/2.jpg";

export default function MyCarousel(props) {
  return (
    <div>
      <Carousel style={{ marginBottom: "15px", marginTop: "50px" }}>
        <Carousel.Item style={{ width: "100%", height: "calc(100vh - 50px)" }}>
          <img className="d-block w-100" src={bg1} alt="First slide" />
          <Carousel.Caption>
            <h3>Order Now!</h3>
            <p>Feel the taste!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={bg2} alt="Second slide" />

          <Carousel.Caption>
            <h3>Order Now!</h3>
            <p>Feel the taste!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
