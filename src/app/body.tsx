/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";
import Item from "./item";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import HeaderOption from "./headerOption";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
export default function Body() {
  const refs = useRef({});
  const [dragEnabled, SetDrag] = useState(false);
  const [HeaderNames, SetHeaderNames] = useState([
    "PrimaryVariant",
    "Variant1",
  ]);
  const [items, setItems] = useState([
    { id: 1, key: 1 },
    { id: 2, key: 2 },
    { id: 3, key: 3 },
    { id: 4, key: 4 },
    { id: 5, key: 5 },
    { id: 6, key: 6 },
  ]);
  const [MaxKey, SetMaxKey] = useState(6);
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id === over.id) return;
    setItems(() => {
      const originalPosition = getItemPosition(active.id);
      const newPosition = getItemPosition(over.id);
      console.log(
        "positions",
        originalPosition,
        newPosition,
        active.id,
        over.id
      );

      return arrayMove(items, originalPosition, newPosition);
    });
    setItems((prevItems) => {
      return prevItems.map((item, index) => ({
        ...item,
        id: index + 1,
        key: item.key, // Assign sequential IDs starting from 1
      }));
    });
  };
  const getItemPosition = (id: any) => {
    return items.findIndex((e: any) => e.id === id);
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: dragEnabled ? undefined : { distance: 9999 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: dragEnabled ? undefined : { distance: 9999 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddItem = () => {
    const nextId =
      items.length === 0 ? 1 : Math.max(...items.map((item) => item.id)) + 1;
    SetMaxKey(MaxKey + 1);
    setItems([...items, { id: nextId, key: MaxKey + 1 }]);
    toast("Item Added", {
      position: "top-center",
    });
  };
  const [imageBars, setImageBars] = useState([1]);
  const addImageBar = () => {
    setImageBars([...imageBars, imageBars.length + 1]); // Add new ImageBar to the array
    const nextVariant = "Variant" + HeaderNames.length; // Use length directly for the next variant
    SetHeaderNames([...HeaderNames, nextVariant]);
  };
  const handleRemoveItem = (itemKey) => {
    setItems((prevItems) => {
      console.log("remoal requested for key", itemKey);
      // 1. Create a new array without the removed item
      const newItems = prevItems.filter((item) => item.key !== itemKey);

      return newItems;
    });
    setItems((prevItems) => {
      return prevItems.map((item, index) => ({
        ...item,
        id: index + 1,
        key: item.key, // Assign sequential IDs starting from 1
      }));
    });
    toast("Item Removed", {
      position: "top-center",
    });
  };
  const scrolledElement = (key) => {
    const targetRef = refs.current[key.unqKey];
    const headerRef = refs.current["header"]; // Reference to the header

    if (targetRef) {
      const scrollPosition = targetRef.scrollLeft;
      Object.keys(refs.current).forEach((refKey) => {
        if (refs.current[refKey]) {
          refs.current[refKey].scrollLeft = scrollPosition;
        }
      });
      if (headerRef) {
        headerRef.scrollLeft = scrollPosition; // Set scroll position for the header
      }
    }
  };
  // Store refs for child components

  const passRefsToParent = (ref, id) => {
    if (!refs.current[id]) {
      // Check if the ref for this id already exists
      refs.current[id] = ref; // Assign the ref to the specific id if it doesn't exist
    }
  };

  return (
    <div>
      <div className="flex flex-row bg-red-500 h-12 rounded-lg items-center ml-4 mr-4">
        <div className="basis-1/12 justify-self-center flex-shrink-0">
          &nbsp;
        </div>
        <div className="basis-1/4 justify-self-center flex-shrink-0">
          Product Filter
        </div>
        <div
          className="basis-8/12 flex flex-row no-scrollbar overflow-x-auto"
          ref={(el) => passRefsToParent(el, "header")}
        >
          {HeaderNames.map((option, index) => (
            <HeaderOption text={option} key={index} />
          ))}
        </div>
      </div>
      <div className="rounded-lg">
        <DndContext
          onDragEnd={handleDragEnd}
          sensors={sensors}
          collisionDetection={closestCorners}
        >
          <SortableContext
            items={items.map((elem: any) => elem?.id)}
            strategy={verticalListSortingStrategy}
          >
            {items?.map((item: any) => {
              return (
                <Item
                  key={item.key}
                  id={item.id}
                  unqKey={item.key}
                  remove={() => handleRemoveItem(item.key)}
                  imageBars={imageBars}
                  addImageBar={addImageBar}
                  scrollController={scrolledElement}
                  passRefsToParent={passRefsToParent}
                  SetSortable={SetDrag}
                />
              );
            })}
          </SortableContext>
        </DndContext>
        {/* {items.map((item) => (
          <Item
            key={item.key}
            id={item.id}
            unqKey={item.key}
            remove={() => handleRemoveItem(item.key)}
            imageBars={imageBars}
            addImageBar={addImageBar}
            scrollController={scrolledElement}
            passRefsToParent={passRefsToParent}
          />
        ))} */}

        <button
          className="w-8 h-8 bg-red-500 text-2xl m-8 rounded"
          onClick={handleAddItem}
        >
          +
        </button>
      </div>
    </div>
  );
}
