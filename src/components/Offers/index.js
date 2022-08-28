import React from "react";
import { Card } from "react-bootstrap";
import offers from "../../img/offerBanner.png";

export const Offers = () => {
  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <Card style={{ width: "100%" }}>
        <Card.Img variant="top" src={offers} />
      </Card>
    </div>
  );
};
