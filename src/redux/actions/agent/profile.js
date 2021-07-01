import { AGENT_PROFILE } from "../../types/index"
import { AXIOS_REQUEST } from "../auth/index"
import { setUserInfo } from "../auth/loginActions"
import { toast } from "react-toastify"

export const getProfileInfo = (userId) => {
  return async dispatch => {
    let rdata = await AXIOS_REQUEST("agent/getProfileInfo", { userId }, dispatch, true);
    if(rdata.status){
      dispatch({ type: AGENT_PROFILE, data: rdata.data });
    }else{
      toast.error("get profile information error.");
    }
  }
}

export const agentProfileUpdate = (fpdata, userId) => {
  return async (dispatch, getState) => {
    let rdata = await AXIOS_REQUEST("agent/agentUpdate", fpdata, dispatch, true);
    if(rdata.status) {
      let userData = getState().auth.userData;
      toast.success("Updated successfully!");
      if(userData._id === userId) {
        await dispatch(setUserInfo());
      }
    } else {
      toast.error(rdata.data);
    }
  }
}