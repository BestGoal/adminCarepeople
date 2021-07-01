import { USER_GET_DATA, USER_SUB_PERMISSION } from "../../types/index";

let initdata = {
  data: [],
  params: null,
  totalPages: 0,
  totalRecords: 0,
  sortIndex: [0, 0],
  subPermissionData: [{ value: "", label: "" }]
}

export default (state = initdata, action) => {
  switch (action.type) {
    case USER_GET_DATA:
      return {
        ...state,
        data: action.data,
        totalPages: action.totalPages,
        params: action.params,
        totalRecords: action.totalRecords,
        sortIndex: [action.params["skip1"], action.params["skip2"]],
      }
    case USER_SUB_PERMISSION:
      return {
        ...state,
        subPermissionData: action.data
      }
    default: {
      return state
    }
  }
}