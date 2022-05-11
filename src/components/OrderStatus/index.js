import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Delivered from "../../img/Delivered.jpg";
import FoodPreparing from "../../img/FoodPreparing.jpg";
import FoodReady from "../../img/FoodReady.jpg";
import OrderAccepted from "../../img/OrderAccepted.jpg";
import OrderCancelled from "../../img/OrderCancelled.jpg";
import OrderSubmitted from "../../img/OrderSubmitted.jpg";
import OutforDelivery from "../../img/OutforDelivery.jpg";
import "./style.css";

export const OrderStatus = (props) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const allList = props.orderItems;
    console.log("Order Status");
    const sortedList = allList.sort(function (a, b) {
      var c = new Date(a.updatedDate);
      var d = new Date(b.updatedDate);
      return c - d;
    });

    if (!sortedList.some((e) => e.orderStatus === "SUBMITTED")) {
      const ob = {
        orderStatus: "SUBMITTED",
        updatedDate: "manual",
      };
      sortedList.push(ob);
    }

    if (!sortedList.some((e) => e.orderStatus === "ACCEPTED")) {
      const ob = {
        orderStatus: "ACCEPTED",
        updatedDate: "manual",
      };
      sortedList.push(ob);
    }

    if (!sortedList.some((e) => e.orderStatus === "PROCESSING")) {
      const ob = {
        orderStatus: "PROCESSING",
        updatedDate: "manual",
      };
      sortedList.push(ob);
    }

    if (!sortedList.some((e) => e.orderStatus === "FOOD READY")) {
      const ob = {
        orderStatus: "FOOD READY",
        updatedDate: "manual",
      };
      sortedList.push(ob);
    }

    if (!sortedList.some((e) => e.orderStatus === "OUT FOR DELIVERY")) {
      const ob = {
        orderStatus: "OUT FOR DELIVERY",
        updatedDate: "manual",
      };
      sortedList.push(ob);
    }

    if (!sortedList.some((e) => e.orderStatus === "DELIVERED")) {
      const ob = {
        orderStatus: "DELIVERED",
        updatedDate: "manual",
      };
      sortedList.push(ob);
    }

    setList(sortedList);
  }, [props.orderItems]);

  const renderDate = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("default", { month: "short" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return (
      <span>
        {day}/{month.toUpperCase()}/{year}
      </span>
    );
  };

  const renderPic = (item) => {
    if (item.orderStatus === "SUBMITTED") {
      return (
        <img
          src={OrderSubmitted}
          alt={item.orderStatus}
          style={{ width: "100%", marginLeft: "-5vw" }}
        />
      );
    }

    if (item.orderStatus === "ACCEPTED") {
      return (
        <img
          src={OrderAccepted}
          alt={item.orderStatus}
          style={{ width: "100%", marginLeft: "-5vw" }}
        />
      );
    }

    if (item.orderStatus === "PROCESSING") {
      return (
        <img
          src={FoodPreparing}
          alt={item.orderStatus}
          style={{ width: "100%", marginLeft: "-5vw" }}
        />
      );
    }

    if (item.orderStatus === "FOOD READY") {
      return (
        <img
          src={FoodReady}
          alt={item.orderStatus}
          style={{ width: "100%", marginLeft: "-5vw" }}
        />
      );
    }

    if (item.orderStatus === "OUT FOR DELIVERY") {
      return (
        <img
          src={OutforDelivery}
          alt={item.orderStatus}
          style={{ width: "100%", marginLeft: "-5vw" }}
        />
      );
    }

    if (item.orderStatus === "DELIVERED") {
      return (
        <img
          src={Delivered}
          alt={item.orderStatus}
          style={{ width: "100%", marginLeft: "-5vw" }}
        />
      );
    }

    if (item.orderStatus === "CANCELLED") {
      return (
        <img
          src={OrderCancelled}
          alt={item.orderStatus}
          style={{ width: "100%", marginLeft: "-5vw" }}
        />
      );
    }
    return <span></span>;
  };

  return (
    <div>
      <div
        style={{
          boxSizing: "border-box",
          padding: "100px",
          display: "flex",
          /* marginTop: "6vw",*/
          paddingTop: "150px",
        }}
        className="new-outer"
      >
        <div className="orderTrack">
          {list.map((item) => (
            <>
              <div
                className={`orderStatus ${
                  item.updatedDate !== "manual" ? "active" : ""
                }`}
              >
                <div
                  className={`point ${
                    item.updatedDate !== "manual" ? "active" : ""
                  }`}
                ></div>
                <div className="imagecont">{renderPic(item)}</div>
                <div className="orderInfo">
                  <div className="status"></div>
                  <div className="date">
                    <span>
                      {item.updatedDate !== "manual" ? item.orderStatus : null}
                    </span>
                    <br></br>
                    <span>
                      {item.updatedDate !== "manual"
                        ? renderDate(item.updatedDate)
                        : null}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
