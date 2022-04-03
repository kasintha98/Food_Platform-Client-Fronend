import React from "react";
import { Carousel } from "react-bootstrap";
import bg1 from "../../img/1.jpg";
import bg2 from "../../img/2.jpg";
import styled from "@emotion/styled";

const CusImg = styled.img`
  width: 100%;
  height: calc(100vh - 50px);

  @media (max-width: 992px) {
    height: 250px;
  }
`;

export default function MyCarousel(props) {
  return (
    <div>
      <Carousel style={{ marginBottom: "15px", marginTop: "50px" }}>
        <Carousel.Item>
          <CusImg className="d-block w-100" src={bg1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <CusImg className="d-block w-100" src={bg2} alt="Second slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
