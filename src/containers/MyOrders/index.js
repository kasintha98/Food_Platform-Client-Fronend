import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Typography from "@mui/material/Typography";
import { Container, Row, Col } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { GetUserOrdersNew, GetOrderProcessStatus2 } from "../../actions";
import { OrderStatus } from "../../components/OrderStatus";
import { useMediaQuery } from "react-responsive";
import { BottomNav } from "../../components/BottomNav";

const CusTableHead = styled(TableCell)`
  background-color: #000137;
  color: #fff;
  border: 1px solid #fff;
  font-size: 0.7rem;
  padding: 2px;
`;

const CusTableCell = styled(TableCell)`
  background-color: #d3d3d3;
  border: 1px solid #fff;
  font-size: 0.75rem;
`;

export const MyOrders = () => {
  const userOrders = useSelector((state) => state.user.userOrders);
  const [allStatus, setAllStatus] = useState({});
  const [tabValue, setTabValue] = useState(0);

  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });

  const dispatch = useDispatch();

  useEffect(() => {
    const id = localStorage.getItem("userId");
    dispatch(GetUserOrdersNew(id)).then((res) => {
      if (res && res.length > 0) {
        let ob = {};
        for (let j = 0; j < res.length; j++) {
          dispatch(GetOrderProcessStatus2(res[j].orderId)).then((res2) => {
            if (res2 && res2.length > 0) {
              for (let i = 0; i < res2.length; i++) {
                const newPair = { [res2[i].orderId]: res2 };
                //ob[res2[i].orderId] = res2;
                ob = { ...ob, ...newPair };
              }
              console.log(ob);
              setAllStatus(ob);
            }
          });
        }
      }
    });
  }, []);

  const handleNavTab = (val) => {
    console.log(val);
    setTabValue(val);
  };

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

  const renderOrder = (id) => {
    if (allStatus && Object.keys(allStatus).length > 0 && allStatus[id]) {
      return (
        <div
          className="mt-2"
          style={{
            backgroundColor: "#fff",
            overflowX: "auto",
            overflowY: "hidden",
            minHeight: "150px",
          }}
        >
          <OrderStatus orderItems={allStatus[id]} noPic={true}></OrderStatus>
        </div>
      );
    } else {
      return (
        <Alert severity="warning">
          No data found for order process details!
        </Alert>
      );
    }
  };

  return (
    <div
      style={{
        backgroundColor: "rgb(233, 237, 239)",
      }}
    >
      <Header></Header>
      <Container
        style={{
          marginTop: "50px",
          paddingTop: "20px",
          minHeight: "calc(100vh - 500px)",
        }}
      >
        <Typography
          sx={{ textAlign: "center", marginBottom: "20px" }}
          variant="h4"
          component="h4"
        >
          My Orders
        </Typography>
        <TableContainer component={Paper}>
          {userOrders ? (
            <Table sx={{ minWidth: "1000px" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <CusTableHead align="center">ORDER NO#</CusTableHead>
                  <CusTableHead align="center">ORDER TYPE</CusTableHead>
                  <CusTableHead align="center">ORDER DATE</CusTableHead>
                  <CusTableHead align="center">ITEMS ORDERED</CusTableHead>
                  <CusTableHead align="center">PRICE</CusTableHead>
                  <CusTableHead align="center">PAYMENT TYPE</CusTableHead>
                  <CusTableHead align="center">TOTAL (INCL. GST)</CusTableHead>
                  <CusTableHead align="center">ADDRESS</CusTableHead>
                  <CusTableHead align="center">ORDER STATUS</CusTableHead>
                </TableRow>
              </TableHead>
              <TableBody>
                {userOrders.map((order) => (
                  <>
                    <TableRow>
                      <CusTableCell align="right">{order.orderId}</CusTableCell>
                      <CusTableCell align="right">
                        {order.orderDeliveryType}
                      </CusTableCell>
                      <CusTableCell align="right">
                        {renderDate(order.createdDate)}
                      </CusTableCell>
                      <CusTableCell align="right">
                        {order.orderDetails.map((item) => (
                          <span>
                            {item.productId}
                            <br></br>
                          </span>
                        ))}
                      </CusTableCell>
                      <CusTableCell align="right">
                        {order.orderDetails.map((item) => (
                          <span>
                            ₹ {item.price}.00
                            <br></br>
                          </span>
                        ))}
                      </CusTableCell>
                      <CusTableCell align="right">B</CusTableCell>
                      <CusTableCell align="right">
                        ₹ {order.overallPriceWithTax}
                      </CusTableCell>
                      <CusTableCell align="right">D</CusTableCell>
                      <CusTableCell align="right">
                        {order.orderStatus}
                      </CusTableCell>
                    </TableRow>
                    <TableRow>
                      <CusTableCell></CusTableCell>
                      <CusTableCell></CusTableCell>
                      <CusTableCell></CusTableCell>
                      <CusTableCell></CusTableCell>
                      <CusTableCell align="right">
                        <Row className="p-0 m-0">
                          <Col className="p-0 m-0">
                            <span>Total</span>
                          </Col>
                          <Col className="p-0 m-0">
                            <span>₹ {order.totalPrice}</span>
                          </Col>
                        </Row>
                        <Row className="p-0 m-0">
                          <Col className="p-0 m-0">
                            <span>CGST</span>
                          </Col>
                          <Col className="p-0 m-0">
                            <span>₹ {order.cgstCalculatedValue}</span>
                          </Col>
                        </Row>

                        <Row className="p-0 m-0">
                          <Col className="p-0 m-0">
                            <span>SGST</span>
                          </Col>
                          <Col className="p-0 m-0">
                            <span>₹ {order.sgstCalculatedValue}</span>
                          </Col>
                        </Row>
                        <Row className="p-0 m-0">
                          <Col className="p-0 m-0">
                            <span>Delivery</span>
                          </Col>
                          <Col className="p-0 m-0">
                            <span>₹ {order.deliveryCharges}</span>
                          </Col>
                        </Row>
                      </CusTableCell>
                      <CusTableCell></CusTableCell>
                      <CusTableCell></CusTableCell>
                      <CusTableCell></CusTableCell>
                      <CusTableCell></CusTableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" colspan="9">
                        {renderOrder(order.orderId)}
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Alert severity="warning">You have no orders!</Alert>
          )}
        </TableContainer>
      </Container>

      <Footer></Footer>
      {isMobile ? <BottomNav onChangeTab={handleNavTab}></BottomNav> : null}
    </div>
  );
};
