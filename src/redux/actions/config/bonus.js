import { AXIOS_REQUEST, set_page } from "../auth/index";
import { toast } from "react-toastify";
import { BONUSLOAD, BONUSGET } from "../../types/index";
import confirm from "reactstrap-confirm";

export const makeData = (rdata, params, dispatch) => {
  let rows = set_page(params, rdata);
  let fdata =rows['fdata'];
  let totalPages = rows['totalPages'];
  dispatch({ type: BONUSLOAD, data: rdata.data })
  dispatch({ type: BONUSGET, data: fdata, totalPages: totalPages, params });
}

export const getBonus = ( params ) => {
  return async(dispatch) => {
    let rdata = await AXIOS_REQUEST("config/bonusget")
    if(rdata.status){
      makeData(rdata, params, dispatch);
    }else{
      toast.error(rdata.data)
    }
  }
}

export const addNewBonus = ( data, params ) => {
  return async(dispatch)=>{
    let rdata = await AXIOS_REQUEST("config/bonussave",{ data })
    if(rdata.status){
      toast.success("success")
      makeData(rdata, params, dispatch);
    }else{
      toast.error(rdata.data)
    }
  }
}

export const UpdateNewBonus = ( data, params ) => {
  return async(dispatch)=>{
    let rdata = await AXIOS_REQUEST("config/bonusupdate",{ data })
    if(rdata.status){
      toast.success("success")
      makeData(rdata, params, dispatch);
    }else{
      toast.error(rdata.data)
    }
  }
}

export const DeleteBonus = ( data, params ) => {
  return async(dispatch) => {
    let flag =  await confirm();
    if(flag){
      let rdata = await AXIOS_REQUEST("config/bonusdelete",{ data })
      if(rdata.status){
        toast.success("success")
        makeData(rdata, params, dispatch);
      }else{
        toast.error(rdata.data)
      }
    }
  }
}