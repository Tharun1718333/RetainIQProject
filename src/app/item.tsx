"use client";

import { Key, useEffect, useRef } from "react";
import ImageBar from "./imageBar";
import Tag from "./tag";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

export default function Item({
  id,
  unqKey,
  remove,
  imageBars,
  addImageBar,
  scrollController,
  passRefsToParent,
  SetSortable,
}) {
  const divRef = useRef();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = { transition, transform: CSS.Transform.toString(transform) };

  useEffect(() => {
    // Send the ref to the parent when the component mounts
    passRefsToParent(divRef.current, unqKey);
  }); // Only depend on `id`

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <div className="bg-blue-200 m-4 rounded-lg">
        <div className="flex flex-row h-24 items-center">
          <div className="basis-1/12">
            <div className="flex flex-col mt-2">
              <div className="group">
                <button className="ml-9" onClick={remove}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="red"
                    className="invisible group-hover:visible size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-row">
                <div className="mr-2 ml-4 text-2xl">{id}</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 mt-1 cursor-grabbing"
                  onMouseDown={() => SetSortable(true)}
                  onMouseUp={() => SetSortable(false)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="basis-1/4 flex-shrink-0">
            <div className="grid grid-cols-3 hover:grid-cols-6 gap-1 p-4 hover:shadow-lg hover:widthClass widthClass2">
              <Tag text={"Tharun"} />
              <Tag text={"Reddy"} />
              <Tag text={"Virat"} />
              <Tag text={"Kohli"} />
              <Tag text={"Virat"} />
              <Tag text={"Kohli"} />
            </div>
          </div>
          <div
            className="basis-8/12 overflow-x-auto flex flex-row no-scrollbar"
            onScroll={() => scrollController({ unqKey })}
            ref={divRef} // Reference to this div
          >
            {imageBars.map((index: Key | null | undefined) => (
              <ImageBar key={index} /> // Render each ImageBar
            ))}
            <button
              onClick={addImageBar}
              className="w-72 flex justify-center flex-shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 bg-white rounded self-center"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
