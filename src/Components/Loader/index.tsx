import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <ClipLoader color="black" />
    </div>
  );
};

export default Loader;
