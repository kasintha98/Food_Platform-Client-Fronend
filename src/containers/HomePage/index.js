import React, { useEffect, useState } from "react";
import Header from "../../components/Header";

import MyCarousel from "../../components/Carousel";
import About from "../../components/About";
import Chef from "../../components/Chef";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
import { Container } from "react-bootstrap";
import { ScrollingProvider, Section } from "react-scroll-section";
import { useMediaQuery } from "react-responsive";
import { BottomNav } from "../../components/BottomNav";
import { Restaurants } from "../../components/Restaurants";
import { Offers } from "../../components/Offers";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllStores } from "../../actions";
import { DeliveryTypeModal } from "../../components/DeliveryTypeModal";

export default function HomePage(props) {
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });
  const [show, setShow] = useState(false);

  const search = useLocation().search;
  const QRcode = new URLSearchParams(search).get("QRcode");
  console.log("aaa qrcode", QRcode);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!QRcode) {
      dispatch(getAllStores()).then((res) => {
        console.log("aaa res");
        if (res) {
          setShow(true);
        }
      });
    }
  }, [auth.authenticate]);

  console.log("aaa show", show);

  return (
    <div>
      <ScrollingProvider>
        <Header></Header>
        <Section id="home">
          <MyCarousel></MyCarousel>
        </Section>
        <Container>
          <Section id="offers">
            <Offers></Offers>
          </Section>
          <Section id="about">
            <About></About>
          </Section>
          <Section id="restaurants">
            <Restaurants></Restaurants>
          </Section>
          {/* <Section id="menu">
            <CategoryGallery></CategoryGallery>
          </Section> */}
          {/* <Section id="contact">
            <Contact></Contact>
          </Section> */}
        </Container>
        <Footer></Footer>
        {isMobile ? <BottomNav></BottomNav> : null}
      </ScrollingProvider>
      {show ? <DeliveryTypeModal delay={0}></DeliveryTypeModal> : null}
    </div>
  );
}
