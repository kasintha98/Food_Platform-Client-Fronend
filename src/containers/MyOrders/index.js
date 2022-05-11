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
import { Container } from "react-bootstrap";
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
`;

const CusTableCell = styled(TableCell)`
  background-color: #d3d3d3;
  border: 1px solid #fff;
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
        for (let j = 0; j < res.length; j++) {
          dispatch(GetOrderProcessStatus2(res.orderId)).then((res2) => {
            let ob = {};
            if (res2 && res2.length > 0) {
              for (let i = 0; i < res2.length; i++) {
                ob[res2[i].orderId] = res2;
              }
            }
            setAllStatus(ob);
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
    if (allStatus && Object.keys(allStatus).length > 0) {
      return (
        <div
          className="mt-2"
          style={{
            backgroundColor: "#fff",
            overflowX: "auto",
            overflowY: "hidden",
            minHeight: "270px",
          }}
        >
          <OrderStatus orderItems={allStatus[id]}></OrderStatus>
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
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <CusTableHead align="right">ORDER NO#</CusTableHead>
                  <CusTableHead align="right">ORDER TYPE</CusTableHead>
                  <CusTableHead align="right">ORDER DATE</CusTableHead>
                  <CusTableHead align="right">ITEMS ORDERED</CusTableHead>
                  <CusTableHead align="right">PRICE</CusTableHead>
                  <CusTableHead align="right">PAYMENT TYPE</CusTableHead>
                  <CusTableHead align="right">TOTAL (INCL. GST)</CusTableHead>
                  <CusTableHead align="right">ADDRESS</CusTableHead>
                  <CusTableHead align="right">ORDER STATUS</CusTableHead>
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
                            {item.price}.00
                            <br></br>
                          </span>
                        ))}
                      </CusTableCell>
                      <CusTableCell align="right">B</CusTableCell>
                      <CusTableCell align="right">
                        {order.totalPrice}.00
                      </CusTableCell>
                      <CusTableCell align="right">D</CusTableCell>
                      <CusTableCell align="right">
                        {order.orderStatus}
                      </CusTableCell>
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
