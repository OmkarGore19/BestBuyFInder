import React from "react";

const Navbar = () => {
  return (
    <nav className="top-0 left-0 w-full z-50 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-16 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-white w-full md:w-auto text-center md:text-left">
          BestBuyFinder
        </h1>
        <button className="hidden md:block text-lg border-2 rounded-xl border-white text-white px-4 py-2">
          Get started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
