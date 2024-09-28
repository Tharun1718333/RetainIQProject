import { useRef, useState } from "react";
import AddedImage from "./addedImage";

export default function ImageBar() {
  const [imgPath, setImgPath] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImgPath(URL.createObjectURL(file));
    }
  };

  const openFileSelector = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-72 flex flex-shrink-0 justify-center relative">
      {!imgPath ? (
        <div className="cursor-pointer flex" onClick={openFileSelector}>
          <div className="bg-white w-20 h-20 flex items-center justify-center rounded-md">
            <div className="text-xs bg-red-300 rounded-md py-1 px-0.5">
              + Add Button
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <AddedImage img_path={imgPath} />
          <div
            className="cursor-pointer absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
            onClick={openFileSelector} // Make the button clickable
          >
            <div className="bg-white rounded-md py-1 px-2 shadow-md">
              <div className="text-xs bg-red-300 rounded-md py-1 px-0.5">
                Edit
              </div>
            </div>
          </div>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        aria-label="Image select"
        title=" "
        style={{ display: "none" }}
        ref={fileInputRef}
      />
    </div>
  );
}
