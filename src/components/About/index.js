import React, {useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import res from "../../img/res.jpg";
import logo from "../../img/logo.jpg";
import about from "../../img/about.jpg";

import { useSelector } from "react-redux";
import { imagePath_dev } from "../../urlConfig";

export default function About() {

  const [aboutImg, setAboutImg] = useState("");

  const allCss = useSelector((state) => state.store.allActiveCSS);

  useEffect(() => {
    if (allCss != undefined) {
      allCss.forEach((category) => {
        if (category.subCategory == "About_us") {
          setAboutImg(imagePath_dev+"/"+window.restId+"/"+category.imagePath)
        }
      })
    }
  }, [allCss]);

  return (
    <div style={{ marginTop: "40px" }}>
      <Card style={{ width: "100%" }}>
      {/* <Card.Img variant="top" src={about} /> */}
      <Card.Img variant="top" src={aboutImg} />
        {/* <Card.Img variant="top" src={`${imagePath_dev}/${window.restId}/${aboutUsImg}`} /> */}
        {/* <Card.Img variant="top" src="https://storage.googleapis.com/hangries-dev/R002/Banner3.jpg" /> */}
      </Card>
    </div>
  );
}
