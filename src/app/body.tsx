"use client";

import { useState } from "react";
import Item from "./item";

export default function Body() {
  const [items, setItems] = useState([
    { id: 1, key: 1 },
    { id: 2, key: 2 },
    { id: 3, key: 3 },
    { id: 4, key: 4 },
    { id: 5, key: 5 },
    { id: 6, key: 6 },
  ]);
  const [MaxKey, SetMaxKey] = useState(6);
  const handleAddItem = () => {
    const nextId =
      items.length === 0 ? 1 : Math.max(...items.map((item) => item.id)) + 1;
    SetMaxKey(MaxKey + 1);
    setItems([...items, { id: nextId, key: MaxKey + 1 }]);
  };

  const handleRemoveItem = (itemKey) => {
    setItems((prevItems) => {
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
  };

  return (
    <div className="rounded-lg">
      {items.map((item) => (
        <Item
          key={item.key}
          id={item.id}
          remove={() => handleRemoveItem(item.key)}
        />
      ))}
      <button
        className="w-8 h-8 bg-red-500 text-2xl m-8 rounded"
        onClick={handleAddItem}
      >
        +
      </button>
         
    </div>
  );
}
