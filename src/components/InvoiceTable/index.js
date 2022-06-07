import React from "react";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styled from "@emotion/styled";

const CusTableCell = styled(TableCell)`
  color: black;
`;

export const InvoiceTable = (props) => {
  const cart = useSelector((state) => state.cart);

  return (
    <div>
      {props.allProducts ? (
        <Table
          sx={{ width: "100%", overflowX: "auto" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <CusTableCell>Dish Name</CusTableCell>
              <CusTableCell>Qty</CusTableCell>
              <CusTableCell>Rate</CusTableCell>
              <CusTableCell>Amount</CusTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.allProducts.map((row) => (
              <>
                <TableRow
                  key={row.orderId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <CusTableCell>
                    {row.productName}
                    {row.subProductId !== "NAA" && (
                      <span>
                        {" - "}
                        {row.ingredient}
                      </span>
                    )}
                  </CusTableCell>
                  <CusTableCell>{row.quantity}</CusTableCell>
                  <CusTableCell>{row.price}.00</CusTableCell>
                  <CusTableCell>
                    {Number(row.quantity) * Number(row.price)}.00
                  </CusTableCell>
                </TableRow>
                {/* {row.choiceIng ? (
                <TableRow key={row.choiceIng.id}>
                  <CusTableCell>
                    {row.choiceIng.ingredientType}-{row.choiceIng.size}
                  </CusTableCell>
                  <CusTableCell>
                    {row.choiceIng.qty ? row.choiceIng.qty : 1}
                  </CusTableCell>
                  <CusTableCell>{row.choiceIng.price}.00</CusTableCell>
                  <CusTableCell>{row.choiceIng.price}.00</CusTableCell>
                </TableRow>
              ) : null} */}
                {/* {Object.keys(row.extra)
                ? Object.keys(row.extra).map((rw) => (
                    <TableRow key={rw.id}>
                      <CusTableCell>
                        {rw.ingredientType}-{rw.size}
                      </CusTableCell>
                      <CusTableCell>{rw.qty ? rw.qty : 1}</CusTableCell>
                      <CusTableCell>{rw.price}.00</CusTableCell>
                      <CusTableCell>{rw.price}.00</CusTableCell>
                    </TableRow>
                  ))
                : null} */}
              </>
            ))}
            <TableRow sx={{ borderTop: "2px solid black" }}>
              <CusTableCell component="th" scope="row" colspan="3">
                Total
              </CusTableCell>
              <CusTableCell
                component="th"
                scope="row"
                colspan="1"
                sx={{ fontStyle: "italic" }}
              >
                {props.grandTot}
              </CusTableCell>
            </TableRow>
            <TableRow>
              <CusTableCell component="th" scope="row" colspan="3">
                CGST
              </CusTableCell>
              <CusTableCell
                component="th"
                scope="row"
                colspan="1"
                sx={{ fontStyle: "italic" }}
              >
                {props.cgst}
              </CusTableCell>
            </TableRow>
            <TableRow>
              <CusTableCell component="th" scope="row" colspan="3">
                SGST
              </CusTableCell>
              <CusTableCell
                component="th"
                scope="row"
                colspan="1"
                sx={{ fontStyle: "italic" }}
              >
                {props.sgst}
              </CusTableCell>
            </TableRow>
            <TableRow>
              <CusTableCell component="th" scope="row" colspan="3">
                Delivery Charges
              </CusTableCell>
              <CusTableCell
                component="th"
                scope="row"
                colspan="1"
                sx={{ fontStyle: "italic" }}
              >
                {props.fullResp.deliveryCharges}
              </CusTableCell>
            </TableRow>
            <TableRow
              sx={{
                borderTop: "2px solid black",
                borderBottom: "2px solid black",
              }}
            >
              <CusTableCell component="th" scope="row" colspan="3">
                Grand Total
              </CusTableCell>
              <CusTableCell component="th" scope="row" colspan="1">
                {props.overallPriceWithTax}
              </CusTableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : null}
    </div>
  );
};
