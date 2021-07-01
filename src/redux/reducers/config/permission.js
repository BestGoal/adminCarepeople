import { USERPERMISSION } from "../../types/index";

let initdata = {
  data: {
    agent: { crud: false, blockUnblock: false, transaction: false },
    player: { crud: false, blockUnblock: false, transaction: false }
  },
  startData: {
    agent: { crud: false, blockUnblock: false, transaction: false },
    player: { crud: false, blockUnblock: false, transaction: false }      
  }
 }

export const permission = (state = initdata, action) => {
  switch (action.type) {
 
    case USERPERMISSION: {
      if(action.data) {
        return { ...state, data: action.data}
      } else {
        return { ...state, data: state.startData}
      }
    }

    default: {
      return state
    }
  }
}
