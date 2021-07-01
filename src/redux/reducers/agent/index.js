import { combineReducers } from "redux"

import agent from "./agent";
import profile from "./profile";
import permission from "./permission";
import tree_agent from "./tree_agent";
import provider from "./provider";

const userdetail = combineReducers({
	agent,
	tree_agent,
	profile,
	permission,
	provider
})

export default userdetail
