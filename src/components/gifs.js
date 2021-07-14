import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setGifsToShow } from '../redux/reducers/gifs'

const Gifs = () => {
  const dispatch = useDispatch();
  const { gifsToShow, currentIndex, cats, dogs, searchItem } = useSelector(
    (s) => s.gifs
  );
  const [gifToggle, setGifToggle] = useState(false);
  const [clickedGifId, setClickedGifId] = useState("");

  useEffect(() => {
    dispatch(setGifsToShow());
  }, [cats, dogs, searchItem, dispatch]);

  const gifs = gifsToShow[currentIndex];

  const showDetail = (key) => {
    setClickedGifId(key);
    setGifToggle(!gifToggle);
  };

  if (!gifs) {
    return (
      <div className="h-96 rounded-lg bg-white flex justify-center mx-20 mb-10 tracking-wider antialised items-center font-bold text-3xl">
        ...Loading
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white relative flex flex-wrap p-4 mx-20 mb-10 h-full min-h-full items-center justify-center">
      {gifs?.map((gif) => {
        return (
          <div className="flex text-black p-2" key={gif.id}>
            <img
              alt={gif.title}
              height={gif.images.fixed_height_small.height}
              width={gif.images.fixed_height_small.width}
              src={gif.images.fixed_height_small.url}
              id={gif.id}
              onClick={(e) => showDetail(e.target.id)}
              onKeyDown={(e) => showDetail(e.target.id)}
              role="presentation"
            />
            {clickedGifId === gif.id && gifToggle && (
              <img
                className="absolute z-10"
                alt={gif.title}
                height="500"
                width="500"
                src={gif.images.original.url}
                id={gif.id}
                onClick={(e) => showDetail(e.target.id)}
                onKeyDown={(e) => showDetail(e.target.id)}
                role="presentation"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Gifs;
