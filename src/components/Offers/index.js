import React, {useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import offers from "../../img/offerBanner.png";

import { useSelector } from "react-redux";
import { imagePathHome } from "../../urlConfig";

export const Offers = () => {

  const [offer_img, setOfferImg] = useState("");

  // var offerImg = "https://storage.googleapis.com/hangries-dev/R002/Offers.jpg";

  const allCss = useSelector((state) => state.store.allActiveCSS);

  useEffect(() => {
    if (allCss != undefined) {
      allCss.forEach((category) => {
        if (category.subCategory == "Offers") {
          // offerImg = imagePathHome+"/"+window.restId+"/"+category.imagePath;
          setOfferImg(imagePathHome+"/"+window.restId+"/"+category.imagePath);
          // offerImg = category.imagePath;

          // console.log(offerImg + " offerImg ===========", `${imagePathHome}/${window.restId}/${offerImg}`);
        }
      })
    }
  }, [allCss]);

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <Card style={{ width: "100%" }}>
        {/* <Card.Img variant="top" src={offers} /> */}
        <Card.Img variant="top" src={offer_img} />

        {/* <Card.Img variant="top" src="https://storage.googleapis.com/hangries-dev/R002/Offers.jpg" /> */}

      </Card>
    </div>
  );
};
