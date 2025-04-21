"use client";

import { XCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { FiSearch, FiUserPlus } from "react-icons/fi";

export default function SearchBar({
  setOrders,
  filters,
  onFilterChange,
}) {
  const [input, setInput] = useState("");

  const onCancelAll = () =>setOrders([])

  const handleSearch = () => {
    if (input && !filters.ticker.includes(input.toUpperCase())) {
      onFilterChange("ticker", [...filters.ticker, input.toUpperCase()]);
      setInput("");
    }
  };

  const handleRemoveTicker = (ticker) => {
    const updated = filters.ticker.filter((t) => t !== ticker);
    onFilterChange("ticker", updated);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4 justify-between">
      <div className="flex gap-6 items-start flex-wrap">
        <div className="flex items-center border-gray-300 overflow-hidden w-fit shadow-sm rounded-l">
          <div className="pl-3 pr-6 py-2 text-sm font-medium">AAA002</div>
          <div className="px-3 py-2 bg-gray-100 border-l border-gray-300 rounded-l">
            <FiUserPlus className="h-5 w-5 text-black" />
          </div>
        </div>
  
        <div className="flex flex-grow items-center bg-white border border-gray-300 rounded px-3 w-full sm:max-w-md">
          <FiSearch />
          <input
            className="ml-2 p-1 w-full focus:outline-none focus:ring-0"
            placeholder="Search for a stock, future, option or index"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
  
        <div className="flex items-center gap-2 flex-wrap max-w-md">
          {filters.ticker.map((ticker) => (
            <div
              key={ticker}
              className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-medium"
            >
              {ticker}
              <button onClick={() => handleRemoveTicker(ticker)}>
                <XCircleIcon className="h-4 w-4 ml-1 text-gray-600 hover:text-red-600" />
              </button>
            </div>
          ))}
        </div>
      </div>
  
      <div className="flex justify-end space-x-2">
        <button
          onClick={onCancelAll}
          className="px-5 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 font-semibold"
        >
          <div className="flex">
            <XCircleIcon className="h-6 w-5" />
            <span className="px-1">Cancel all</span>
          </div>
        </button>
      </div>
    </div>
  );
  
}
