import Image from "next/image";

export default function AddedImage({ img_path }) {
  return (
    <div className="flex-shrink-0">
      <Image src={img_path} width={80} height={80} alt="Selected image" />
    </div>
  );
}
