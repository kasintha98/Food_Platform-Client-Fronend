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
import { getAllStores, setDeliveryType } from "../../actions";
import { DeliveryTypeModal } from "../../components/DeliveryTypeModal";
import { toast } from "react-toastify";

export default function HomePage(props) {
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });
  const [show, setShow] = useState(false);

  const search = useLocation().search;
  const QRcode = new URLSearchParams(search).get("QRcode");
  const storeId = new URLSearchParams(search).get("storeId");
  const restaurantId = new URLSearchParams(search).get("restaurantId");
  const tableId = new URLSearchParams(search).get("tableId");
  const stores = useSelector((state) => state.store.stores);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStores()).then((res) => {
      // console.log("aaa res");
      let matchedStore = res?.find(
        (res) => res.restaurantId == restaurantId && res.storeId == storeId
      );
      if (res) {
        if (!QRcode) {
          const del = localStorage.getItem("deliveryType");
          console.log("aaa del", del);
          const delObj = {
            ...del,
            qrcode: null,
            tableId: null,
          };
          dispatch(setDeliveryType(delObj));
          setShow(true);
        } else if (QRcode && matchedStore) {
          const delObj = {
            ...matchedStore,
            type: "collect",
            selectedAddress: null,
            qrcode: QRcode,
            tableId: tableId,
          };
          dispatch(setDeliveryType(delObj));
        } else {
          toast.error("Store not found for this QR, Pls seect store manually!");
          setShow(true);
        }
      }
    });
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
