import { AGENT_DATAF_PROVIDER, AGENT_PROVIDER_MANAGE, AGENT_SELECTED_PROVIDER } from "../../types/index";

let initdata = {
    data: [],
    params: null,
    totalPages: 0,
    totalRecords: 0,
    sortIndex: [0, 0],
    providerData: [{ label: "All", value: "" }],
    currentProviderData: []
}

export default (state = initdata, action) => {
    switch (action.type) {
        case AGENT_DATAF_PROVIDER:
            return {
                ...state,
                data: action.data,
                totalPages: action.totalPages,
                params: action.params,
                totalRecords: action.totalRecords,
                sortIndex: [action.params["skip1"], action.params["skip2"]],
            }
        case AGENT_SELECTED_PROVIDER:
            return {
                ...state, currentProviderData: action.data
            }
        case AGENT_PROVIDER_MANAGE:
            return {
                ...state, providerData: action.data
            }
        default: {
            return state
        }
    }
}