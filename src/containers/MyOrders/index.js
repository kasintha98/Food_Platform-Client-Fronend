import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Container } from "react-bootstrap";
import styled from "@emotion/styled";

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
  return (
    <div>
      <Header></Header>
      <Container
        style={{ marginTop: "120px", minHeight: "calc(100vh - 500px)" }}
      >
        <TableContainer component={Paper}>
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
              <TableRow>
                <CusTableCell align="right">A</CusTableCell>
                <CusTableCell align="right">B</CusTableCell>
                <CusTableCell align="right">C</CusTableCell>
                <CusTableCell align="right">D</CusTableCell>
                <CusTableCell align="right">E</CusTableCell>
                <CusTableCell align="right">B</CusTableCell>
                <CusTableCell align="right">C</CusTableCell>
                <CusTableCell align="right">D</CusTableCell>
                <CusTableCell align="right">E</CusTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Footer></Footer>
    </div>
  );
};
