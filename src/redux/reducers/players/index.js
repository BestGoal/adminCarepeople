import { combineReducers } from "redux"
import { playerslist } from "./players"
import { profile } from "./profile"

const Players = combineReducers({
    playerslist,
    profile
})

export default Players
