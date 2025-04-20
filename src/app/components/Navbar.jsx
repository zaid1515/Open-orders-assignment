"use client";
import { useState } from "react";
import Image from "next/image";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const stockData = [
    { name: "SIGNORIA", price: "0.00" },
    { name: "NIFTY BANK", price: "52,323.30" },
    { name: "NIFTY FIN SERVICE", price: "25,255.75" },
    { name: "RELCHEMQ", price: "162.73" },
  ];

  const menuItems = ["MARKETWATCH", "EXCHANGE FILES", "PORTFOLIO", "FUNDS"];

  return (
    <nav className="w-full px-4 bg-white">
      <div className="flex items-center justify-between flex-wrap m-3 mx-4 py-1">
        <div className="flex items-center space-x-6 flex-wrap mt-4 md:mt-2">
          <Image
            src="/logo.jpeg"
            alt="logo"
            width={40}
            height={40}
            className="h-10 w-auto mr-6"
          />

          <div className="hidden md:flex space-x-4">
            {stockData.map((stock, index) => (
              <div key={index} className="text-center">
                <h2 className="text-[14px] font-medium">{stock.name}</h2>
                <h2 className="text-[14px] text-green-700">{stock.price}</h2>
              </div>
            ))}
          </div>
        </div>

        <ul className="hidden md:flex items-center space-x-6 mt-4 md:mt-0">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`relative group text-[14px] font-bold ${
                item === "PORTFOLIO" ? "text-black" : "text-gray-500"
              }`}
            >
              <span className="m-1">{item}</span>
              {(item === "PORTFOLIO" || item === "FUNDS") && (
                <span className="text-[15px] absolute top-[-5px]">⌄</span>
              )}
            </li>
          ))}
          <div className="p-3 rounded-4xl text-lg font-bold bg-gray-300">
            LK
          </div>
        </ul>

        <div className="md:hidden mt-4" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "×" : "☰"}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden fixed top-16 left-4 right-4 z-50 bg-white shadow-lg rounded-lg p-4">
          {stockData.map((stock, index) => (
            <div key={index} className="text-left mb-2">
              <h2 className="text-[14px] font-medium">{stock.name}</h2>
              <h2 className="text-[14px] text-green-700">{stock.price}</h2>
            </div>
          ))}
          <hr className="my-2" />
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`text-[14px] font-bold ${
                  item === "PORTFOLIO" ? "text-black" : "text-gray-500"
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};
