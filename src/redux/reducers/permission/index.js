import { PERMISSION_LOAD_LIST } from "../../types/index";

const initialState = {
    data: [],
    list: []
}

const permission = (state = initialState, action) => {
    switch (action.type) {
      case PERMISSION_LOAD_LIST:
        return { ...state,data: action.data,list: action.list }
      default:
        return state
    }
  }

export default permission