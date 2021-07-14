import axios from "axios";

const GET_CATS = "store/gifs/GET_CATS";
const GET_DOGS = "store/gifs/GET_DOGS";
const SET_SEARCH = "store/gifs/SET_SEARCH";
const SET_OFFSET = "store/gifs/SET_OFFSET";
const SET_INDEX = "store/gifs/SET_INDEX";
const SET_GIFS = "store/gifs/SET_GIFS";

const initialState = {
  cats: [],
  dogs: [],
  gifsToShow: [],
  searchItem: "cat",
  offset: 0,
  currentIndex: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATS: {
      return {
        ...state,
        cats: action.listOfCats,
      };
    }
    case GET_DOGS: {
      return {
        ...state,
        dogs: action.listOfDogs,
      };
    }
    case SET_SEARCH: {
      return {
        ...state,
        searchItem: action.requestedPet,
      };
    }
    case SET_OFFSET: {
      return {
        ...state,
        offset: action.addOffset,
      };
    }
    case SET_INDEX: {
      return {
        ...state,
        currentIndex: action.setIndex,
      };
    }
    case SET_GIFS: {
      return {
        ...state,
        gifsToShow: action.setGifs,
      };
    }
    default:
      return state;
  }
};

export function setGifsToShow() {
  return (dispatch, getState) => {
    const store = getState();
    const { searchItem, dogs, cats } = store.gifs;
    if (searchItem === "cat") {
      dispatch({ type: SET_GIFS, setGifs: cats });
    } else {
      dispatch({ type: SET_GIFS, setGifs: dogs });
    }
  };
}

export const getGifs = () => {
  return async (dispatch, getState) => {
    const store = getState();
    const { cats, dogs, offset, searchItem } = store.gifs;
    const { data: result } = await axios(
      `http://api.giphy.com/v1/gifs/search?api_key=uLbPbXdE9mp6V52KwQYJ4EsOtlRMjJ7x&limit=50&offset=${offset}&q=${searchItem}`
    ).catch((err) => console.log(err));
    const gifArr = result.data;
    const chunkResult = (myArray) => {
      let chunkArr = [];
      chunkArr = [...myArray];
      for (let i = 0; i < gifArr.length; i += 25) {
        const myChunk = gifArr.slice(i, i + 25);
        chunkArr.push(myChunk);
      }
      return chunkArr;
    };
    if (searchItem === "cat") {
      dispatch({ type: GET_CATS, listOfCats: chunkResult(cats) });
    } else {
      dispatch({ type: GET_DOGS, listOfDogs: chunkResult(dogs) });
    }
    setGifsToShow();
  };
};

export function setSearch(requestedPet) {
  return (dispatch, getState) => {
    const store = getState();
    const { dogs } = store.gifs;
    dispatch({ type: SET_SEARCH, requestedPet });
    dispatch({ type: SET_INDEX, setIndex: 0 });
    if (!dogs.length && requestedPet === "dog") {
      dispatch(getGifs());
    }
  };
}

function addIndex(currentIndex, dispatch) {
  const newIndex = currentIndex + 1;
  dispatch({ type: SET_INDEX, setIndex: newIndex });
}

function setOffset(offset, dispatch) {
  const newOffset = offset + 50;
  dispatch({ type: SET_OFFSET, addOffset: newOffset });
}

export function showNextPage() {
  return (dispatch, getState) => {
    const store = getState();
    const { cats, dogs, currentIndex, offset, searchItem } = store.gifs;
    if (searchItem === "cat" && currentIndex >= cats.length - 1) {
      addIndex(currentIndex, dispatch);
      setOffset(offset, dispatch);
      dispatch(getGifs());
    } else if (searchItem === "dog" && currentIndex >= dogs.length - 1) {
      addIndex(currentIndex, dispatch);
      setOffset(offset, dispatch);
      dispatch(getGifs());
    }
    addIndex(currentIndex, dispatch);
  };
}

export function showPrevPage() {
  return (dispatch, getState) => {
    const store = getState();
    const { currentIndex } = store.gifs;
    const newIndex = currentIndex - 1;
    dispatch({ type: SET_INDEX, setIndex: newIndex });
  };
}
