import React from "react";
import UploadZone from "../Components/UploadZone";

const Split = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-6">Split PDF</h2>
      <UploadZone accept="application/pdf" buttonLabel="Select PDF to Split" />
    </div>
  );
};

export default Split;
