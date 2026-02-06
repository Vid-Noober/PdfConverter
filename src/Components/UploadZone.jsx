import { useDropzone } from "react-dropzone";

export default function UploadZone({ onFiles }) {
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [] },
    multiple: true,
    noClick: true,
    onDrop: onFiles,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-8 text-center transition ${
        isDragActive ? "border-red-500 bg-red-50" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      <button
        onClick={open}
        className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold mb-2"
      >
        Add more files
      </button>
      <p className="text-gray-500">or drag & drop images here</p>
    </div>
  );
}
