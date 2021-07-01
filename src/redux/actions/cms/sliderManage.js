import { AXIOS_REQUEST } from "../auth/index"
import { toast } from "react-toastify";
import { ALLSLIDERITEMS } from "../../types/index"

export const createSliderItem = (data) => {
  return async(dispatch) => {
    let rdata = await AXIOS_REQUEST("/cms/createSliderItem", data, dispatch, true);
    if(rdata.status) {
      toast.success("success")
      dispatch({type: ALLSLIDERITEMS, data: rdata.data })
    } else {
      toast.error("fail")
    }
  }
}

export const updateSliderItem = (data) => {
  return async(dispatch) => {
    let rdata = await AXIOS_REQUEST("/cms/updateSliderItem", data, dispatch, true);
    if(rdata.status) {
      toast.success("success")
      dispatch({type: ALLSLIDERITEMS, data: rdata.data })
    } else {
      toast.error("fail")      
    }
  }
}

export const Slider_delete = (id) => {
  return async(dispatch) => {
    let rdata = await AXIOS_REQUEST("/cms/removeSliderItem", {id}, dispatch, true);
    if(rdata.status) {
      toast.success("success")
      dispatch({type: ALLSLIDERITEMS, data: rdata.data })
    } else {
      toast.error("fail")      
    }
  }
}

export const getAllSliders = () => {
  return async (dispatch) => {
    let rdata = await AXIOS_REQUEST("/cms/getAllSliderItem", {},dispatch, true);
    if(rdata.status) {
      dispatch({type: ALLSLIDERITEMS, data: rdata.data })
    }
  }
}

export const sliderOrderUpdate = (data) => {
  return async (dispatch) => {
    let rdata = await AXIOS_REQUEST("/cms/sliderOrderUpdate", data, dispatch, true);
    if(rdata.status) {
      toast.success("success")
      dispatch({type: ALLSLIDERITEMS, data: rdata.data })
    } else {
      toast.error("fail")
    }
  }
}