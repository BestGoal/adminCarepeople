import { combineReducers } from "redux"
import { gameTypes } from "./gameType";
import { fpMng } from "./fpMng";

const cms = combineReducers({
  gameTypes,
  fpMng
})

export default cms
