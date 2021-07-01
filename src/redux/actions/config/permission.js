import { AXIOS_REQUEST } from "../auth/index";
import { toast } from "react-toastify";
import { USERPERMISSION } from "../../types/index";

export const getPermission = (data = {}) => {
  return async(dispatch) =>{
    dispatch({type: USERPERMISSION, data: false});
    let rdata =  await AXIOS_REQUEST("config/getpermission", data, dispatch, true );
    if(rdata.status){
      dispatch({type: USERPERMISSION, data: rdata.data});
    } else {
      dispatch({type: USERPERMISSION, data: false});
    }
  }
}


export const submitPermission = (data) => {
  return async(dispatch) => {
    let rdata = await AXIOS_REQUEST("config/savepermission", data);
    if(rdata.status) {
      toast.success("Success")
    }else{
      toast.error(rdata.data);
    }
  }
}