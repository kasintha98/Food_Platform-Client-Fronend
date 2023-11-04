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
import { getAllStores2, setDeliveryType, getActiveCSS, getAllActiveCSS, getProductById } from "../../actions";
import { DeliveryTypeModal } from "../../components/DeliveryTypeModal";
import { toast } from "react-toastify";
import QRCodeModal from "../../components/QRCodeModal";
import ReactGA from "react-ga4";

import { useHistory } from "react-router-dom";


export default function HomePage(props) {
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });
  const [show, setShow] = useState(false);
  const [qrshow, setQrshow] = useState(false);
  console.log("aaa qrshow", qrshow);

  const search = useLocation().search;
  const QRcode = new URLSearchParams(search).get("QRcode");
  const storeId = new URLSearchParams(search).get("storeId");
  const restaurantId = new URLSearchParams(search).get("restaurantId");
  const tableId = new URLSearchParams(search).get("tableId");
  const stores = useSelector((state) => state.store.stores);

  const history = useHistory();

  
  const prd = new URLSearchParams(search).get("prd");
  const productId = new URLSearchParams(search).get("productId");

  window.isPrd = prd;
  window.restaurantId = restaurantId;
  window.storeId = storeId;
  window.productId = productId;

  // console.log("prd ===== ...",prd);
  // console.log("storeIdd ===== ...",storeId);
  // console.log("restaurantIdd=======...",restaurantId);
  // console.log("productId=======...",productId);

  const banners = useSelector((state) => state.store.activeCSS);
  const allCss = useSelector((state) => state.store.allActiveCSS);

  // console.log("ALL_ACTIVE_CSSSSSSSSSS...",allCss);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "Home Screen" });

    dispatch(getActiveCSS(window.restId, "ALL", "HOME", "Banner"));
    dispatch(getAllActiveCSS(window.restId , "ALL"));

    if (prd == 'yes') {
      dispatch(getProductById(restaurantId, storeId, productId));
    }

  },[]);

  useEffect(() => {

    if(prd){
      history.push("/new-menu");
    }

    console.log("RRRRREEssssstt---------------",window.restId);
    dispatch(getAllStores2(window.restId)).then((res) => {
      // console.log("aaa res");
      let matchedStore = res?.find(
        (res) => res.restaurantId == restaurantId && res.storeId == storeId
      );
      if (res) {
        if (!QRcode) {
          setShow(true);
          // const del = localStorage.getItem("deliveryType");
          // console.log("aaa del", del);
          const delObj = {
            // ...del,
            qrcode: null,
            tableId: null,
          };
          dispatch(setDeliveryType(delObj));
        } else if (QRcode && matchedStore) {
          setQrshow(true);
          const delObj = {
            ...matchedStore,
            type: "collect",
            selectedAddress: null,
            qrcode: QRcode,
            tableId: tableId,
          };
          dispatch(setDeliveryType(delObj));
        } else {
          toast.error(
            "Store not found for this QR, Pleace select store manually!"
          );
          setShow(true);
        }
      }
    });

  //  dispatch(getActiveCSS(window.restId, "ALL", "HOME", "Banner"));
  }, [auth.authenticate]);

  console.log("aaa show", show);

  return (
    <div>
      <ScrollingProvider>
        <Header></Header>
        <Section id="home">
          {banners != undefined ?(<MyCarousel></MyCarousel>):null}
          
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
      {qrshow ? <QRCodeModal delay={0}></QRCodeModal> : null}
      {/* {<DeliveryTypeModal delay={0}></DeliveryTypeModal>} */}
    </div>
  );
}
