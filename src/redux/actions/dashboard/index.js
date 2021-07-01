import { AXIOS_REQUEST } from "../auth/index"
import { DASHBOARD_UPDATE } from "../../types/index"

export const getRevenueLoad = (filterData) => {
    return async dispatch => {
        dispatch(totalTransactionAgent(filterData));
        dispatch(totalTransactionPlayer(filterData));
        dispatch(totalBetAgent(filterData));
        dispatch(totalBalance(filterData));
    }
}

export const totalTransactionAgent = (filterData) => {
    return async dispatch => {
        let rdata = await AXIOS_REQUEST("dashboard/getTotalTransactionAgent", filterData);
        if(rdata.status) {
            dispatch({type: DASHBOARD_UPDATE, data: rdata.data })
        }
    }
}

export const totalTransactionPlayer = (filterData) => {
    return async dispatch => {
        let rdata = await AXIOS_REQUEST("dashboard/getTotalTransactionPlayer", filterData);
        if(rdata.status) {
            dispatch({type: DASHBOARD_UPDATE, data: rdata.data })
        }
    }
}

export const totalBetAgent = (filterData) => {
    return async dispatch => {
        let rdata = await AXIOS_REQUEST("dashboard/getTotalBetAgent", filterData);
        if(rdata.status) {
            dispatch({type: DASHBOARD_UPDATE, data: rdata.data })
        }
    }
}

export const totalBalance = (filterData) => {
    return async dispatch => {
        let rdata = await AXIOS_REQUEST("dashboard/getTotalBalance", filterData, dispatch, true);
        if(rdata.status) {
            dispatch({type: DASHBOARD_UPDATE, data: rdata.data })
        }
    }
}