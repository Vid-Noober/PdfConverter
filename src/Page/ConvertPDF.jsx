import React, { useState } from "react";
import jsPDF from "jspdf";
import UploadZone from "../Components/UploadZone";

export default function ConvertPDF() {
  const [files, setFiles] = useState([]);
  const [orientation, setOrientation] = useState("portrait");
  const [pageSize, setPageSize] = useState("a4");
  const [margin, setMargin] = useState("none");
  const [isProcessing, setIsProcessing] = useState(false);

  const hasFiles = files.length > 0;

  // Helpers to handle file conversion
  const readFile = (file) => new Promise((res) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.readAsDataURL(file);
  });

  const loadImage = (src) => new Promise((res) => {
    const img = new Image();
    img.onload = () => res(img);
    img.src = src;
  });

  const convertToPDF = async () => {
    if (!files.length) return;
    setIsProcessing(true);

    try {
      const pdf = new jsPDF({
        orientation: orientation === "portrait" ? "p" : "l",
        unit: "mm",
        format: pageSize,
      });

      for (let i = 0; i < files.length; i++) {
        const imgData = await readFile(files[i]);
        const img = await loadImage(imgData);

        const pageW = pdf.internal.pageSize.getWidth();
        const pageH = pdf.internal.pageSize.getHeight();
        
        // marginSize is 0 for "none", 10mm for "small", 20mm for "big"
        const marginSize = margin === "big" ? 20 : margin === "small" ? 10 : 0;

        // Calculate the draw area
        const drawW = pageW - (marginSize * 2);
        const drawH = pageH - (marginSize * 2);

        // Center the image (if margin is 0, x and y will be 0)
        const x = marginSize;
        const y = marginSize;

        if (i > 0) pdf.addPage();
        
        // Adding 'ALIAS' or 'FAST' helps with rendering large images
        pdf.addImage(img, "JPEG", x, y, drawW, drawH, undefined, 'FAST');
      }

      pdf.save("converted_document.pdf");
    } catch (err) {
      console.error(err);
      alert("Download failed. Please check the console.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f0eb] pb-20">
      <div className={`mx-auto px-4 pt-10 transition-all duration-500 ${hasFiles ? "max-w-[1400px]" : "max-w-3xl text-center"}`}>
        
        {!hasFiles && (
          <div className="mb-10">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">JPG to PDF</h1>
            <p className="text-xl text-gray-600">Convert JPG images to PDF in seconds. Edge-to-edge support.</p>
          </div>
        )}

        <div className={`grid grid-cols-1 ${hasFiles ? "lg:grid-cols-4" : "grid-cols-1"} gap-8`}>
          <div className={`${hasFiles ? "lg:col-span-3" : "col-span-1"}`}>
            <UploadZone files={files} setFiles={setFiles} />
          </div>

          {hasFiles && (
            <div className="bg-white border shadow-xl p-6 h-fit lg:sticky lg:top-6 rounded-2xl">
              <h2 className="text-sm font-bold mb-6 text-gray-400 uppercase tracking-widest border-b pb-4">Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-gray-500 mb-2">PAGE ORIENTATION</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setOrientation("portrait")} className={`p-3 border-2 rounded-xl text-xs font-bold ${orientation === "portrait" ? "border-red-500 bg-red-50 text-red-600" : "border-gray-100 text-gray-400"}`}>PORTRAIT</button>
                    <button onClick={() => setOrientation("landscape")} className={`p-3 border-2 rounded-xl text-xs font-bold ${orientation === "landscape" ? "border-red-500 bg-red-50 text-red-600" : "border-gray-100 text-gray-400"}`}>LANDSCAPE</button>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-500 mb-2">MARGIN</p>
                  <div className="flex bg-gray-100 p-1 rounded-xl">
                    {["none", "small", "big"].map((m) => (
                      <button key={m} onClick={() => setMargin(m)} className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition ${margin === m ? "bg-white shadow text-red-500" : "text-gray-400"}`}>
                        {m.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={convertToPDF} disabled={isProcessing} className="w-full bg-[#E5322D] hover:bg-red-700 text-white py-4 rounded-xl text-xl font-bold shadow-lg flex items-center justify-center">
                  {isProcessing ? "Generating..." : "Convert to PDF"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}