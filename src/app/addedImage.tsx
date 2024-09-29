export default function AddedImage({ img_path }) {
  return (
    <div className="flex-shrink-0">
      <img src={img_path} alt="Selected image" className="w-20 h-20"></img>
    </div>
  );
}
