import React from "react";
import UploadZone from "../Components/UploadZone";

const Merge = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-6">Merge PDF</h2>
      <UploadZone accept="application/pdf" buttonLabel="Select PDFs to Merge" />
    </div>
  );
};

export default Merge;
