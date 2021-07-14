import React from "react";
import { useDispatch } from "react-redux";
import { setSearch } from "../redux/reducers/gifs";

const SearchButtons = () => {
  const dispatch = useDispatch();
  const onClick = (e) => {
    dispatch(setSearch(e.target.id));
  };
  return (
    <div className="flex flex-row space-y-4 items-center justify-center py-20 pt-40">
      <div className="search-bar flex flex-row space-x-4 text-white font-bold items-center">
        <button
          type="button"
          id="cat"
          onClick={(e) => onClick(e)}
          className="py-2 px-4 border-2 rounded-lg bg-gray-500 font-bold text-white focus:outline-none active:bg-gray-400"
        >
          Cats
        </button>
        <span>or</span>
        <button
          type="button"
          id="dog"
          onClick={(e) => onClick(e)}
          className="py-2 px-4 border-2 rounded-lg bg-gray-500 font-bold text-white focus:outline-none active:bg-gray-400"
        >
          Dogs
        </button>
      </div>
    </div>
  );
};

export default SearchButtons;
