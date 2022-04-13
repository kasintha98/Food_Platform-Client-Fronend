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

export const MyOrders = () => {
  return (
    <div>
      <Header></Header>
      <Container style={{ marginTop: "80px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ORDER NO</TableCell>
                <TableCell align="right">ORDER TYPE</TableCell>
                <TableCell align="right">ORDER DATE</TableCell>
                <TableCell align="right">ITEMS ORDERED</TableCell>
                <TableCell align="right">PRICE</TableCell>
                <TableCell align="right">PAYMENT TYPE</TableCell>
                <TableCell align="right">TOTAL</TableCell>
                <TableCell align="right">ADDRESS</TableCell>
                <TableCell align="right">ORDER STATUS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">A</TableCell>
                <TableCell align="right">B</TableCell>
                <TableCell align="right">C</TableCell>
                <TableCell align="right">D</TableCell>
                <TableCell align="right">E</TableCell>
                <TableCell align="right">B</TableCell>
                <TableCell align="right">C</TableCell>
                <TableCell align="right">D</TableCell>
                <TableCell align="right">E</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Footer></Footer>
    </div>
  );
};
