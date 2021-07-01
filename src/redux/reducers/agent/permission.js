import { PERMISSIONLOAD } from "../../types/index";

let initdata = { 
  data: [],
  params: null,
  totalPages: 0,
  totalRecords: 0,
  sortIndex: [0, 0]
}

export default (state =initdata, action) => {
  switch (action.type) {
    case PERMISSIONLOAD:
      return {
        ...state,
        data: action.data,
        totalPages: action.totalPages,
        params: action.params,
        totalRecords: action.totalRecords,
        sortIndex : [action.params["skip1"], action.params["skip2"]],
      }
    default: {
      return state
    }
  }
}