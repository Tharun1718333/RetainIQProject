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

export function SelectedImage({ id, setSelected, Closer }) {
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
  const ImageSelected = () => {
    setSelected(id);
    Closer(false);
  };
  return (
    <div className="relative group w-24 h-24">
      <button
        onClick={() => {
          ImageSelected();
        }}
      >
        <img src={getLogo(id)?.src} alt="kohli_image" className="w-24 h-24" />
      </button>
      <div
        className="absolute inset-12 bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center w-18 h-4 cursor-pointer"
        onClick={() => {
          ImageSelected();
        }}
      >
        Insert
      </div>
    </div>
  );
}
