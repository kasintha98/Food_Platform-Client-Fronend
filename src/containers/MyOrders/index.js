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
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Row, Col, Modal } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import {
  GetUserOrdersNew,
  GetOrderProcessStatus2,
  getAllStores,
} from "../../actions";
import { OrderStatus } from "../../components/OrderStatus";
import { useMediaQuery } from "react-responsive";
import { BottomNav } from "../../components/BottomNav";
import { InvoiceTable } from "../../components/InvoiceTable";
import store from "../../store";
import Pdf from "react-to-pdf";

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
  const stores = useSelector((state) => state.store.stores);

  const [allStatus, setAllStatus] = useState({});
  const [tabValue, setTabValue] = useState(0);
  const [showInvoice, setShowInvoice] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [filteredStoreAddress, setFilteredStoreAddress] = useState(null);
  const [height, setHeight] = useState(0);

  const loggedUser = useSelector((state) => state.auth.user);
  const loggedDeliveryType = useSelector((state) => state.auth.deliveryType);

  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });

  const dispatch = useDispatch();
  const ref = React.createRef();
  const refH = React.useRef(null);

  useEffect(() => {
    if (loggedUser && loggedUser.id && loggedDeliveryType) {
      dispatch(GetUserOrdersNew(loggedUser, loggedDeliveryType)).then((res) => {
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
    }
  }, []);

  useEffect(() => {
    if (refH.current) {
      setHeight(refH.current.clientHeight * 0.58);
    }
  });

  useEffect(() => {
    dispatch(getAllStores());
  }, []);

  const options = {
    unit: "px",
    format: [255, height],
  };

  const handleNavTab = (val) => {
    console.log(val);
    setTabValue(val);
  };

  const handleCloseInvoice = () => {
    setShowInvoice(false);
  };
  const handleShowInvoice = () => setShowInvoice(true);

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

  const renderTime = (date) => {
    const dateObj = new Date(date);
    const time = dateObj.toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
    });

    return <span>{time}</span>;
  };

  const handleFilteredStoreAddress = (curOrd) => {
    let fil = stores.filter(function (el) {
      return (
        el.restaurantId <= curOrd.restaurantId && el.storeId >= curOrd.storeId
      );
    });
    setFilteredStoreAddress(fil[0]);
    console.log(fil[0]);
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

  const renderInvoiceModal = () => {
    return (
      <Modal show={showInvoice} onHide={handleCloseInvoice}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Typography>Invoice</Typography>
          </Modal.Title>
        </Modal.Header>
        {currentOrder ? (
          <Modal.Body style={{ maxHeight: "75vh", overflowY: "auto" }}>
            {filteredStoreAddress ? (
              <div ref={ref}>
                <div ref={refH}>
                  <div className="text-center">
                    <Typography sx={{ fontWeight: "600" }}>Hangries</Typography>
                    <Typography sx={{ color: "#A6A6A6" }}>
                      <span>{filteredStoreAddress.address1}</span>
                      {filteredStoreAddress.address2 ? (
                        <>
                          , <span>{filteredStoreAddress.address2}</span>
                        </>
                      ) : null}
                      {filteredStoreAddress.address3 ? (
                        <>
                          , <br></br>
                          <span>{filteredStoreAddress.address3}</span>
                        </>
                      ) : null}
                      , {filteredStoreAddress.city}
                      {filteredStoreAddress.zipCode ? (
                        <>, {filteredStoreAddress.zipCode}</>
                      ) : null}
                      , {filteredStoreAddress.country}
                    </Typography>
                    <Typography sx={{ fontWeight: "600" }}>
                      Order ID: {currentOrder ? currentOrder.orderId : null}
                    </Typography>
                    <Typography sx={{ fontWeight: "600" }}>
                      Customer Name:{" "}
                      {currentOrder ? currentOrder.customerName : null}
                    </Typography>
                    <Typography sx={{ fontWeight: "600" }}>
                      Order No: {currentOrder ? currentOrder.id : null}
                    </Typography>
                    <Typography sx={{ fontWeight: "600" }}>
                      {currentOrder.orderDeliveryType === "delivery" ? (
                        <span>Delivery</span>
                      ) : (
                        <span>Self-Collect</span>
                      )}
                      <span>
                        {" "}
                        [{currentOrder ? currentOrder.paymentStatus : null}]
                      </span>
                    </Typography>
                  </div>
                  <hr></hr>
                  <div>
                    {/* <Typography>
                    Name: {auth.user?.firstName} {auth.user?.lastName}
                  </Typography> */}

                    <Typography>
                      {/* <p
                                      style={{
                                        fontWeight: "bold",
                     
                                      }}
                                    >
                                      {selectedAddress.customerAddressType}
                                    </p> */}
                      <p
                        style={{
                          color: "#7F7F7F",
                        }}
                      >
                        {currentOrder.address}
                      </p>
                    </Typography>

                    {/* <Typography>Mob No: {auth.user?.mobileNumber}</Typography> */}
                  </div>
                  <hr></hr>
                  <div>
                    <Typography>
                      <Row>
                        <Col>Time: {renderTime(currentOrder.createdDate)}</Col>
                        <Col>Date: {renderDate(currentOrder.createdDate)}</Col>
                      </Row>
                    </Typography>
                  </div>
                  <hr></hr>
                  <div>
                    <InvoiceTable
                      allProducts={currentOrder.orderDetails}
                      grandTot={currentOrder.totalPrice}
                      cgst={currentOrder.cgstCalculatedValue}
                      sgst={currentOrder.sgstCalculatedValue}
                      overallPriceWithTax={currentOrder.overallPriceWithTax}
                      delCharge={currentOrder.deliveryCharges}
                      fullResp={currentOrder}
                    ></InvoiceTable>
                  </div>
                </div>
              </div>
            ) : null}
          </Modal.Body>
        ) : null}

        <Modal.Footer>
          <Row className="w-100">
            <Col className="col-6">
              <Button
                color="secondary"
                onClick={handleCloseInvoice}
                className="w-100"
                variant="contained"
              >
                Close
              </Button>
            </Col>
            <Col className="col-6">
              <Pdf
                targetRef={ref}
                filename="invoice.pdf"
                options={options}
                x={0.8}
              >
                {({ toPdf }) => (
                  <Button
                    color="primary"
                    onClick={toPdf}
                    className="w-100"
                    variant="contained"
                  >
                    Download Invoice
                  </Button>
                )}
              </Pdf>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    );
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
          {userOrders && userOrders.length > 0 ? (
            <>
              {/* <Table sx={{ minWidth: "1000px" }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <CusTableHead align="center">ORDER NO#</CusTableHead>
                    <CusTableHead align="center">ORDER TYPE</CusTableHead>
                    <CusTableHead align="center">ORDER DATE</CusTableHead>
                    <CusTableHead align="center">ITEMS ORDERED</CusTableHead>
                    <CusTableHead align="center">PRICE</CusTableHead>
                    <CusTableHead align="center">PAYMENT TYPE</CusTableHead>
                    <CusTableHead align="center">
                      TOTAL (INCL. GST)
                    </CusTableHead>
                    <CusTableHead align="center">ADDRESS</CusTableHead>
                    <CusTableHead align="center">ORDER STATUS</CusTableHead>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userOrders.map((order) => (
                    <>
                      <TableRow>
                        <CusTableCell align="right">
                          {order.orderId}
                        </CusTableCell>
                        <CusTableCell align="right">
                          {order.orderDeliveryType}
                        </CusTableCell>
                        <CusTableCell align="right">
                          {renderDate(order.createdDate)}
                        </CusTableCell>
                        <CusTableCell align="right">
                          {order.orderDetails.map((item) => (
                            <span>
                              {item.productName}
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
                        <CusTableCell align="right">
                          {order.paymentMode} : {order.paymentStatus}
                        </CusTableCell>
                        <CusTableCell align="right">
                          ₹ {order.overallPriceWithTax}
                        </CusTableCell>
                        <CusTableCell align="right">
                          {order.address}
                        </CusTableCell>
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
              </Table> */}
              {userOrders.map((order) => (
                <div className="p-3">
                  <Row className="align-items-center">
                    <Col className="col-9">
                      <Typography sx={{ fontWeight: "bold" }}>
                        ORDER NO : {order.orderId}
                      </Typography>
                      <Typography sx={{ fontWeight: "bold" }}>
                        DATE : {renderDate(order.createdDate)}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>ADDRESS :</span>{" "}
                        <span style={{ color: "#7F7F7F" }}>
                          {order.address}
                        </span>
                      </Typography>
                      <Typography sx={{ fontWeight: "bold" }}>
                        TOTAL (INCL. GST) : ₹ {order.overallPriceWithTax}
                      </Typography>
                      <div>{renderOrder(order.orderId)}</div>
                    </Col>
                    <Col className="col-3">
                      <Button
                        variant="text"
                        color="success"
                        onClick={() => {
                          setCurrentOrder(order);
                          handleFilteredStoreAddress(order);
                          handleShowInvoice();
                          console.log(order);
                        }}
                      >
                        View Details
                      </Button>
                    </Col>
                  </Row>
                  <div
                    style={{
                      height: "2px",
                      width: "100%",
                      backgroundColor: "#5B9BD5",
                    }}
                  ></div>
                </div>
              ))}
            </>
          ) : (
            <Alert severity="warning">You have no orders!</Alert>
          )}
        </TableContainer>
      </Container>

      <Footer></Footer>
      {isMobile ? <BottomNav onChangeTab={handleNavTab}></BottomNav> : null}
      {renderInvoiceModal()}
    </div>
  );
};
