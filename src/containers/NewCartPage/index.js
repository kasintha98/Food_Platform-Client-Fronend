import React from "react";
import { NewCart } from "../NewCart";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BottomNav } from "../../components/BottomNav";
import { useMediaQuery } from "react-responsive";

export const NewCartPage = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });
  return (
    <div>
      <Header></Header>
      <NewCart></NewCart>
      <Footer></Footer>
      {isMobile ? <BottomNav></BottomNav> : null}
    </div>
  );
};
