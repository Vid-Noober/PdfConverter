import React from "react";

const PdfOptions = ({ options, setOptions }) => {
  return (
    <div className="w-full max-w-sm border-l px-6 py-8 bg-white">
      <h3 className="text-2xl font-bold mb-6">Image to PDF options</h3>

      {/* Orientation */}
      <div className="mb-6">
        <p className="font-semibold mb-3">Page orientation</p>
        <div className="grid grid-cols-2 gap-3">
          {["portrait", "landscape"].map((o) => (
            <button
              key={o}
              onClick={() => setOptions({ ...options, orientation: o })}
              className={`border rounded-xl p-4 text-center ${
                options.orientation === o
                  ? "border-red-500 text-red-600"
                  : "border-gray-300"
              }`}
            >
              {o.charAt(0).toUpperCase() + o.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Page Size */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Page size</p>
        <select
          className="w-full border rounded-lg p-2"
          value={options.size}
          onChange={(e) => setOptions({ ...options, size: e.target.value })}
        >
          <option value="a4">A4 (297×210 mm)</option>
          <option value="letter">Letter</option>
          <option value="fit">Fit image</option>
        </select>
      </div>

      {/* Margin */}
      <div className="mb-8">
        <p className="font-semibold mb-3">Margin</p>
        <div className="grid grid-cols-3 gap-3">
          {["none", "small", "big"].map((m) => (
            <button
              key={m}
              onClick={() => setOptions({ ...options, margin: m })}
              className={`border rounded-xl p-3 text-sm ${
                options.margin === m
                  ? "border-red-500 text-red-600"
                  : "border-gray-300"
              }`}
            >
              {m === "none" ? "No margin" : m}
            </button>
          ))}
        </div>
      </div>

      {/* Convert Button */}
      <button className="w-full bg-red-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-red-700">
        Convert to PDF →
      </button>
    </div>
  );
};

export default PdfOptions;
