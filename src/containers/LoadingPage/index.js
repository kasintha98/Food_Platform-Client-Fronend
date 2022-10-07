import React from "react";
import Typography from "@mui/material/Typography";
import "./style.css";

export const LoadingPage = () => {
  return (
    <div className="w-100 text-center" style={{ marginTop: "200px" }}>
      <div class="lds-dual-ring"></div>
      <div>
        <Typography style={{ marginRight: "70px" }}>Loading...</Typography>
      </div>
    </div>
  );
};
