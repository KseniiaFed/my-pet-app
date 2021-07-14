import React from "react";

const Header = () => {
  return (
    <nav className="fixed w-full flex items-center justify-center flex-wrap bg-white p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img
          alt="header-img"
          className="h-8 w-8 mr-2"
          width="54"
          height="54"
          src="https://svgsilh.com/svg/308974.svg"
        />
        <span className="font-semibold text-2xl tracking-widest text-gray-800">
          Find our best latest gifs!
        </span>
      </div>
    </nav>
  );
};

export default React.memo(Header);
