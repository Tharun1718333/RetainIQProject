import { useState } from "react";
import AddedImage from "./addedImage";
import logo1 from "./assets/public/1.png";
import logo2 from "./assets/public/2.png";
import logo3 from "./assets/public/3.png";
import logo4 from "./assets/public/4.png";
import logo5 from "./assets/public/5.png";
import logo6 from "./assets/public/6.png";
import logo7 from "./assets/public/7.png";
import logo8 from "./assets/public/8.png";
import logo9 from "./assets/public/9.png";
import logo10 from "./assets/public/10.png";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { SelectedImage } from "./selectedImage";
export default function ImageBar() {
  const [selectedId, setSelectedId] = useState(-1);
  const [images] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const getLogo = (id) => {
    switch (id) {
      case 1:
        return logo1;
      case 2:
        return logo2;
      case 3:
        return logo3;
      case 4:
        return logo4;
      case 5:
        return logo5;
      case 6:
        return logo6;
      case 7:
        return logo7;
      case 8:
        return logo8;
      case 9:
        return logo9;
      case 10:
        return logo10;
      default:
        return null; // Return null or a placeholder image if id is not found
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-72 flex flex-shrink-0 justify-center relative">
      {selectedId === -1 ? (
        <div className="cursor-pointer flex" onClick={() => setIsOpen(true)}>
          <div className="bg-white w-20 h-20 flex items-center justify-center rounded-md">
            <div className="text-xs bg-red-300 rounded-md py-1 px-0.5">
              + Add Button
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <AddedImage img_path={getLogo(selectedId).src} />
          <div
            className="cursor-pointer absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
            onClick={() => {
              setIsOpen(true);
            }} // Make the button clickable
          >
            <div className="bg-white rounded-md py-1 px-2 shadow-md">
              <div className="text-xs bg-red-300 rounded-md py-1 px-0.5">
                Edit
              </div>
            </div>
          </div>
        </div>
      )}

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Select Photo</DialogTitle>
            <div className="grid grid-cols-4 gap-4">
              {images.map((item) => (
                <SelectedImage
                  key={item}
                  id={item}
                  setSelected={setSelectedId}
                  Closer={setIsOpen}
                />
              ))}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
