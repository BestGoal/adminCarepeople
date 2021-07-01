import { AXIOS_REQUEST, sendToRedux } from "../auth/index"
import { toast } from "react-toastify"
import { AGENT_DATAF_PROVIDER, AGENT_PROVIDER_MANAGE, AGENT_SELECTED_PROVIDER } from "../../types/index"

export const getAllAgent = (parsedFilter, condition) => {
    return async (dispatch) => {
        let rdata = await AXIOS_REQUEST("agent/getAllAgentFProvider", { parsedFilter, condition }, dispatch, true);
        if (rdata.status) {
            sendToRedux(rdata.data, dispatch, AGENT_DATAF_PROVIDER);
        } else {
            toast.error(rdata.data)
        }
    }
}

export const getProviderData = () => {
    return async (dispatch) => {
        let rdata = await AXIOS_REQUEST("agent/getAgentProvider");
        if (rdata.status) {
            dispatch({ type: AGENT_PROVIDER_MANAGE, data: rdata.data })
        } else {
            toast.error(rdata.data)
        }
    }
}

export const getProviderAgentData = (data) => {
    return async (dispatch) => {
        let rdata = await AXIOS_REQUEST("agent/getProviderData", { data });
        if (rdata.status) {
            dispatch({ type: AGENT_SELECTED_PROVIDER, data: rdata.data })
        } else {
            toast.error(rdata.data)
        }
    }
}

export const sendProviderData = (data) => {
    return async (dispatch) => {
        let rdata = await AXIOS_REQUEST("agent/setProviderData", { data });
        if (rdata.status) {
            toast.success(rdata.data)
        } else {
            toast.error(rdata.data)
        }
    }
}