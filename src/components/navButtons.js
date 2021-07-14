import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { showNextPage, showPrevPage } from "../redux/reducers/gifs";

const NavButtons = () => {
  const dispatch = useDispatch();
  const currentIndex = useSelector((s) => s.gifs.currentIndex);
  return (
    <div className="relative z-0 flex flex-row justify-between mx-20 mb-20 items-end">
      <button
        type="button"
        onClick={() => dispatch(showPrevPage())}
        className={`${
          currentIndex ? "visible" : "invisible"
        } bg-yellow-400 border-4 focus:outline-none border-yellow-600 hover:bg-yellow-500 active:bg-yellow-400 font-bold text-yellow-900 rounded-lg py-4 px-6`}
      >
        Prev
      </button>
      <button
        type="button"
        onClick={() => dispatch(showNextPage())}
        className="bg-yellow-400 focus:outline-none border-4 border-yellow-600 hover:bg-yellow-500 active:bg-yellow-400 font-bold text-yellow-900 rounded-lg py-4 px-6"
      >
        Next
      </button>
    </div>
  );
};

export default NavButtons;
