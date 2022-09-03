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

  const renderDiscount = (isOnlyValue) => {
    if (props.fullResp.discountPercentage) {
      const grandTotal = Number(props.grandTot);
      const currentPerc = 100 - Number(props.fullResp.discountPercentage);
      const divide = grandTotal / currentPerc;
      const divde100mul = divide * 100;

      const disc = divde100mul - grandTotal;

      if (isOnlyValue) {
        return disc.toFixed(2);
      } else {
        return <span>(- Rs. {disc.toFixed(2)})</span>;
      }
    } else {
      if (isOnlyValue) {
        return 0;
      } else {
        return <span>(- Rs. 0)</span>;
      }
    }
  };

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
                    {row.subProductId !== "NAA" ? (
                      <span style={{ marginLeft: "15px" }}>
                        {row.ingredient}
                      </span>
                    ) : (
                      <span> {row.productName}</span>
                    )}
                  </CusTableCell>
                  <CusTableCell>{row.quantity}</CusTableCell>
                  <CusTableCell
                    sx={{ padding: "0px 5px 0px 0px", minWidth: "90px" }}
                  >
                    Rs. {row.price}.00
                  </CusTableCell>
                  <CusTableCell sx={{ padding: 0 }}>
                    Rs. {Number(row.quantity) * Number(row.price)}.00
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
                Rs. {Number(props.grandTot) + Number(renderDiscount(true))}
              </CusTableCell>
            </TableRow>

            {props.fullResp.discountPercentage &&
            Number(props.fullResp.discountPercentage) ? (
              <TableRow>
                <CusTableCell component="th" scope="row" colspan="3">
                  Discount
                </CusTableCell>
                <CusTableCell
                  component="th"
                  scope="row"
                  colspan="1"
                  sx={{ fontStyle: "italic" }}
                >
                  {renderDiscount()}
                </CusTableCell>
              </TableRow>
            ) : null}

            {props.fullResp.couponCode ? (
              <TableRow>
                <CusTableCell component="th" scope="row" colspan="3">
                  Coupon Code
                </CusTableCell>
                <CusTableCell
                  component="th"
                  scope="row"
                  colspan="1"
                  sx={{ fontStyle: "italic" }}
                >
                  {props.fullResp.couponCode}
                </CusTableCell>
              </TableRow>
            ) : null}

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
                Rs. {props.cgst}
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
                Rs. {props.sgst}
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
                Rs. {props.fullResp.deliveryCharges}
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
                Rs. {props.overallPriceWithTax}
              </CusTableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : null}
    </div>
  );
};
