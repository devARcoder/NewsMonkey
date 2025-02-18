import React from "react";
import loading from "./loading.gif";
const Spinner = () => {
  return (
    <div>
      <img className="w-28 h-28" src={loading} alt="loading" />
    </div>
  );
};

export default Spinner;
