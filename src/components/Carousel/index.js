import React from "react";
import { Carousel } from "react-bootstrap";
import bg1 from "../../img/1.jpg";
import bg2 from "../../img/2.jpg";
import bg2m from "../../img/2m.jpg";
import styled from "@emotion/styled";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

const CusImg = styled.img`
  width: 100%;
  height: calc(100vh - 50px);

  @media (max-width: 992px) {
    height: 250px;
  }
`;

const CusImg2 = styled.img`
  width: 100%;
  height: calc(100vh - 70px);
`;

export default function MyCarousel(props) {
  const isMobile = useMediaQuery({ query: `(max-width: 576px)` });

  return (
    <div>
      <Carousel style={{ marginBottom: "15px", marginTop: "50px" }}>
        {isMobile ? (
          <Carousel.Item>
            <Link to="/new-menu">
              <CusImg2 className="d-block w-100" src={bg2m} alt="First slide" />
            </Link>
          </Carousel.Item>
        ) : null}

        {!isMobile ? (
          <Carousel.Item>
            <Link to="/new-menu">
              <CusImg className="d-block w-100" src={bg1} alt="First slide" />
            </Link>
          </Carousel.Item>
        ) : null}

        {!isMobile ? (
          <Carousel.Item>
            <Link to="/new-menu">
              <CusImg className="d-block w-100" src={bg2} alt="Second slide" />
            </Link>
          </Carousel.Item>
        ) : null}
      </Carousel>
    </div>
  );
}
