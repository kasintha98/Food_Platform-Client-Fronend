import React from "react";
import { Container } from "react-bootstrap";
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
      <Container
        style={{ marginTop: "60px", minHeight: "calc(100vh - 180px)" }}
      >
        <div className="text-center">
          <h2>My Cart</h2>
        </div>
        <div style={{ marginTop: "-40px" }}>
          <NewCart></NewCart>
        </div>
      </Container>
      <Footer></Footer>
      {isMobile ? <BottomNav></BottomNav> : null}
    </div>
  );
};
