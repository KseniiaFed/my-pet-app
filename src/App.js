import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Header from "./components/header";
import SearchButtons from "./components/searchButtons";
import Gifs from "./components/gifs";
import NavButtons from "./components/navButtons";
import { getGifs, setGifsToShow } from "./redux/reducers/gifs";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGifs());
    dispatch(setGifsToShow());
  }, [dispatch])

  return (
    <div className="bg-gray-900 h-full pb-20 overflow-hidden">
      <Header />
      <SearchButtons />
      <Gifs />
      <NavButtons />
    </div>
  );
}

App.propTypes = {}

export default App
