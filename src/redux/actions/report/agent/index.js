import { AXIOS_REQUEST, sendToRedux } from "../../auth/index"
import { toast } from "react-toastify"
import {
    REPORT_AGENT_LIST,
    REPORT_BIG_PROVIDER_LIST,
    REPORT_PROVIDER_LIST,
    REPORT_GAME_LIST,
    REPORT_AGENT_GAME_DATA,
    REPORT_AGENT_GAME_TOTAL_DATA,
    REPORT_AGENT_TRANSACTION,
    REPORT_AGENT_TRANSACTION_TOTAL_DATA,
    REPORT_AGENT_LOGIN
} from "../../../types/index";

export const getAgentData = () => {
    return async dispatch => {
        let rdata = await AXIOS_REQUEST("report/getAgentData");
        if (rdata.status) {
            dispatch({ type: REPORT_AGENT_LIST, data: rdata.data });
        }
    }
}

export const getBigProviderData = () => {
    return async (dispatch) => {
        let rdata = await AXIOS_REQUEST("report/getBigProviderData");
        if (rdata.status) {
            dispatch({ type: REPORT_BIG_PROVIDER_LIST, data: rdata.data });
        }
    }
}

export const getSubProviders = (bigProvider) => {
    return async (dispatch) => {
        let rdata = await AXIOS_REQUEST("report/getSubProviderData", { bigProvider });
        if (rdata.status) {
            dispatch({ type: REPORT_PROVIDER_LIST, data: rdata.data });
        }
    }
}

export const deleteSubProviders = () => {
    return async (dispatch) => {
        dispatch({ type: REPORT_PROVIDER_LIST, data: [{ label: "All", value: "" }] });
    }
}

export const getProviderData = () => {
    return async (dispatch) => {
        let rdata = await AXIOS_REQUEST("report/getProviderData");
        if (rdata.status) {
            dispatch({ type: REPORT_PROVIDER_LIST, data: rdata.data });
        }
    }
}

export const getSubGames = (providerId) => {
    return async (dispatch) => {
        let rdata = await AXIOS_REQUEST("report/getSubGameData", { providerId });
        if (rdata.status) {
            dispatch({ type: REPORT_GAME_LIST, data: rdata.data });
        }
    }
}

export const deleteSubGames = () => {
    return async (dispatch) => {
        dispatch({ type: REPORT_GAME_LIST, data: [{ label: "All", value: "" }] });
    }
}

export const getAgentGameReport = (parsedFilter, condition) => {
    return async dispatch => {
        let rdata = await AXIOS_REQUEST("report/getAgentGameReport", { parsedFilter, condition }, dispatch, true);
        if (rdata.status) {
            dispatch({ type: REPORT_AGENT_GAME_TOTAL_DATA, data: rdata.totalShowData, rake: rdata.rake, ogMoney: rdata.ogMoney })
            sendToRedux(rdata.data, dispatch, REPORT_AGENT_GAME_DATA);
        } else {
            toast.error("fail")
        }
    }
}

export const getAgentTransactionReport = (parsedFilter, condition) => {
    return async (dispatch) => {
        let rdata = await AXIOS_REQUEST("report/getAgentTransactionReport", { parsedFilter, condition }, dispatch, true);
        if (rdata.status) {
            dispatch({ type: REPORT_AGENT_TRANSACTION_TOTAL_DATA, data: rdata.totalDWData })
            sendToRedux(rdata.data, dispatch, REPORT_AGENT_TRANSACTION);
        } else {
            toast.error("fail")
        }
    }
}

export const getLoginHistory = (parsedFilter, condition) => {
    return async (dispatch) => {
        let rdata = await AXIOS_REQUEST("report/getAgentLoginReport", { parsedFilter, condition }, dispatch, true);
        if (rdata.status) {
            sendToRedux(rdata.data, dispatch, REPORT_AGENT_LOGIN);
        } else {
            toast.error("fail")
        }
    }
}