export default function Header() {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-9 mr-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <div className="flex flex-col">
          <div className="text-xl">Rules creation</div>
          <u>
            {" "}
            &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
          </u>
        </div>
      </div>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4">
        Publish Feed
      </button>
    </div>
  );
}
