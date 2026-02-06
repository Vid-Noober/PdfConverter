import React from "react";
import UploadZone from "../Components/UploadZone";

const Compress = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-6">Compress PDF</h2>
      <UploadZone accept="application/pdf" buttonLabel="Select PDF to Compress" />
    </div>
  );
};

export default Compress;
