import { AXIOS_REQUEST } from "../auth/index"
import {toast} from "react-toastify";
import { getParseFilter, dataProcess } from "../auth/index"
import { FILTERGAMETYPES } from "../../types/index"

export const getGameTypes = (parseFilter) => {
  return async(dispatch) => {
    let {returnData, params} = getParseFilter(parseFilter);
    let rdata = await AXIOS_REQUEST("cms/getgametypes", {data: returnData });
    if(rdata.status){
      let dispatchData = dataProcess(rdata.data, params)
      dispatch({type: FILTERGAMETYPES, data: dispatchData })
    }
  }
}

export const addNewGameType = (sendData, parseFilter) => {
  return async(dispatch) => {
    let {returnData, params} = getParseFilter(parseFilter);
    let rdata = await AXIOS_REQUEST("cms/addnewgametype", { sendData, filterOption: returnData } );
    if(rdata.status){
      let dispatchData = dataProcess(rdata.data, params)
      dispatch({type: FILTERGAMETYPES, data: dispatchData })
      toast.success("Successfully saved.")
    }else{
      toast.error("error!")
    }
  }
}

export const UpdateGameType = (sendData, parseFilter) => {
  return async(dispatch) => {
    let {returnData, params} = getParseFilter(parseFilter);
    let rdata = await AXIOS_REQUEST("cms/updategametype", { sendData, filterOption: returnData } );
    if(rdata.status){
      let dispatchData = dataProcess(rdata.data, params)
      dispatch({type: FILTERGAMETYPES, data: dispatchData })
      toast.success("Successfully updated.")
    }else{
      toast.error("error!")
    }
  }
}

export const DeleteGameType = (sendData, parseFilter) => {
  return async(dispatch) => {
    let {returnData, params} = getParseFilter(parseFilter);
    let rdata = await AXIOS_REQUEST("cms/deletegametype", { sendData, filterOption: returnData } );
    if(rdata.status){
      let dispatchData = dataProcess(rdata.data, params)
      dispatch({type: FILTERGAMETYPES, data: dispatchData })
      toast.success("Successfully deleted.")
    }else{
      toast.error("error!")
    }
  }
}