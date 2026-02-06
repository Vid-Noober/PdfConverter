import { useState } from "react";
import jsPDF from "jspdf";
import UploadZone from "../Components/UploadZone";

export default function ConvertPDF() {
  const [files, setFiles] = useState([]);
  const [orientation, setOrientation] = useState("portrait");
  const [pageSize, setPageSize] = useState("a4");
  const [margin, setMargin] = useState("none");

  const convertToPDF = async () => {
    if (!files.length) return;

    const pdf = new jsPDF({
      orientation: orientation === "portrait" ? "p" : "l",
      unit: "mm",
      format: pageSize,
    });

    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();

    const marginSize =
      margin === "big" ? 20 : margin === "small" ? 10 : 0;

    for (let i = 0; i < files.length; i++) {
      const imgData = await readFile(files[i]);
      const img = await loadImage(imgData);

      const imgRatio = img.width / img.height;
      const pageRatio = pageW / pageH;

      let w, h;
      if (imgRatio > pageRatio) {
        w = pageW - marginSize * 2;
        h = w / imgRatio;
      } else {
        h = pageH - marginSize * 2;
        w = h * imgRatio;
      }

      const x = (pageW - w) / 2;
      const y = (pageH - h) / 2;

      if (i > 0) pdf.addPage();
      pdf.addImage(img, "JPEG", x, y, w, h);
    }

    pdf.save("image-to-pdf.pdf");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* UPLOAD */}
        <div className="lg:col-span-2">
          <UploadZone files={files} setFiles={setFiles} />
        </div>

        {/* OPTIONS */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm
                        space-y-6 lg:sticky lg:top-6 h-fit">

          <h2 className="text-xl font-semibold">Image to PDF options</h2>

          {/* ORIENTATION */}
          <div>
            <p className="font-medium mb-2">Page orientation</p>
            <div className="grid grid-cols-2 gap-3">
              <OptionCard
                label="Portrait"
                active={orientation === "portrait"}
                onClick={() => setOrientation("portrait")}
              />
              <OptionCard
                label="Landscape"
                active={orientation === "landscape"}
                onClick={() => setOrientation("landscape")}
              />
            </div>
          </div>

          {/* PAGE SIZE */}
          <div>
            <p className="font-medium mb-2">Page size</p>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="a4">A4 (297×210 mm)</option>
              <option value="letter">Letter</option>
            </select>
          </div>

          {/* MARGIN */}
          <div>
            <p className="font-medium mb-2">Margin</p>
            <div className="grid grid-cols-3 gap-3">
              {["none", "small", "big"].map((m) => (
                <OptionCard
                  key={m}
                  label={m === "none" ? "No margin" : m}
                  active={margin === m}
                  onClick={() => setMargin(m)}
                />
              ))}
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={convertToPDF}
            className="bg-red-500 hover:bg-red-600 transition
            text-white w-full py-4 rounded-2xl
            text-lg font-semibold"
          >
            Convert to PDF →
          </button>
        </div>
      </div>
    </div>
  );
}

/* OptionCard */
function OptionCard({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`border rounded-xl p-5 text-center transition font-medium
      ${active
        ? "border-red-500 text-red-500 bg-red-50"
        : "border-gray-300 text-gray-500 hover:border-gray-400"}`}
    >
      {label}
    </button>
  );
}

/* Helpers */
function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = src;
  });
}
