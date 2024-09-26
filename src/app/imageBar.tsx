import { useRef, useState } from "react";
import AddedImage from "./addedImage";

export default function ImageBar() {
  const [imgPath, setImgPath] = useState(null); // Initialize without a default image
  const fileInputRef = useRef(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImgPath(URL.createObjectURL(file)); // Create a temporary URL for the selected image
    }
  };
  const openFileSelector = () => {
    // Trigger the hidden file input element
    fileInputRef.current.click(); // Use the ref to click the input
  };

  return (
    <div className="ml-4 mr-48 flex-shrink-0">
      {!imgPath ? (
        // ( // Check if imgPath is null
        //   <div className="mt-4">
        //     <input
        //       type="file"
        //       accept="image/*"
        //       onChange={handleImageChange}
        //       aria-label="Image select"
        //       title=" "
        //       id="image_selector"
        //     />
        //     <label className="bg-white w-12 h-20">Add Design</label>
        //   </div>
        // ) : (
        //   <AddedImage img_path={imgPath} />
        // )
        <div className="cursor-pointer" onClick={openFileSelector}>
          <div className="bg-white w-20 h-20 flex items-center justify-center rounded-md">
            <div className=" text-xs bg-red-300 rounded-md py-1 px-0.5">
              + Add Button
            </div>
          </div>
        </div>
      ) : (
        <AddedImage img_path={imgPath} />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        aria-label="Image select"
        title=" "
        style={{ display: "none" }}
        ref={fileInputRef} // Attach the ref to the input element
      />
    </div>
  );
}
