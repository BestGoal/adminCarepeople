import { AXIOS_REQUEST, sendToRedux } from "../auth/index"
import { toast } from "react-toastify";
import { PERMISSIONLOAD } from "../../types/index";
import confirm from "reactstrap-confirm";
 
export const getAllpermission = (parsedFilter) => {
  return async (dispatch) => {
    let rdata = await AXIOS_REQUEST("agent/getAllpermission", { parsedFilter }, dispatch, true);
    if(rdata.status) {
      sendToRedux(rdata.data, dispatch, PERMISSIONLOAD);
    }else{
      toast.error(rdata.data)
    }
  }
}

export const addNewpermission =(data, parsedFilter)=>{
  return async(dispatch) => {
    toast.warn("This is base data. you can't change!")
    let rdata = await AXIOS_REQUEST("agent/addNewpermission",{ data, parsedFilter });
    if(rdata.status){
      sendToRedux(rdata.data, dispatch, PERMISSIONLOAD);
    }else{
      toast.error(rdata.data)
    }
  }
}

export const updatePermission = (data, parsedFilter)=>{
  return async(dispatch)=>{
    toast.warn("This is base data. you can't change!")
    let rdata = await AXIOS_REQUEST("agent/updatePermission",{ data, parsedFilter })
    if(rdata.status){
      sendToRedux(rdata.data, dispatch, PERMISSIONLOAD);
    }else{
      toast.error(rdata.data)
    }
  }
}

export const deletePermission = (data, parsedFilter)=>{
  return async(dispatch)=>{
    toast.warn("This is base data. you can't change!")
    let result = await confirm();
    if(result) {
      let rdata = await AXIOS_REQUEST("agent/deletePermission",{ data, parsedFilter })
      if(rdata.status){
        sendToRedux(rdata.data, dispatch, PERMISSIONLOAD);
      }else{
        toast.error(rdata.data)
      }
    }
  }
}