import React from "react";
import { useDropzone } from "react-dropzone";

export default function UploadZone({ files, setFiles }) {
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept: { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] },
    onDrop: (accepted) => setFiles((prev) => [...prev, ...accepted]),
    noClick: true,
  });

  const hasFiles = files.length > 0;

  return (
    <div>
      <div {...getRootProps()} className={`flex flex-col items-center justify-center transition-all ${hasFiles ? "border-2 border-dashed border-gray-300 p-6 rounded-xl bg-white" : "min-h-[300px]"}`}>
        <input {...getInputProps()} />
        <button onClick={open} className="bg-[#E5322D] hover:bg-red-700 text-white px-10 py-5 rounded-2xl text-2xl font-bold shadow-xl active:scale-95 transition">
          {hasFiles ? "Add More Images" : "Select JPG images"}
        </button>
        {!hasFiles && <p className="mt-4 text-gray-500">or drop JPGs here</p>}
      </div>

      {hasFiles && (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {files.map((file, i) => (
            <div key={i} className="bg-white p-2 border rounded shadow-sm relative group">
              <div className="aspect-[3/4] flex items-center justify-center bg-gray-50 overflow-hidden rounded">
                <img src={URL.createObjectURL(file)} alt="preview" className="max-w-full max-h-full object-contain" />
              </div>
              <button 
                onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
                className="absolute top-0 right-0 bg-gray-800 text-white w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition text-xs"
              >✕</button>
              <p className="text-[10px] text-gray-400 truncate mt-2 text-center">{file.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}