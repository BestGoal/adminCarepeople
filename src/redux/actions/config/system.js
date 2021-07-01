import { toast } from "react-toastify";
import confirm from "reactstrap-confirm";
import { AXIOS_REQUEST, set_page } from "../auth/index";
import { ALLGAMETYPES, GAMEPROVIDERLOAD, GAMEPROVIDERGET, GAMEPROVIDERFILTER, ALLGAMEPROVIDER} from "../../types/index";

export const getAllGameTypes = () => {
  return async (dispatch) => {
    let rdata = await AXIOS_REQUEST("config/getallgametype");
    if(rdata.status) {
		  dispatch({type: ALLGAMETYPES, data: rdata.data });
    }
  }
}

export const getAllGameProviders = () => {
  return async(dispatch) => {
    let rdata = await AXIOS_REQUEST("config/getallgameproviders");
    if(rdata.status){
      dispatch({type: ALLGAMEPROVIDER, data: rdata.data })
    }
  }
}

export const providerGet = (params) => {
  return async (dispatch) => {
    let rdata = await AXIOS_REQUEST("config/providerget" )
    if(rdata.status){
      let rows = set_page(params, rdata);
      let fdata =rows['fdata'];
      let totalPages = rows['totalPages'];
      dispatch({ type: GAMEPROVIDERLOAD, data: rdata.data })
      dispatch({ type: GAMEPROVIDERGET, data: fdata, totalPages: totalPages, params })
    }else{
      toast.error("failure")
    }    
  }
}

export const providerSave = ( data, params ) => {
  return async(dispatch,getState)=>{
    let rdata = await AXIOS_REQUEST("config/providersave",{ data })
    if(rdata.status){
      let rows = set_page(params, rdata);
      let fdata =rows['fdata'];
      let totalPages = rows['totalPages'];
      dispatch({ type: GAMEPROVIDERLOAD, data: rdata.data })
      dispatch({ type: GAMEPROVIDERGET, data: fdata, totalPages: totalPages, params })
    }else{
      toast.error("failure")
    }
  }
}

export const providerUpdate = (data, params) => {
  return async (dispatch) => {
    let rdata = await AXIOS_REQUEST("config/providerupdate", {data});
    if(rdata.status){
      let rows = set_page(params, rdata);
      let fdata =rows['fdata'];
      let totalPages = rows['totalPages'];
      dispatch({ type: GAMEPROVIDERLOAD, data: rdata.data })
      dispatch({ type: GAMEPROVIDERGET, data: fdata, totalPages: totalPages, params })
    }else{
      toast.error("failure")
    }    
  }
}

export const providerDelete = (data, params) => {
  return async (dispatch) => {
    let result =  await confirm();
    if(result){
      let rdata = await AXIOS_REQUEST("config/providerdelete", {data});
      if(rdata.status){
        let rows = set_page(params, rdata);
        let fdata =rows['fdata'];
        let totalPages = rows['totalPages'];
        dispatch({ type: GAMEPROVIDERLOAD, data: rdata.data })
        dispatch({ type: GAMEPROVIDERGET, data: fdata, totalPages: totalPages, params })
      }else{
        toast.error("failure")
      }
    }
  }
}

export const pagenationchange = (params,data)=>{
  return (dispatch,getState)=>{
    let row = {
      data: getState().config.system.allData
    }
    let rows =  set_page(params,row)
    let fdata = rows['fdata'];
    let totalPages = rows['totalPages']
    dispatch({
      type: GAMEPROVIDERGET,
      data: fdata,
      totalPages:totalPages,
      params
    })
  }
}

export const filterData = value => {
  return dispatch => dispatch({ type: GAMEPROVIDERFILTER, value })
}