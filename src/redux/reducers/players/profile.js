import { PLAYER_PROFILE } from "../../types/index"

const initialState = {
  data: []
}
  
export const profile = (state = initialState, action) => {
  switch (action.type) {
    case PLAYER_PROFILE:
      return { ...state, data: action.data }
    default:
      return state
  }
}