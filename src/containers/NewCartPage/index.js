import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { NewCart } from "../NewCart";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BottomNav } from "../../components/BottomNav";
import { useMediaQuery } from "react-responsive";
import Typography from "@mui/material/Typography";
import { getAllStores } from "../../actions";

export const NewCartPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStores());
  }, []);

  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });

  return (
    <div>
      <Header></Header>
      <Container
        style={{ marginTop: "60px", minHeight: "calc(100vh - 180px)" }}
      >
        <Typography
          sx={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#C00000",
            fontWeight: "bold",
          }}
          variant="h4"
          component="h4"
        >
          <span
            style={{
              width: "10vw",
              height: "5px",
              backgroundColor: "#C00000",
              display: "inline-block",
              marginBottom: "7px",
            }}
          ></span>{" "}
          MY CART{" "}
          <span
            style={{
              width: "10vw",
              height: "5px",
              backgroundColor: "#C00000",
              display: "inline-block",
              marginBottom: "7px",
            }}
          ></span>
        </Typography>
        <div style={{ marginTop: "-40px" }}>
          <NewCart></NewCart>
        </div>
      </Container>
      <Footer></Footer>
      {isMobile ? <BottomNav></BottomNav> : null}
    </div>
  );
};
