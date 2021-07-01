import { combineReducers } from "redux"
import agent_history from "./agentHistory";
import player_history from "./playerHistory";

const register = combineReducers({
  agent_history,
  player_history
})

export default register