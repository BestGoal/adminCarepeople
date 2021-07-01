import { AGENT_TREE_DATA, AGENT_TREE_PLAYER_DATA } from "../../types/index";

let initdata = { 
  allData: [],
  allTotalBalance: "",
  allTotalPlayer: "",
  allTotalAgent: "",
  allUserData: []
}

export default (state = initdata, action) => {
  switch (action.type) {
    case AGENT_TREE_DATA:
      return { ...state, 
        allData: action.data.data, 
        allTotalBalance: action.data.allTotalBalance, 
        allTotalPlayer:action.data.allTotalPlayer, 
        allTotalAgent:action.data.allTotalAgent
      }
    case AGENT_TREE_PLAYER_DATA: 
      return { ...state, allUserData: action.data }
    default: {
      return state
    }
  }
}