import React from "react";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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
              <TableCell>Dish Name</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.allProducts.map((row) => (
              <>
                <TableRow
                  key={row.orderId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    {row.productId}
                    {row.subProductId !== "NAA" && (
                      <span>
                        {" - "}
                        {row.subProductId}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.price}.00</TableCell>
                  <TableCell>
                    {Number(row.quantity) * Number(row.price)}.00
                  </TableCell>
                </TableRow>
                {/* {row.choiceIng ? (
                <TableRow key={row.choiceIng.id}>
                  <TableCell>
                    {row.choiceIng.ingredientType}-{row.choiceIng.size}
                  </TableCell>
                  <TableCell>
                    {row.choiceIng.qty ? row.choiceIng.qty : 1}
                  </TableCell>
                  <TableCell>{row.choiceIng.price}.00</TableCell>
                  <TableCell>{row.choiceIng.price}.00</TableCell>
                </TableRow>
              ) : null} */}
                {/* {Object.keys(row.extra)
                ? Object.keys(row.extra).map((rw) => (
                    <TableRow key={rw.id}>
                      <TableCell>
                        {rw.ingredientType}-{rw.size}
                      </TableCell>
                      <TableCell>{rw.qty ? rw.qty : 1}</TableCell>
                      <TableCell>{rw.price}.00</TableCell>
                      <TableCell>{rw.price}.00</TableCell>
                    </TableRow>
                  ))
                : null} */}
              </>
            ))}
            <TableRow>
              <TableCell component="th" scope="row" colspan="3">
                Total
              </TableCell>
              <TableCell component="th" scope="row" colspan="1">
                {props.grandTot}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" colspan="3">
                CGST
              </TableCell>
              <TableCell component="th" scope="row" colspan="1">
                {props.cgst}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" colspan="3">
                SGST
              </TableCell>
              <TableCell component="th" scope="row" colspan="1">
                {props.sgst}
              </TableCell>
            </TableRow>
            {/* <TableRow>
              <TableCell component="th" scope="row" colspan="3">
                Delivery Charges
              </TableCell>
              <TableCell component="th" scope="row" colspan="1">
                {props.delCharge}
              </TableCell>
            </TableRow> */}
            <TableRow>
              <TableCell component="th" scope="row" colspan="3">
                Grand Total
              </TableCell>
              <TableCell component="th" scope="row" colspan="1">
                {props.overallPriceWithTax}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : null}
    </div>
  );
};
