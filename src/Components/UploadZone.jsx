import { useDropzone } from "react-dropzone";

export default function UploadZone({ files, setFiles }) {
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [] },
    multiple: true,
    noClick: true,
    onDrop: (acceptedFiles) => {
      setFiles(prev => [...prev, ...acceptedFiles]);
    },
  });

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl
        p-8 sm:p-12 text-center transition
        ${isDragActive ? "border-red-500 bg-red-50" : "border-gray-300"}`}
      >
        <input {...getInputProps()} />
        <button
          type="button"
          onClick={open}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-semibold mb-3"
        >
          Add more files
        </button>
        <p className="text-gray-500">or drag & drop images here</p>
      </div>

      {/* PREVIEW */}
      {files.length > 0 && (
        <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {files.map((file, index) => (
            <div key={index} className="relative border rounded-lg overflow-hidden">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-full h-24 object-cover"
              />
              <button
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
