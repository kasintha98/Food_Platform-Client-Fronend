import React from "react";
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

export default function HomePage(props) {
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });

  return (
    <div>
      <ScrollingProvider>
        <Header></Header>
        <Section id="home">
          <MyCarousel></MyCarousel>
        </Section>
        <Container>
          <Section id="about">
            <About></About>
          </Section>
          <Section id="chef">
            <Chef></Chef>
          </Section>
          {/* <Section id="menu">
            <CategoryGallery></CategoryGallery>
          </Section> */}
          <Section id="contact">
            <Contact></Contact>
          </Section>
        </Container>
        <Footer></Footer>
        {isMobile ? <BottomNav></BottomNav> : null}
      </ScrollingProvider>
    </div>
  );
}
