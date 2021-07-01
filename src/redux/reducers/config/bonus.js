import {  BONUSLOAD, BONUSGET } from "../../types/index";
import {getIndex} from "../../actions/auth/index"

let initdata = {
  
  allData: [],

  data: [],
  params: null,
  totalPages: 0,
  filteredData: [],
  totalRecords: 0,
  sortIndex: [],
  allgamedata: [],
  
  allGameTypes: [{label: "", value: ""}],
  allGameProviders: [{label: "", value: ""}],
}

export const bonus = (state = initdata, action) => {
  switch (action.type) {
    case BONUSLOAD:
      return {
        ...state,
        allData: action.data,
        totalRecords: action.data.length,
        sortIndex: getIndex(action.data, state.data, state.sortIndex)
      }
    case BONUSGET:
      return {
        ...state,
        data: action.data,
        totalPages: action.totalPages,
        params: action.params,
        sortIndex: getIndex( state.allData, action.data, state.sortIndex, action.params )
      }
 
    // case ALLGAMETYPES:
    //   return { ...state, allGameTypes: action.data }
    // case GAMEPROVIDERFILTER:
    //   let value = action.value
    //   let filteredData = []
    //   if (value.length) {
    //     filteredData = state.allData
    //       .filter(item => {
    //         let startsWithCondition =
    //           item.provider.toLowerCase().startsWith(value.toLowerCase())
    //         let includesCondition =
    //         item.provider.toLowerCase().startsWith(value.toLowerCase())  
    //         if (startsWithCondition) {
    //           return startsWithCondition
    //         } else if (!startsWithCondition && includesCondition) {
    //           return includesCondition
    //         } else return null
    //       })
    //       .slice(state.params.page - 1, state.params.perPage)
    //     return { ...state, filteredData }
    //   } else {
    //     filteredData = state.data
    //     return { ...state, filteredData }
    //   }
    // case ALLGAMEPROVIDER: 
    //   return { ...state, allGameProviders: action.data }              
    default: {
      return state
    }
  }
}
