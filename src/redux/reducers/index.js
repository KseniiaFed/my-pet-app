import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import gifs from "./gifs";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    gifs,
  });

export default createRootReducer;
