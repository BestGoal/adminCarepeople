import { toast } from "react-toastify";
import { AXIOS_REQUEST, sendToRedux } from "../auth/index"
import { JACKPOT_AGENT_DATA, JACKPOT_PLAYER_DATA } from "../../types/index";

export const getAllAgent = (parsedFilter, condition) => {
    return async(dispatch) => {
        let rdata = await AXIOS_REQUEST("jackpot/getAllAgent", { parsedFilter, condition }, dispatch, true);
        if(rdata.status) {
            sendToRedux(rdata.data, dispatch, JACKPOT_AGENT_DATA);
        }else{
            toast.error("fail")
        }
    }
}

export const getPlayerData = (parsedFilter, condition) => {
    return async(dispatch) => {
        let rdata = await AXIOS_REQUEST("jackpot/getAllPlayer", { parsedFilter, condition }, dispatch, true);
        if(rdata.status) {
            sendToRedux(rdata.data, dispatch, JACKPOT_PLAYER_DATA);
        }else{
            toast.error("fail")
        }
    }
}

export const updateJackpotInfo = (data, parsedFilter, condition) =>{
    return async (dispatch) => {
        let rdata = await AXIOS_REQUEST("jackpot/updateagentjackpot", {data, parsedFilter, condition});
        if(rdata.status) {
            sendToRedux(rdata.data, dispatch, JACKPOT_AGENT_DATA);
            toast.success("Success");
        } else {
            toast.error(rdata.data)
        }
    }
}

export const playerJackpotUpdate = (data, parsedFilter, condition) => {
    return async (dispatch) => {
        let rdata = await AXIOS_REQUEST("jackpot/updateplayerjackpot", {data, parsedFilter, condition}, dispatch, true);
        if(rdata.status) {
            sendToRedux(rdata.data, dispatch, JACKPOT_PLAYER_DATA);
            toast.success("Success");
        } else {
            toast.error(rdata.data)
        }
    }
}