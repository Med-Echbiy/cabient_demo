import { DialogActions } from "@mui/material";
import React from "react";

const UISkeleton = () => (
  <div className="w-full min-w-[900px] aspect-square flex flex-col justify-center items-center gap-y-6 p-4">
    <div
      className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
    </div>
    <h3>Loading...</h3>
  </div>
);

export default UISkeleton;
