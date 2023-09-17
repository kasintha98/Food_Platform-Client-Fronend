import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import bg1 from "../../img/1.jpg";
import bg11 from "../../img/cover.jpg";
import bg2 from "../../img/2.jpg";
import bg2m from "../../img/2m.jpg";
import styled from "@emotion/styled";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { imagePath_dev } from "../../urlConfig";
import { useDispatch, useSelector } from "react-redux";
import { getActiveCSS } from "../../actions";



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

  const banners1 = useSelector((state) => state.store.activeCSS);
  const isMobile = useMediaQuery({ query: `(max-width: 576px)` });

  const dispatch = useDispatch();
  return (
    <div>
       {isMobile ? (
      <Carousel style={{ marginBottom: "15px", marginTop: "50px" }}>
        {banners1.map((banner) => (
          <Carousel.Item>
            <Link to="/new-menu">
              <CusImg className="d-block w-100" src={`${imagePath_dev}/${window.restId}/${banner.imagePath}`} alt="First slide" />
            </Link>
          </Carousel.Item>
          ))}   
          {/* <Carousel.Item>
            <Link to="/new-menu">
              <CusImg2 className="d-block w-100" src={bg2m} alt="First slide" />
            </Link>
          </Carousel.Item> */}
      </Carousel> 
        ) : 
        <Carousel style={{ marginBottom: "15px", marginTop: "50px" }}>
          {banners1.map((banner) => (
          <Carousel.Item>
            <Link to="/new-menu">
              <CusImg className="d-block w-100" src={`${imagePath_dev}/${window.restId}/${banner.imagePath}`} alt="First slide" />
            </Link>
          </Carousel.Item>
          ))}          
      </Carousel> }
    </div>
  );

  // return (
  //   <div>
  //      {window.domainName == "localhost:5000" ? 
  //     <Carousel style={{ marginBottom: "15px", marginTop: "50px" }}>
  //       {isMobile ? (
  //         <Carousel.Item>
  //           <Link to="/new-menu">
  //             <CusImg2 className="d-block w-100" src={bg2m} alt="First slide" />
  //           </Link>
  //         </Carousel.Item>
  //       ) : null}

  //       {/* {!isMobile ? ( */}
  //         {banners1.map((banner) => (
  //         <Carousel.Item>
  //           <Link to="/new-menu">
  //             <CusImg className="d-block w-100" src={`${imagePath_dev}/${window.restId}/${banner.imagePath}`} alt="First slide" />
  //           </Link>
  //         </Carousel.Item>
  //         ))}
          
  //       {/* ) : null} */}

  //       {/* {!isMobile ? (
  //         <Carousel.Item>
  //           <Link to="/new-menu">
  //             <CusImg className="d-block w-100" src={`${imagePath_dev}/${window.restId}/${banners1[0].imagePath}`} alt="First slide" />
  //           </Link>
  //         </Carousel.Item>
  //       ) : null}

  //       {!isMobile ? (
  //         <Carousel.Item>
  //           <Link to="/new-menu">
  //             <CusImg className="d-block w-100" src={`${imagePath_dev}/${window.restId}/${banners1[1].imagePath}`} alt="First slide" />
  //           </Link>
  //         </Carousel.Item>
  //       ) : null} */}

  //     </Carousel> :

  //     <Carousel style={{ marginBottom: "15px", marginTop: "50px" }}>
  //     {isMobile ? (
  //       <Carousel.Item>
  //         <Link to="/new-menu">
  //           <CusImg2 className="d-block w-100" src={bg2m} alt="First slide" />
  //         </Link>
  //       </Carousel.Item>
  //     ) : null}

  //     {!isMobile ? (
  //       <Carousel.Item>
  //         <Link to="/new-menu">
  //           <CusImg className="d-block w-100" src={bg11} alt="First slide" />
  //         </Link>
  //       </Carousel.Item>
  //     ) : null}

  //     {!isMobile ? (
  //       <Carousel.Item>
  //         <Link to="/new-menu">
  //           <CusImg className="d-block w-100" src={bg2} alt="Second slide" />
  //         </Link>
  //       </Carousel.Item>
  //     ) : null}
  //   </Carousel> }
    
  //   </div>
  // );
}
