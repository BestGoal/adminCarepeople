import { AXIOS_REQUEST, sendToRedux } from "../../auth/index"
import { toast } from "react-toastify"
import { 
    REPORT_PLAYER_LIST, 
    REPORT_PLAYER_TOTAL_DATA,
    REPORT_PLAYER_BET_HISTORY,
    REPORT_PLAYER_TRANSACTION,
    REPORT_PLAYER_TRANSACTION_ALLDATA,
    REPORT_PLAYER_LOGIN,
    REPORT_PLAYER_BET_ALLDATA,
    REPORT_PLAYER_BET
} from "../../../types/index";

export const getPlayerData = () => {
    return async (dispatch) => {
        let rdata = await AXIOS_REQUEST("report/getPlayerData");
        if(rdata.status){
            dispatch({ type: REPORT_PLAYER_LIST, data: rdata.data });
        }
    }
}

export const getPlayerGameReport = (parsedFilter, condition) => {
    return async dispatch => {
        let rdata = await AXIOS_REQUEST("report/getPlayerGameReport", { parsedFilter, condition }, dispatch, true);
        if(rdata.status) {
            dispatch({ type: REPORT_PLAYER_TOTAL_DATA, data: rdata.totalShowData, rake: rdata.rake, ogMoney: rdata.ogMoney })
            sendToRedux(rdata.data, dispatch, REPORT_PLAYER_BET_HISTORY );
        }else{
          toast.error("fail")
        }
    }
}

export const getPlayerTransactionReport = (parsedFilter, condition) => {
    return async (dispatch) => {
        let rdata = await AXIOS_REQUEST("report/getPlayerTransactionReport", { parsedFilter, condition }, dispatch, true);
        if(rdata.status) {
            dispatch({ type: REPORT_PLAYER_TRANSACTION_ALLDATA, data: rdata.totalDWData })
            sendToRedux(rdata.data, dispatch, REPORT_PLAYER_TRANSACTION );
        }else{
            toast.error("fail")
        }
    }
}

export const getPlayerBetReport = (parsedFilter, condition) => {
    return async (dispatch) => {
        let rdata = await AXIOS_REQUEST("report/getPlayerBetReport", { parsedFilter, condition }, dispatch, true);
        if(rdata.status) {
            dispatch({ type: REPORT_PLAYER_BET_ALLDATA, data: rdata.totalDWData })
            sendToRedux(rdata.data, dispatch, REPORT_PLAYER_BET );
        }else{
            toast.error("fail")
        }
    }
}

export const getPlayerLoginReport = (parsedFilter, condition) => {
    return async (dispatch) => {
        let rdata = await AXIOS_REQUEST("report/getPlayerLoginReport", { parsedFilter, condition }, dispatch, true);
        if(rdata.status){
            sendToRedux(rdata.data, dispatch, REPORT_PLAYER_LOGIN );
        }else{
            toast.error("fail")
        }
    }
}