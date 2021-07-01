import { JACKPOT_AGENT_DATA, JACKPOT_PLAYER_DATA } from "../../types/index";

const initialState = {
    agentData: {
        data: [],
        params: null,
        totalPages: 0,
        totalRecords: 0,
        sortIndex: [0, 0],
    },
    playerData: {
        data: [],
        params: null,
        totalPages: 0,
        totalRecords: 0,
        sortIndex: [0, 0],
    }
}

const jackpot = (state = initialState, action) => {
    switch (action.type) {
        case JACKPOT_AGENT_DATA:
            return {
                ...state,
                agentData: {
                    data: action.data,
                    totalPages: action.totalPages,
                    params: action.params,
                    totalRecords: action.totalRecords,
                    sortIndex : [action.params["skip1"], action.params["skip2"]]
                }
            }
        case JACKPOT_PLAYER_DATA:
            return {
                ...state,
                playerData: {
                    data: action.data,
                    totalPages: action.totalPages,
                    params: action.params,
                    totalRecords: action.totalRecords,
                    sortIndex : [action.params["skip1"], action.params["skip2"]],
                }
            }
        default:
            return state
    }
}

export default jackpot