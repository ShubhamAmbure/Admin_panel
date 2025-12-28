import { useRef } from "react";

const ImageUpload = ({ image, setImage }) => {
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Maximum allowed file size is 10MB");
      return;
    }

    setImage({
      file,
      preview: URL.createObjectURL(file),
    });
  };

  return (
    <div className="flex gap-4 items-start">
      {/* Preview */}
      {image?.preview && (
        <div className="w-24 h-24 border rounded flex items-center justify-center overflow-hidden">
          <img
            src={image.preview}
            alt="preview"
            className="object-contain w-full h-full"
          />
        </div>
      )}

      {/* Upload Box */}
      <div
        onClick={() => inputRef.current.click()}
        className="w-40 h-24 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-purple-600 transition"
      >
        <svg
          className="w-6 h-6 text-gray-400 mb-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M7 16V8m0 0l-4 4m4-4l4 4M17 8v8m0 0l4-4m-4 4l-4-4" />
        </svg>
        <p className="text-xs text-gray-500 text-center">
          Upload Image
        </p>
        <p className="text-[10px] text-gray-400">
          Max size 10MB
        </p>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ImageUpload;