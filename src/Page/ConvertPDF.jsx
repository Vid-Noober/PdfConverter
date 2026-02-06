import { useState } from "react";
import UploadZone from "../Components/UploadZone";
import jsPDF from "jspdf";

export default function ConvertPDF() {
  const [files, setFiles] = useState([]);
  const [orientation, setOrientation] = useState("portrait");
  const [margin, setMargin] = useState("none");

  const marginValue = { none: 0, small: 10, big: 20 };

  const convertToPDF = async () => {
    const pdf = new jsPDF({ orientation, unit: "mm", format: "a4" });
    for (let i = 0; i < files.length; i++) {
      const imgData = await toDataURL(files[i]);
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const m = marginValue[margin];

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, "JPEG", m, m, pageWidth - m * 2, pageHeight - m * 2);
    }
    pdf.save("converted.pdf");
  };

  const toDataURL = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto">
      {/* LEFT */}
      <div className="grow">
        <UploadZone onFiles={(newFiles) => setFiles([...files, ...newFiles])} />
        {files.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {files.map((file, i) => (
              <div key={i} className="bg-white p-2 rounded shadow">
                <img
                  src={URL.createObjectURL(file)}
                  className="h-40 w-full object-contain"
                />
                <p className="text-xs mt-1 truncate">{file.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT: options */}
      <div className="w-full lg:w-80 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Image to PDF options</h2>

        <p className="font-medium mb-2">Page orientation</p>
        <div className="flex gap-3 mb-4">
          {["portrait", "landscape"].map((o) => (
            <button
              key={o}
              onClick={() => setOrientation(o)}
              className={`flex-1 border p-3 rounded ${
                orientation === o ? "border-red-500 text-red-500" : "border-gray-300"
              }`}
            >
              {o.charAt(0).toUpperCase() + o.slice(1)}
            </button>
          ))}
        </div>

        <p className="font-medium mb-2">Margin</p>
        <div className="flex gap-3 mb-6">
          {["none", "small", "big"].map((m) => (
            <button
              key={m}
              onClick={() => setMargin(m)}
              className={`flex-1 border p-3 rounded capitalize ${
                margin === m ? "border-red-500 text-red-500" : "border-gray-300"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <button
          onClick={convertToPDF}
          disabled={!files.length}
          className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold disabled:opacity-50"
        >
          Convert to PDF
        </button>
      </div>
    </div>
  );
}
