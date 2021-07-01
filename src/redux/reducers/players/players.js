import { getIndex } from "../../actions/auth/index"
import { PLAYERS_GET_DATA, PLAYERS_FILTER_DATA } from "../../types/index"

const initialState = {
  data: [],
  params: null,
  totalPages: 0,
  totalRecords: 0,
  sortIndex: [0, 0]
}
  
  export const playerslist = (state = initialState, action) => {
    switch (action.type) {
      case PLAYERS_GET_DATA:
        return {
          ...state,
          data: action.data,
          totalPages: action.totalPages,
          params: action.params,
          totalRecords: action.totalRecords,
          sortIndex : [action.params["skip1"], action.params["skip2"]]
        }
        
      case "PLAYERS_SET_PAGENATION":
        return {
          ...state,
          data: action.data,
          totalPages: action.totalPages,
          params: action.params,
          sortIndex: getIndex( state.allData, action.data, state.sortIndex, action.params )
        }
        case PLAYERS_FILTER_DATA:
          let value = (action.value);
          let bool = (action.bool).toString();
          let data = [];
          if (value.length) {
            data = state.allData.filter(item => {
              let startsWithCondition = false;
              let includesCondition = false;
              if(bool === "date"){
                let date = new Date(item.date);
                let date1 = new Date(value[0]);
                let date2 = new Date(value[1]);
                if(date >= date1 && date <= date2){
                  startsWithCondition = true;
                  includesCondition = true;
                }else{
                  startsWithCondition = false;
                  includesCondition = false;
                }
              }else{
                value = value.toString();
                let uitem = (item[bool]).toString();
                startsWithCondition = uitem.toLowerCase().startsWith(value.toLowerCase());
                includesCondition = uitem.toLowerCase().includes(value.toLowerCase());
              }
              if (startsWithCondition) {
                return startsWithCondition
              } else if (!startsWithCondition && includesCondition) {
                return includesCondition
              } else return null
            }).slice(state.params.page - 1, state.params.perPage)
            return { ...state, data }
          } else {
            data = state.data
            return { ...state, data }
          }
        
   
      default:
        return state
    }
  }
  
  