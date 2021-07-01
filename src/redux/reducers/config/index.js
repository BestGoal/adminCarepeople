import { combineReducers } from "redux"
import { permission } from "./permission";
import { system } from "./system";
import { games } from "./games";
import { bonus } from "./bonus";

const userdetail = combineReducers({
    permission,
    system,
    games,
    bonus
})

export default userdetail
