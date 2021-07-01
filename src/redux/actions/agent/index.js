import { AXIOS_REQUEST, sendToRedux } from "../auth/index"
import { toast } from "react-toastify"
import { USER_GET_DATA, USER_SUB_PERMISSION, AGENT_TREE_DATA, AGENT_TREE_PLAYER_DATA } from "../../types/index"

export const getAllAgent = (parsedFilter, condition) => {
  return async(dispatch) => {
    let rdata = await AXIOS_REQUEST("agent/getAllAgent", { parsedFilter, condition }, dispatch, true);
    if(rdata.status) {
      sendToRedux(rdata.data, dispatch, USER_GET_DATA);
    }else{
      toast.error("fail")
    }
  }
}

export const addNewAgent = (userData, parsedFilter, condition) => {
  return async(dispatch) => {
    let rdata =  await AXIOS_REQUEST("agent/addNewAgent", { userData, parsedFilter, condition }, dispatch, true )
      if(rdata.status) {
        toast.success("success");
        sendToRedux(rdata.data, dispatch, USER_GET_DATA);
      }else{
        toast.error(rdata.data);
      }
  }
}

export const getSubPermission = () => {
  return async (dispatch) => {
    let rdata = await AXIOS_REQUEST("agent/getSubPermission");
    if(rdata.status) {
      dispatch({ type: USER_SUB_PERMISSION, data: rdata.data })
    }
  }
}

export const resetPasswordAction = (data) => {
  return async (dispatch) => {
    let rdata = await AXIOS_REQUEST("agent/adminResetPassword", data, dispatch, true)
    if(rdata.status){
      toast.success("success");
    }else{
      toast.error(rdata.data);
    }
  }    
}

export const depositaction = (data,parsedFilter, condition) => {
  return async(dispatch)=>{
    let rdata = await AXIOS_REQUEST("agent/agentDeposit",{ data, parsedFilter, condition }, dispatch, true )
    if(rdata.status) {
      toast.success("success")
      sendToRedux(rdata.data, dispatch, USER_GET_DATA);
    }else{
      toast.warn(rdata.data)
    }
  }
}

export const withdrawaction = (data,parsedFilter, condition) =>{
  return async(dispatch)=>{
    let rdata = await AXIOS_REQUEST("agent/agentWithdrawal", { data, parsedFilter, condition }, dispatch, true)
    if(rdata.status){
      toast.success("success")
      sendToRedux(rdata.data, dispatch, USER_GET_DATA);
    }else{
      toast.warn(rdata.data)    
    }
  }
}

export const getAllTreeAgent = () => {
  return async(dispatch) => {
    let rdata = await AXIOS_REQUEST("agent/getAllTreeAgent", {}, dispatch, true);
      if(rdata.status) {
        dispatch({ type: AGENT_TREE_DATA, data: rdata.data });
      }else{
        toast.error("fail")
      }
  }
}

export const getUsersForTreeAgent = (data) => {
  return async(dispatch) => {
    let rdata = await AXIOS_REQUEST("agent/getUsersForTreeAgent", data, dispatch, true);
    if(rdata.status){
      dispatch({ type: AGENT_TREE_PLAYER_DATA, data: rdata.data })
    }else{
      toast.error("fail")
    }
  }
}

export const agentBlockUnblock = (key, userid, parsedFilter, condition) => {
  return async dispatch => {
    let rdata = await AXIOS_REQUEST("agent/agentBlockUnblock", { key, userid, parsedFilter, condition }, dispatch, true);
    if(rdata.status) {
      sendToRedux(rdata.data, dispatch, USER_GET_DATA);
    } else {
      toast.error(rdata.data)
    }
  }
}