import { AGENT_PROFILE } from "../../types/index";

let initdata = { 
  profileData: {}
}

export default (state = initdata, action) => {
  switch (action.type) {
    case AGENT_PROFILE: {
      return { ...state, profileData: action.data }
    }
    default: {
      return state
    }
  }
}